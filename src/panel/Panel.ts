import Input from './input/Input';
import { IConfig, ISettings } from '../interfaces/interfaces';
import Observer from '../observer/Observer';
import './panel.scss';

class Panel {
  readonly $root: JQuery<HTMLElement>;

  public observer: Observer;

  readonly $panel: JQuery<HTMLElement>;

  readonly $form: JQuery<HTMLElement>;

  readonly inputs: Map<string, Input>;

  private max: Input;

  private min: Input;

  private step: Input;

  readonly from: Input;

  readonly to: Input;

  readonly range: Input;

  constructor(root: JQuery<HTMLElement>) {
    this.$root = root;
    this.observer = new Observer();
    this.$panel = $(this.$root).find('.js-panel');
    this.$form = this.$panel.find('.js-panel__form');
    this.inputs = this.initInputs();
    this.max = this.takeInputFromArr('max');
    this.min = this.takeInputFromArr('min');
    this.step = this.takeInputFromArr('step');
    this.from = this.takeInputFromArr('from');
    this.to = this.takeInputFromArr('to');
    this.range = this.takeInputFromArr('range');
    this.bindEventListeners();
  }

  private initInputs() {
    const element = this;
    const inputs = new Map<string, Input>();
    this.$panel.find('.js-input__field').each(function () {
      const input = new Input($(this));
      const name = input.getName();
      input.observer.subscribe({ key: 'setting', observer: element.changeSettings.bind(element) });
      inputs.set(name, input);
    });
    return inputs;
  }

  private takeInputFromArr(name: string) {
    const input = this.inputs.get(name);
    if (input) {
      return input;
    }

    throw new Error('no such input');
  }

  private bindEventListeners() {
    this.$form.on('submit', Panel.handlePanelFormSubmit);
  }

  static handlePanelFormSubmit() {
    return false;
  }

  private changeSettings(setting: ISettings) {
    this.changeBounds(setting);
    this.observer.notify('setting', setting);
  }

  public initPanel(config: IConfig) {
    const element = this;
    Object.entries(config).forEach(([key, value]) => {
      const input = element.inputs.get(key);
      const setting: ISettings = {};
      if (input) {
        input.setValue(value);
        setting[key] = value;
        this.changeBounds(setting);
      }
    });
  }

  private changeBounds(set: ISettings) {
    const key = Object.keys(set)[0];
    const value = Object.values(set)[0];
    switch (key) {
      case 'min':
        this.max.setProp('min', value);
        this.from.setProp('min', value);
        break;
      case 'max':
        this.min.setProp('max', value);
        this.from.setProp('max', this.range.getValue() ? this.to.getValue() : value);
        this.to.setProp('max', value);
        break;
      case 'step':
        this.from.setProp('step', value);
        this.to.setProp('step', value);
        break;
      case 'from':
        this.to.setProp('min', value);
        break;
      case 'to':
        this.from.setProp('max', value);
        break;
      case 'range': {
        const max = value ? this.to.getValue() : this.max.getValue();
        this.to.setProp('disabled', !value);
        this.from.setProp('max', max);
        break;
      }
      case 'vertical':
      case 'tip':
        break;
      default:
        throw new Error('undefined setting');
    }
  }

  public initValues(values: number[]) {
    switch (values.length) {
      case 1: {
        const max = this.max.getValue();
        this.from.setValue(values[0]);
        this.from.setProp('max', max);
        break;
      }
      case 2: {
        this.from.setValue(values[0]);
        this.to.setValue(values[1]);
        this.from.setProp('max', values[1]);
        this.to.setProp('min', values[0]);
        break;
      }
      default: {
        throw new Error('undefined values');
      }
    }
  }

  public setValue(setting: ISettings) {
    const key = Object.keys(setting)[0];
    const value = Object.values(setting)[0];
    const input = this.takeInputFromArr(key);
    input.setValue(value);
  }
}

export default Panel;

import { IConfig, ISettings } from '../interfaces/interfaces';
import Observer from '../observer/Observer';
import IObserver from '../observer/interface';
import Input from './input/Input';
import IPanel from './interface';

import './panel.scss';

class Panel implements IPanel {
  public inputs: Map<string, Input>;

  public observer: IObserver;

  public from: Input;

  public to: Input;

  public range: Input;

  public max: Input;

  public min: Input;

  public step: Input;

  readonly $root: JQuery<HTMLElement>;

  readonly $panel: JQuery<HTMLElement>;

  readonly $form: JQuery<HTMLElement>;

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

  public initPanel(config: IConfig): void {
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

  public initValues(values: number[]): void {
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

  public setValue(setting: ISettings): void {
    const key = Object.keys(setting)[0];
    const value = Object.values(setting)[0];
    const input = this.takeInputFromArr(key);
    input.setValue(value);
  }

  static handlePanelFormSubmit(): boolean {
    return false;
  }

  private initInputs(): Map<string, Input> {
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

  private takeInputFromArr(name: string): Input {
    const input = this.inputs.get(name);
    if (input) {
      return input;
    }

    throw new Error('no such input');
  }

  private bindEventListeners(): void {
    this.$form.on('submit', Panel.handlePanelFormSubmit);
  }

  private changeSettings(setting: ISettings): void {
    this.changeBounds(setting);
    this.observer.notify('setting', setting);
  }

  private changeBounds(set: ISettings): void {
    const key = Object.keys(set)[0];
    const value = Object.values(set)[0];
    const range = Number(this.max.getValue()) - Number(this.min.getValue());
    switch (key) {
      case 'min':
        this.max.setProp('min', value);
        this.step.setProp('max', range);
        this.from.setProp('min', value);
        break;
      case 'max':
        this.min.setProp('max', value);
        this.step.setProp('max', range);
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
}

export default Panel;

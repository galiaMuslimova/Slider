import Input from './input/Input';
import { IConfig, ISettings } from '../interfaces/interfaces';
import Observer from '../observer/Observer';
import './panel.scss';

class Panel {
  $root: JQuery<HTMLElement>;

  observer: Observer;

  $panel: JQuery<HTMLElement>;

  $form: JQuery<HTMLElement>;

  inputs: Map<string, Input>;

  max: Input;

  min: Input;

  step: Input;

  from: Input;

  to: Input;

  range: Input;

  constructor(root: JQuery<HTMLElement>) {
    this.$root = root;
    this.observer = new Observer();
    this.$panel = $(this.$root).find('.js-panel');
    this.$form = this.$panel.find('.js-panel__form');
    this.inputs = this.initInputs();
    this.max = this.getInput('max');
    this.min = this.getInput('min');
    this.step = this.getInput('step');
    this.from = this.getInput('from');
    this.to = this.getInput('to');
    this.range = this.getInput('range');
    this.bindEventListeners();
  }

  initInputs() {
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

  getInput(name: string) {
    const input = this.inputs.get(name);
    if (input) {
      return input;
    }

    throw new Error('no such input');
  }

  bindEventListeners() {
    this.$form.on('submit', Panel.handlePanelFormSubmit);
  }

  static handlePanelFormSubmit() {
    return false;
  }

  changeSettings(setting: ISettings) {
    this.changeBounds(setting);
    this.observer.notify('settings', setting);
  }

  initPanel(config: IConfig) {
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

  changeBounds(set: ISettings) {
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

  initValues(values: number[]) {
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

  setValue(setting: ISettings) {
    const key = Object.keys(setting)[0];
    const value = Object.values(setting)[0];
    const input = this.getInput(key);
    input.setValue(value);
  }
}

export default Panel;

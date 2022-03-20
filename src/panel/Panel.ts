import { IConfig, IParameters, ISettings } from '../interfaces/interfaces';
import Observer from '../observer/Observer';
import IObserver from '../observer/interface';
import Input from './input/Input';
import IPanel from './interface';

import './panel.scss';

class Panel implements IPanel {
  public inputs: Map<string, Input>;

  public observer: IObserver;

  readonly $root: JQuery<HTMLElement>;

  readonly $panel: JQuery<HTMLElement>;

  readonly $form: JQuery<HTMLElement>;

  constructor(root: JQuery<HTMLElement>) {
    this.$root = root;
    this.observer = new Observer();
    this.$panel = jQuery('<div>', { class: 'panel js-panel' }).appendTo(this.$root);
    this.$form = jQuery('<form>', { class: 'panel__form js-panel__form' }).appendTo(this.$panel);
    this.inputs = new Map<string, Input>();
    this.bindEventListeners();
  }

  public initPanel(config: IConfig): void {
    const element = this;
    const inputs = new Map<string, Input>();
    Object.entries(config).forEach(([key, value]) => {
      const input = new Input(this.$form, key, value);
      input.observer.subscribe({ key: 'setting', observer: element.changeSettings.bind(element) });
      inputs.set(key, input);
      if (key === 'step') {
        input.setProp('min', 0.1);
        input.setProp('step', 0.1);
      }
    });
    this.inputs = inputs;
  }

  public initBounds(config: IConfig): void {
    Object.entries(config).forEach(([key, value]) => {
      const setting: ISettings = {};
      setting[key] = value;
      this.changeBounds(setting);
    });
  }

  public initValues(parameters: IParameters[]): void {
    switch (parameters.length) {
      case 1: {
        const max = this.takeInputFromArr('max').getValue();
        this.takeInputFromArr('from').setValue(parameters[0].value);
        this.takeInputFromArr('from').setProp('max', max);
        break;
      }
      case 2: {
        this.takeInputFromArr('from').setValue(parameters[0].value);
        this.takeInputFromArr('to').setValue(parameters[1].value);
        this.takeInputFromArr('from').setProp('max', parameters[1].value);
        this.takeInputFromArr('to').setProp('min', parameters[0].value);
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

  public takeInputFromArr(name: string): Input {
    const input = this.inputs.get(name);
    if (input) {
      return input;
    }

    throw new Error('no such input');
  }

  static handlePanelFormSubmit(): boolean {
    return false;
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
    const maxInput = this.takeInputFromArr('max');
    const minInput = this.takeInputFromArr('min');
    const stepInput = this.takeInputFromArr('step');
    const fromInput = this.takeInputFromArr('from');
    const toInput = this.takeInputFromArr('to');
    const rangeInput = this.takeInputFromArr('range');
    const range = Number(maxInput.getValue()) - Number(minInput.getValue());
    switch (key) {
      case 'min':
        maxInput.setProp('min', value);
        stepInput.setProp('max', range);
        fromInput.setProp('min', value);
        break;
      case 'max':
        minInput.setProp('max', value);
        stepInput.setProp('max', range);
        fromInput.setProp('max', rangeInput.getValue() ? toInput.getValue() : value);
        toInput.setProp('max', value);
        break;
      case 'step':
        fromInput.setProp('step', value);
        toInput.setProp('step', value);
        break;
      case 'from':
        toInput.setProp('min', value);
        break;
      case 'to':
        fromInput.setProp('max', value);
        break;
      case 'range': {
        const max = value ? toInput.getValue() : maxInput.getValue();
        toInput.setProp('disabled', !value);
        fromInput.setProp('max', max);
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

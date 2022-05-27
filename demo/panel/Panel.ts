import { IConfig, ISettings } from '../../src/interfaces/interfaces';
import Observer from '../observer/Observer';
import IObserver from '../observer/interface';
import Input from '../input/Input';
import IPanel from './interface';

import './panel.scss';

class Panel implements IPanel {
  public inputs: Map<string, Input>;

  public observer: IObserver;

  readonly $root: JQuery<HTMLElement>;

  private options: IConfig;

  private $panel: JQuery<HTMLElement>;

  constructor($root: JQuery<HTMLElement>, options: IConfig) {
    this.$root = $root;
    this.options = options;
    this.observer = new Observer();
    this.$panel = $('<div>');
    this.inputs = new Map<string, Input>();
    this.initPanel(this.options);
    this.initBounds(this.options);
    this.bindEventListeners();
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

  private initPanel(options: IConfig): void {
    this.$panel = this.$root.find('.js-panel');
    const element = this;
    const inputs = new Map<string, Input>();
    Object.entries(options).forEach(([key, value]) => {
      const searcher = `${key}`;
      const $inputElement = this.$panel.find(`[name=${searcher}]`)
      const input = new Input($inputElement, key, value);
      input.observer.subscribe({ key: 'setting', observer: element.changeSettings.bind(element) });
      inputs.set(key, input);
      if (key === 'step') {
        input.setProp('min', 0.1);
        input.setProp('step', 0.1);
      }
    });
    this.inputs = inputs;
  }

  private initBounds(config: IConfig): void {
    Object.entries(config).forEach(([key, value]) => {
      const setting: ISettings = {};
      setting[key] = value;
      this.changeBounds(setting);
    });
  }

  private bindEventListeners(): void {
    this.$panel.on('submit', Panel.handlePanelFormSubmit);
  }

  private takeInputFromArr(name: string): Input {
    const input = this.inputs.get(name);
    if (input) {
      return input;
    }

    throw new Error('no such input');
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

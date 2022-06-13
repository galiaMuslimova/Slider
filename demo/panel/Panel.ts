import { IOptions } from '../../src/interfaces/interfaces';
import Observer from '../../src/observer/Observer';
import IObserver from '../../src/observer/interface';
import Input from '../input/Input';
import IPanel from './interface';

import './panel.scss';

class Panel implements IPanel {
  public inputs: { [key: string]: Input };

  public observer: IObserver;

  readonly $root: JQuery<HTMLElement>;

  private options: IOptions;

  private $panel: JQuery<HTMLElement>;

  constructor($root: JQuery<HTMLElement>, options: IOptions) {
    this.$root = $root;
    this.options = options;
    this.observer = new Observer();
    this.$panel = $('<div>');
    this.inputs = {};
    this.initPanel(this.options);
    this.bindEventListeners();
  }

  public setValue(options: IOptions): void {
    Object.entries(options).forEach(([key, value]) => {
      const input = this.inputs[key];
      input.setValue(value);
    });
  }

  static handlePanelFormSubmit(): boolean {
    return false;
  }

  private initPanel(options: IOptions): void {
    this.$panel = this.$root.find('.js-panel');
    const element = this;
    Object.entries(options).forEach(([key, value]) => {
      const searcher = `${key}`;
      const $inputElement = this.$panel.find(`[name=${searcher}]`);
      const input = new Input($inputElement, key as keyof IOptions, value);
      input.observer.subscribe({
        key: 'setting',
        observer: element.changeOptions.bind(element),
      });
      this.inputs[key] = input;
    });
  }

  private bindEventListeners(): void {
    this.$panel.on('submit', Panel.handlePanelFormSubmit);
  }

  private changeOptions(options: IOptions): void {
    this.observer.notify('setting', options);
  }
}

export default Panel;

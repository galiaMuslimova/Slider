import { ISettings } from '../interfaces/interfaces';
import Observer from '../observer/Observer';
import IObserver from '../observer/interface';
import IInput from './interface';
import './input.scss';

class Input implements IInput {
  public observer: IObserver;

  readonly $root: JQuery<HTMLElement>;

  private name: string;

  private type: string;

  private value: number | boolean;

  constructor($root: JQuery<HTMLElement>, key: string, value: number | boolean) {
    this.$root = $root;
    this.value = value;
    this.name = key;
    this.type = (typeof value === 'number') ? 'number' : 'checkbox';
    this.observer = new Observer();
    this.setValue(this.value);
    this.bindEventListeners();
  }

  public getValue(): number | boolean {
    const { value } = this;
    if (typeof value === 'number') {
      Number(value);
    }
    return value;
  }

  public setValue(value: number | boolean): void {
    this.value = value;
    if (typeof value === 'number') {
      this.$root.val(value);
    } else {
      this.$root.prop('checked', value);
    }
  }

  public setProp(name: string, value: number | boolean): void {
    this.$root.prop(name, value);
  }

  private bindEventListeners(): void {
    this.$root.on('change keyup', this.handleInputValueChange.bind(this));
  }

  private handleInputValueChange(event: Event): void {
    switch (this.type) {
      case 'number':
        this.value = Number((<HTMLInputElement>event.target).value);
        break;
      case 'checkbox':
        this.value = (<HTMLInputElement>event.target).checked;
        break;
      default:
        break;
    }
    const setting: ISettings = {};
    setting[this.name] = this.value;
    this.observer.notify('setting', setting);
  }
}

export default Input;

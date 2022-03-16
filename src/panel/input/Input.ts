import { ISettings } from '../../interfaces/interfaces';
import Observer from '../../observer/Observer';
import IObserver from '../../observer/interface';
import IInput from './interface';
import './input.scss';

class Input implements IInput {
  public observer: IObserver;

  readonly element: JQuery<HTMLElement>;

  private name: string;

  private type: string;

  private value: number | boolean;

  constructor(element: JQuery<HTMLElement>) {
    this.element = element;
    this.observer = new Observer();
    this.name = this.element.prop('name');
    this.type = this.element.prop('type');
    this.value = (this.type === 'number') ? this.element.val() : this.element.prop('checked');
    this.bindEventListeners();
  }

  public getName(): string {
    return this.name;
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
      this.element.val(value);
    } else {
      this.element.prop('checked', value);
    }
  }

  public setProp(name: string, value: number | boolean): void {
    this.element.prop(name, value);
  }

  private bindEventListeners(): void {
    this.element.on('change keyup', this.handleInputValueChange.bind(this));
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

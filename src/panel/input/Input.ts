import { ISettings } from '../../interfaces/interfaces';
import Observer from '../../observer/Observer';
import './input.scss';

class Input {
  element: JQuery<HTMLElement>;

  observer: Observer;

  name: string;

  type: string;

  value: number | boolean;

  constructor(element: JQuery<HTMLElement>) {
    this.element = element;
    this.observer = new Observer();
    this.name = this.element.prop('name');
    this.type = this.element.prop('type');
    this.value = (this.type === 'number') ? this.element.val() : this.element.prop('checked');
    this.bindEventListeners();
  }

  bindEventListeners() {
    $(this.element).on('change keyup', this.handleInputValueChange.bind(this));
  }

  handleInputValueChange(event: Event) {
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

  getName() {
    return this.name;
  }

  getValue() {
    return this.value;
  }

  setValue(value: number | boolean) {
    this.value = value;
    if (typeof value === 'number') {
      this.element.val(value);
    } else {
      this.element.prop('checked', value);
    }
  }

  setProp(name: string, value: number | boolean) {
    this.element.prop(name, value);
  }
}

export default Input;

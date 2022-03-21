import { ISettings } from '../../interfaces/interfaces';
import Observer from '../../observer/Observer';
import IObserver from '../../observer/interface';
import IInput from './interface';
import './input.scss';

class Input implements IInput {
  public observer: IObserver;

  public $input: JQuery<HTMLElement>;

  readonly $form: JQuery<HTMLElement>;

  readonly $element: JQuery<HTMLElement>;

  private name: string;

  private type: string;

  private value: number | boolean;

  constructor(form: JQuery<HTMLElement>, key: string, value: number | boolean) {
    this.$form = form;
    this.value = value;
    this.name = key;
    this.type = (typeof value === 'number') ? 'number' : 'checkbox';
    this.$element = this.createInput();
    this.$input = this.$element.find('.js-input__field');
    this.observer = new Observer();
    this.setValue(this.value);
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
      this.$input.val(value);
    } else {
      this.$input.prop('checked', value);
    }
  }

  public setProp(name: string, value: number | boolean): void {
    this.$input.prop(name, value);
  }

  private createInput() {
    const input = jQuery('<div>', { class: 'input js-input' }).appendTo(this.$form);
    const label = jQuery('<label>', { class: 'input__label' }).appendTo(input);
    jQuery('<p>', { class: 'input__text', text: this.name }).appendTo(label);
    jQuery('<input>', {
      class: `input__field js-input__field input__field_with-${this.type}`,
      type: this.type,
      name: this.name,
    }).appendTo(label);
    if (this.type === 'checkbox') {
      jQuery('<span>', { class: 'input__box' }).appendTo(label);
    }
    return input;
  }

  private bindEventListeners(): void {
    this.$input.on('change keyup', this.handleInputValueChange.bind(this));
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

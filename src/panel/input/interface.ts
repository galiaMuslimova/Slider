import IObserver from '../../observer/interface';

interface IInput {
  observer: IObserver;
  readonly element: JQuery<HTMLElement>;

  getName(): string
  getValue(): number | boolean
  setValue(value: number | boolean): void
  setProp(name: string, value: number | boolean): void
}

export default IInput;

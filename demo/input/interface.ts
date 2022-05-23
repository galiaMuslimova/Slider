import IObserver from '../observer/interface';

interface IInput {
  observer: IObserver;
  readonly $root: JQuery<HTMLElement>;

 
  getValue(): number | boolean
  setValue(value: number | boolean): void
  setProp(name: string, value: number | boolean): void
}

export default IInput;

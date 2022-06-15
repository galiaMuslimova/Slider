import IObserver from '../../src/observer/interface';

interface IInput {
  observer: IObserver;
  readonly $root: JQuery<HTMLElement>;

  setValue(value: number | boolean): void
  setProp(name: string, value: number | boolean): void
  setDisable(value: boolean): void;
}

export default IInput;

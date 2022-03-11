import IObserver from '../../../observer/interface';

interface IHandle {
  observer: IObserver;
  readonly $slider: JQuery<HTMLElement>;
  readonly $track: JQuery<HTMLElement>;

  correctHandlesByRange(range: boolean): void
  moveHandles(positions: number[]): void
  setVertical(vertical: boolean): void
}

export default IHandle;

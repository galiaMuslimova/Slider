import { ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface IHandle {
  observer: IObserver;
  hasTip: boolean;

  setVertical(isVertical: boolean): void;
  getElement(): JQuery<HTMLElement>;
  setTrackParameters(trackParameters: ITrackPosition): void;
  moveHandle(item: number, itemPosition: number): void;
  toggleTip(hasTip: boolean): void;
}

export default IHandle;

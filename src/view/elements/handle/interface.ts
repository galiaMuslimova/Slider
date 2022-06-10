import { IPositions, ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface IHandle {
  observer: IObserver;
  hasTip: boolean;

  setVertical(isVertical: boolean): void;
  getElement(): JQuery<HTMLElement>;
  setTrackParameters(trackParameters: ITrackPosition): void;
  moveHandle(parameters: IPositions): void;
  toggleTip(hasTip: boolean): void;
}

export default IHandle;

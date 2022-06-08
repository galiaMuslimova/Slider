import { IPositions, ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface IHandle {
  observer: IObserver;
  isTip: boolean;

  setVertical(vertical: boolean): void;
  getElement(): JQuery<HTMLElement>;
  setTrackParameters(trackParameters: ITrackPosition): void;
  moveHandle(parameters: IPositions): void;
  toggleTip(tip: boolean): void;
}

export default IHandle;

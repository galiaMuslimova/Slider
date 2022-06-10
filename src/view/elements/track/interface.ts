import { ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface ITrack {
  observer: IObserver;

  getElement(): JQuery<HTMLElement>
  setVertical(isVertical: boolean): void
  getTrackParameters(): ITrackPosition
}

export default ITrack;

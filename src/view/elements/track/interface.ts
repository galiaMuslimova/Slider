import { ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface ITrack {
  observer: IObserver;

  init($slider: JQuery<HTMLElement>): void
  setVertical(vertical: boolean): void
  getTrackParameters(): ITrackPosition
  getElement(): JQuery<HTMLElement>
}

export default ITrack;

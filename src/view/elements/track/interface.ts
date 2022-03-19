import { ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface ITrack {
  observer: IObserver;
  $slider: JQuery<HTMLElement>;
  $track: JQuery<HTMLElement>;

  init(vertical: boolean): void
  getTrackParameters(): ITrackPosition
  setVertical(vertical: boolean): void
}

export default ITrack;

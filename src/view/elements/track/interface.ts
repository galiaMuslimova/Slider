import { ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface ITrack {
  observer: IObserver;
  $slider: JQuery<HTMLElement>;
  $track: JQuery<HTMLElement>;
  readonly position: { top: number, left: number };

  getTrackParameters(): ITrackPosition
  setVertical(vertical: boolean): void
}

export default ITrack;

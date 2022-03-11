import { ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface ITrack {
  observer: IObserver;
  readonly $slider: JQuery<HTMLElement>;
  readonly $track: JQuery<HTMLElement>;
  readonly position: { top: number, left: number };

  getTrackParameters(): ITrackPosition
  setVertical(vertical: boolean): void
}

export default ITrack;

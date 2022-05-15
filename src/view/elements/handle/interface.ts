import { IParameters, ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface IHandle {
  observer: IObserver;
  isTip: boolean

  init($track: JQuery<HTMLElement>): void
  setVertical(vertical: boolean): void
  getVertical(): boolean
  getElement(): JQuery<HTMLElement>
  moveHandle(parameters: IParameters): void
  toggleTip(tip: boolean): void
  setTrackParameters(trackParameters: ITrackPosition): void
}

export default IHandle;

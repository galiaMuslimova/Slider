import { IConfig, IParameters, ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface IScale {
  observer: IObserver;

  init($slider: JQuery<HTMLElement>): void;
  setVertical(vertical: boolean): void;
  initStepsArr(config: IConfig, trackParameters: ITrackPosition): void;
  getStepsArr(): IParameters[];
}

export default IScale;

import { IConfig, IPositions, ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface IScale {
  observer: IObserver;

  setVertical(vertical: boolean): void;
  initPositions(config: IConfig, trackParameters: ITrackPosition): void;
  getPositions(): IPositions[];
}

export default IScale;

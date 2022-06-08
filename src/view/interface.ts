import {
  IParameters, IConfig, IPositions,
} from '../interfaces/interfaces';
import IObserver from '../observer/interface';

interface IView {
  observer: IObserver;
  $slider: JQuery<HTMLElement>;

  initConfig(config: IConfig): void;
  setParameters(parameters: IParameters): void;
  getPositions(): IPositions[];
}

export default IView;

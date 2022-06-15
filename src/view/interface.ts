import {
  IConfig, IPositions,
} from '../interfaces/interfaces';
import IObserver from '../observer/interface';

interface IView {
  observer: IObserver;
  $slider: JQuery<HTMLElement>;

  changeConfig(config: IConfig): void;
  setParameters(parameters: IConfig): void;
  getPositions(): IPositions[];
}

export default IView;

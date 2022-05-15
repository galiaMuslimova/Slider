import {
  IParameters, ITrackPosition, IConfig, IOptions, IData,
} from '../interfaces/interfaces';
import IObserver from '../observer/interface';

interface IView {
  observer: IObserver

  init($root: JQuery<HTMLElement>): void
  initConfig(config: IConfig | IOptions): void
  initData(data: IData): void
  getTrackParameters(): ITrackPosition
  setParameters(parameters: IParameters[]): void
  initPanel(config: IConfig): void
}

export default IView;

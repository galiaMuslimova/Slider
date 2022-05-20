import {
  IParameters, ITrackPosition, IConfig, IOptions, IData,
} from '../interfaces/interfaces';
import IObserver from '../observer/interface';

interface IView {
  observer: IObserver

  initSlider($root: JQuery<HTMLElement>, initData: () => void): void
  initElements(): void
  initConfig(config: IConfig | IOptions): void
  initData(data: IData): void
  getTrackParameters(): ITrackPosition
  setParameters(parameters: IParameters[]): void
}

export default IView;

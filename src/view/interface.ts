import {
  IParameters, ITrackPosition, IConfig, IOptions, IData,
} from '../interfaces/interfaces';
import IObserver from '../observer/interface';

interface IView {
  observer: IObserver
  $slider: JQuery<HTMLElement>

  initSlider($root: JQuery<HTMLElement>, config: IConfig): void
  initData(data: IData): void
  changeConfig(config: IConfig): void
  getTrackParameters(): ITrackPosition
  setParameters(parameters: IParameters[]): void
}

export default IView;

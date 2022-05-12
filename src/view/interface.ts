import {
  IParameters, ITrackPosition, IConfig, IOptions,
} from '../interfaces/interfaces';
import IObserver from '../observer/interface';

interface IView {
  observer: IObserver

  init($root: JQuery<HTMLElement>): void
  correctScale(stepsArr: IParameters[]): void
  getTrackParameters(): ITrackPosition
  toggleDirection(config: IConfig | IOptions): void
  toggleRange(config: IConfig | IOptions): void
  toggleTip(config: IConfig | IOptions): void
  setParameters(parameters: IParameters[]): void
  initPanel(config: IConfig): void
}

export default IView;

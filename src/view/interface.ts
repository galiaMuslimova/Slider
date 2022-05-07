import {
  ISettings, IParameters, ITrackPosition, IConfig,
} from '../interfaces/interfaces';
import IObserver from '../observer/interface';

interface IView {
  observer: IObserver

  init($root: JQuery<HTMLElement>): void
  correctScale(stepsArr: IParameters[]): void
  getTrackParameters(): ITrackPosition
  toggleDirection(vertical: boolean): void
  toggleRange(vertical: boolean): void
  setParameters(parameters: IParameters[]): void
  setSettings(setting: ISettings): void
  initPanel(config: IConfig): void
}

export default IView;

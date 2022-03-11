import {
  ISettings, IParameters, IStepsArr, ITrackPosition, IConfig,
} from '../interfaces/interfaces';
import IObserver from '../observer/interface';

interface IView {
  observer: IObserver
  readonly $root: JQuery<HTMLElement>
  readonly $container: JQuery<HTMLElement>
  readonly $slider: JQuery<HTMLElement>

  getTrackParameters(): ITrackPosition
  initScale(stepsArr: IStepsArr[]): void
  correctHandlesByRange(range:boolean): void
  initTips(tip: boolean): void
  changeTips(values: number[]): void
  changeDirection(vertical: boolean): void
  setParameters(parameters: IParameters): void
  setSettings(setting: ISettings): void
  initPanel(config: IConfig): void
}

export default IView;

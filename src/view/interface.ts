import {
  ISettings, IParameters, ITrackPosition, IConfig,
} from '../interfaces/interfaces';
import IObserver from '../observer/interface';
import IPanel from '../panel/interface';
import IHandle from './elements/handle/interface';
import IInterval from './elements/interval/interface';
import IScale from './elements/scale/interface';
import ITip from './elements/tip/interface';
import ITrack from './elements/track/interface';

interface IView {
  observer: IObserver
  readonly $container: JQuery<HTMLElement>
  readonly $slider: JQuery<HTMLElement>
  scale: IScale
  handles: IHandle
  track: ITrack
  interval: IInterval
  tips: ITip
  panel: IPanel | undefined

  init(stepsArr: IParameters[]): void
  getTrackParameters(): ITrackPosition
  initScale(stepsArr: IParameters[]): void
  correctHandlesByRange(range:boolean): void
  initTips(tip: boolean): void
  changeTips(parameters: IParameters[]): void
  changeDirection(vertical: boolean): void
  setParameters(parameters: IParameters[]): void
  setSettings(setting: ISettings): void
  initPanel(config: IConfig): void
}

export default IView;

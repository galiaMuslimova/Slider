import {
  IParameters, IEventPosition, IOptions, IConfig, ISettings,
} from '../interfaces/interfaces';

interface IModel {
  readonly options: IOptions;

  init(): void
  correctMinMax(config?: IConfig): IConfig
  initStepsArr(): IParameters[]
  correctFromTo(config?: IConfig): IConfig
  initParameters(): IParameters[]
  takeParamHandleMove(options: IEventPosition): IParameters[] | undefined
  correctFromToByParams(): IParameters[]
  takeParamScaleClick(value: number): IParameters[]
  takeParamTrackClick(position: number): IParameters[]
  getConfig(): IConfig
  setConfig(config: IConfig): void
  setSetting(setting: ISettings): void
  getParameters(): IParameters[]
  setTrackParameters(trackStart: number, trackWidth: number | undefined): void
  getStepsArr(): IParameters[]
}

export default IModel;

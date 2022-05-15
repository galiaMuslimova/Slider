import {
  IParameters, IEventPosition, IOptions, IConfig, ISettings, IData, ICoordinates, IChanges,
} from '../interfaces/interfaces';

interface IModel {
  readonly options: IOptions;

  init(): void
  changeParameter(parameter: IChanges, order?: number): IParameters[]
  correctFromToByParams(): IData
  setOptions(options: IOptions): void
  getOptions(): IConfig
  getData(): IData
  getConfig(): IConfig
  getValues(): number[]
  setSetting(setting: ISettings): void
  setTrackParameters(trackStart: number, trackWidth: number | undefined): void
}

export default IModel;

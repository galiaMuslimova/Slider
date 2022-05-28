import {
  IParameters, ITrackPosition, IOptions, IConfig, ISettings, IData, ICoordinates,
} from '../interfaces/interfaces';

interface IModel {
  init(trackParameters: ITrackPosition): void
  changeParameter(parameter: ICoordinates, order?: number): IParameters[]
  correctFromToByParams(): IData
  setOptions(options: IOptions): void
  getOptions(): IConfig
  getData(): IData
  getConfig(): IConfig
  getValues(): number[]
  setSetting(setting: ISettings): void
}

export default IModel;

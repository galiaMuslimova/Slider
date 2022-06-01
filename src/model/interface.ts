import {
  IParameters, ITrackPosition, IOptions, IConfig, ISettings, IData, ICoordinates,
} from '../interfaces/interfaces';

interface IModel {
  init(trackParameters: ITrackPosition): void
  changeParameter(parameter: ICoordinates, order?: number): IParameters[]
  correctFromToByParams(): IData
  setOptions(options: IOptions): void
  getData(): IData
  getConfig(): IConfig
  setSetting(setting: ISettings): void
}

export default IModel;

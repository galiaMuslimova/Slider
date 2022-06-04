import {
  IParameters, ITrackPosition, IOptions, IConfig, IData, ICoordinates,
} from '../interfaces/interfaces';

interface IModel {
  init(trackParameters: ITrackPosition): void;
  changeParameter(parameter: ICoordinates, order?: number): IParameters[];
  correctFromTo(): void;
  setOptions(options: IOptions): void;
  getData(): IData;
  getConfig(): IConfig;
}

export default IModel;

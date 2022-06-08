import {
  IParameters, IOptions, IConfig, ICoordinates, IPositions,
} from '../interfaces/interfaces';

interface IModel {
  init(positions: IPositions[]): void;
  changeParameter(parameter: ICoordinates, order?: number): IParameters;
  correctParameters(): void;
  setOptions(options: IOptions): void;
  getParameters(): IParameters;
  getConfig(): IConfig;
}

export default IModel;

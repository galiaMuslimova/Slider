import {
  IOptions,
  IConfig,
  ICoordinates,
  IPositions,
} from '../interfaces/interfaces';

interface IModel {
  init(positions: IPositions[]): void;
  changeParameter(parameter: ICoordinates): void;
  correctParameters(): void;
  setOptions(options: IOptions): void;
  getOptions(): IOptions;
  getConfig(): IConfig
}

export default IModel;

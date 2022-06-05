import {
  IParameters, IOptions, IConfig, ICoordinates,
} from '../interfaces/interfaces';

interface IModel {
  init(stepsArr: IParameters[]): void;
  changeParameter(parameter: ICoordinates, order?: number): IParameters[];
  correctParameters(): void;
  setOptions(options: IOptions): void;
  getParameters(): IParameters[];
  getConfig(): IConfig;
}

export default IModel;

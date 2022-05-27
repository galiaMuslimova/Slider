import IController from './controller/interface';
import { IConfig, IOptions } from './interfaces/interfaces';

interface IMetaSlider {
  controller: IController;

  setOptions(options: IOptions): IConfig
  getOptions(): IConfig
  getValues(): number[]
}

export default IMetaSlider;

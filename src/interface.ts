import IController from './controller/interface';
import { IOptions } from './interfaces/interfaces';

interface IMetaSlider {
  controller: IController;

  setOptions(options: IOptions): void
  getOptions(): IOptions
}

export default IMetaSlider;

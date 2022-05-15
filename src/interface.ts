import IController from './controller/interface';
import { IConfig, IOptions } from './interfaces/interfaces';

interface IMetaSlider {
  controller: IController;

  addPanel(): void
  setOptions(options: IOptions): void
  getOptions(): IConfig
  getValues(): number[]
}

export default IMetaSlider;

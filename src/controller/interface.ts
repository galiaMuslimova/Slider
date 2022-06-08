import { IConfig, IOptions } from '../interfaces/interfaces';
import IModel from '../model/interface';
import IView from '../view/interface';

interface IController {
  view: IView;
  model: IModel;

  setOptions(options: IOptions): void
  getOptions(): IConfig
}

export default IController;

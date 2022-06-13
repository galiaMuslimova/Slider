import { IOptions } from '../interfaces/interfaces';
import IModel from '../model/interface';
import IView from '../view/interface';

interface IController {
  view: IView;
  model: IModel;

  setOptions(options: IOptions): void
  getOptions(): IOptions
}

export default IController;

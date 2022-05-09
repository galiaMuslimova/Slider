import { IOptions } from '../interfaces/interfaces';
import IModel from '../model/interface';
import IView from '../view/interface';

interface IController {
  view: IView;
  model: IModel;
  readonly options: IOptions;
  readonly $root: JQuery<HTMLElement>;

  addPanel(): void
}

export default IController;

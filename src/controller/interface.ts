import { IOptions } from '../interfaces/interfaces';

interface IController {
  readonly options: IOptions;
  readonly $root: JQuery<HTMLElement>;
}

export default IController;

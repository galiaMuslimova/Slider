import Controller from './controller/Controller';
import { IOptions } from './interfaces/interfaces';

class MetaSlider {
  readonly controller: Controller;

  constructor(element: JQuery<HTMLElement>, options: IOptions) {
    this.controller = new Controller(element, options);
  }
}

export default MetaSlider;

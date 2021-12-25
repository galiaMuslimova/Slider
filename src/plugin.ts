import './plugin.scss';
import Controller from './controller/controller';
import { IOptions } from './interfaces';

declare global {
  interface JQuery {
    slider(options: IOptions): void;
  }
}

class MetaSlider {
  controller: Controller;
  constructor(element: JQuery<HTMLElement>, options: IOptions) {
    this.controller = new Controller(element, options);
    this.controller.init();
  }
}

export default MetaSlider;

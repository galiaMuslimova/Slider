import './plugin.scss';
import Controller from './controller/controller';
import { IConfig } from './interfaces';

declare global {
  interface JQuery {
    slider(options: IConfig): void;
  }
}

class MetaSlider {
  controller: Controller;

  constructor(element: JQuery<HTMLElement>, options:IConfig) {
    this.controller = new Controller(element, options);
    this.controller.init();
  }
}

export default MetaSlider;

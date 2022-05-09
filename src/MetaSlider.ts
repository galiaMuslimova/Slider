import Controller from './controller/Controller';
import { IOptions } from './interfaces/interfaces';
import IMetaSlider from './interface';

class MetaSlider implements IMetaSlider {
  readonly controller: Controller;

  constructor(element: JQuery<HTMLElement>, options: IOptions) {
    this.controller = new Controller(element, options);
    this.init();
  }

  public addPanel() {
    this.controller.addPanel();
  }

  private init() {
    return this;
  }
}

export default MetaSlider;

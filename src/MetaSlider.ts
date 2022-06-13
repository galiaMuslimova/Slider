import Controller from './controller/Controller';
import { IOptions } from './interfaces/interfaces';
import IMetaSlider from './interface';

class MetaSlider implements IMetaSlider {
  readonly controller: Controller;

  constructor(element: JQuery<HTMLElement>, options: IOptions) {
    this.controller = new Controller(element, options);
  }

  public setOptions(options: IOptions): void {
    this.controller.setOptions(options);
  }

  public getOptions(): IOptions {
    return this.controller.getOptions();
  }
}

export default MetaSlider;

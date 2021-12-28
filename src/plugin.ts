import { IOptions } from "./interfaces"; 
import Controller from "./controller/controller";

class MetaSlider {
  controller: Controller;  

  constructor(element: JQuery<HTMLElement>, options: IOptions) {
    this.controller = new Controller(element, options);
  }
}

export default MetaSlider;

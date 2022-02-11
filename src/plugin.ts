import Controller from "./controller/Controller"; 
import { IOptions } from "./interfaces/interfaces"; 

class MetaSlider {
  controller: Controller;  

  constructor(element: JQuery<HTMLElement>, options: IOptions) {
    this.controller = new Controller(element, options);
    return this;
  }
}

export default MetaSlider;

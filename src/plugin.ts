import { IOptions } from "./interfaces"; 
import Controller from "./controller/controller";
import "./plugin_styles.scss"

class MetaSlider {
  controller: Controller;  

  constructor(element: JQuery<HTMLElement>, options: IOptions) {
    this.controller = new Controller(element, options);
    return this
  }
}

export default MetaSlider;

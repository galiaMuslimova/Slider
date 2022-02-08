import Controller from "./controller/controller"; 
import { IOptions } from "./interfaces"; 
import "./plugin_styles.scss"

class MetaSlider {
  controller: Controller;  

  constructor(element: JQuery<HTMLElement>, options: IOptions) {
    this.controller = new Controller(element, options);
    return this
  }
}

export default MetaSlider;

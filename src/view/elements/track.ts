import { IConfig } from "../../interfaces";

export default class Track {
  config: IConfig;
  slider: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.slider = slider;
    this.config = config;   
    this.init()
  }

  init(){
    jQuery('<div>', {
      class: 'meta-slider__track',
    }).appendTo(this.slider);
  }
}
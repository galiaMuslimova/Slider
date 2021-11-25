import { IConfig } from "../../interfaces";

export default class Interval {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  interval: JQuery<HTMLElement>;
  track: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.slider = slider;
    this.config = config;
    this.track = $(this.slider).find('.slider__track');
    jQuery('<div>', {
      class: 'slider__interval',
    }).appendTo(this.track);
    this.interval = this.slider.find(".slider__interval");
  }

  moveInterval(handleX: number[]){
    let left;
    let right;
    switch (handleX.length) {
      case 1:
        left = this.config.min;
        right = handleX[0];
        break;
      case 2:
        left = handleX[0];
        right = handleX[1];
        break;
    }
    
    if (left == undefined) {
      throw new Error("left point error")
    } else if (right == undefined) {
      throw new Error("right point error")
    } else {
      let width = right - left;
      this.interval.width(`${width}px`);
      this.interval.css("left", `${left}px`);
    }
  }
}
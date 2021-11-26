import { IConfig } from "../../interfaces";

export default class Interval {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  interval: JQuery<HTMLElement>;
  track: JQuery<HTMLElement>;
  handleWidth: number;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.slider = slider;
    this.config = config;
    this.handleWidth = 20;
    this.track = $(this.slider).find('.slider__track');
    jQuery('<div>', {
      class: 'slider__interval',
    }).appendTo(this.track);
    this.interval = this.slider.find(".slider__interval");
  }

  moveInterval(handleX: number[]) {
    switch (handleX.length) {
      case 1:
        this.interval.width(`${handleX[0]}px`);
        this.interval.css("left", `0px`);
        break;
      case 2:
        let left = handleX[0] + this.handleWidth;
        let width = handleX[1] - left;
        this.interval.width(`${width}px`);
        this.interval.css("left", `${left}px`);
        break;
    }
  }

  setHandleWidth(handleWidth: number){
    this.handleWidth = handleWidth;
  }
}
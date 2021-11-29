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
    let start: number;
    let width: number;
    switch (handleX.length) {
      case 1:
        start = 0;
        width = handleX[0];
        this.config.isVertical ? this.interval.height(`${width}px`) : this.interval.width(`${width}px`);
        this.config.isVertical ? this.interval.css("top", `${start}px`) : this.interval.css("left", `${start}px`);
        break;
      case 2:
        start = Math.min(handleX[0], handleX[1]) + this.handleWidth;
        width = Math.max(handleX[0], handleX[1]) - start;
        this.config.isVertical ? this.interval.height(`${width}px`):this.interval.width(`${width}px`);
        this.config.isVertical ? this.interval.css("top", `${start}px`) : this.interval.css("left", `${start}px`);
        break;
    }
  }

  setHandleWidth(handleWidth: number) {
    this.handleWidth = handleWidth;
  }
}
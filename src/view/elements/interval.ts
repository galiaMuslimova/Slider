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

  moveInterval(handleX: number[]) {
    let start: number;
    let width: number;
    let handleWidth = this.config.handleWidth ? this.config.handleWidth : 20;
    if (handleX.length == 1) {
      start = 0;
      width = handleX[0] - 2 - handleWidth / 2;
    } else if (handleX.length == 2) {
      let minHandle = Math.min(handleX[0], handleX[1]);
      let maxHandle = Math.max(handleX[0], handleX[1]);
      start = minHandle + handleWidth/2;
      width = maxHandle - minHandle - handleWidth - 2;
    } else {
      throw new Error('wrong number of handles')
    }
    this.config.vertical ? this.interval.height(`${width}px`) : this.interval.width(`${width}px`);
    this.config.vertical ? this.interval.css("top", `${start}px`) : this.interval.css("left", `${start}px`);
  }
}
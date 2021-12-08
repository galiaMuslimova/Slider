import { IConfig } from "../../interfaces";

export default class Interval {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  interval: JQuery<HTMLElement>;
  track: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.slider = slider;
    this.config = config;
    this.track = $(this.slider).find('.meta-slider__track');
    jQuery('<div>', {
      class: 'meta-slider__interval',
    }).appendTo(this.track);
    this.interval = this.slider.find(".meta-slider__interval");
  }

  moveInterval(handleX: number[]) {
    let min: number;
    let width: number;
    let handleWidth = 20;
    if (handleX.length == 1) {
      min = 0;
      width = handleX[0] - 2 - handleWidth / 2;
    } else if (handleX.length == 2) {
      let minHandle = Math.min(handleX[0], handleX[1]);
      let maxHandle = Math.max(handleX[0], handleX[1]);
      min = minHandle + handleWidth/2;
      width = maxHandle - minHandle - handleWidth - 2;
    } else {
      throw new Error('wrong number of handles')
    }
    this.config.vertical ? this.interval.height(`${width}px`) : this.interval.width(`${width}px`);
    this.config.vertical ? this.interval.css("top", `${min}px`) : this.interval.css("left", `${min}px`);
  }
}
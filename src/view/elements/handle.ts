import Observer from "../../observer";
import { IConfig } from "../../interfaces";

export default class Handle {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  track: JQuery<HTMLElement>;
  observer: Observer;
  handles: JQuery<HTMLElement>[];
  handleX: number[];

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.slider = slider;
    this.config = config;
    this.observer = new Observer();
    this.track = $(this.slider).find('.meta-slider__track');
    this.handles = [];
    this.handleX = [];
    this.initHandles();
  }

  initHandles(range = this.config.range) {
    this.handles = []
    this.slider.find('.meta-slider__handle').remove()
    let handle = jQuery('<div>', {
      class: 'meta-slider__handle meta-slider__handle_left',
    }).appendTo(this.track);
    this.handles.push(handle);
    if (range) {
      let handle2 = jQuery('<div>', {
        class: 'meta-slider__handle meta-slider__handle_right',
      }).appendTo(this.track);
      this.handles.push(handle2);
    } 
  }

  moveHandles(handleX: number[]) {
    let handleWidth = this.config.handleWidth ? this.config.handleWidth : 20;
    for (let i in this.handles) {
      this.handles[i].css(this.config.vertical ? "top" : "left", `${handleX[i] - handleWidth / 2}px`);
    }
    this.handleX = handleX;
  }
}
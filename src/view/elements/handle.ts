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
    this.track = $(this.slider).find('.slider__track');
    this.handles = [];
    this.handleX = [];
    this.init();
  }

  init() {
    let handle = jQuery('<div>', {
      class: 'slider__handle slider__handle_left',
    }).appendTo(this.track);
    this.handles.push(handle);
    if (this.config.range) {
      let handle2 = jQuery('<div>', {
        class: 'slider__handle slider__handle_right',
      }).appendTo(this.track);
      this.handles.push(handle2);
    } 
  }

  moveHandles(handleX: number[]) {
    if(handleX.length == 1) {
      this.handles[1].remove()
    } else {
      this.handles[1].appendTo(this.track);
    }
    let handleWidth = this.config.handleWidth ? this.config.handleWidth : 20;
    for (let i in this.handles) {
      this.handles[i].css(this.config.vertical ? "top" : "left", `${handleX[i] - handleWidth / 2}px`);
    }
    this.handleX = handleX;
  }
}
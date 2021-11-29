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
    switch (this.config.handleCount) {
      case 1:
        let handle = jQuery('<div>', {
          class: 'slider__handle',
        }).appendTo(this.track);
        this.handles.push(handle);
        break;
      case 2:
        let handle1 = jQuery('<div>', {
          class: 'slider__handle slider__handle_left',
        }).appendTo(this.track);
        let handle2 = jQuery('<div>', {
          class: 'slider__handle slider__handle_right',
        }).appendTo(this.track);
        this.handles.push(handle1, handle2);
        break;
    }
  }

  moveHandles(handleX: number[]) {
    for (let i in this.handles){
      this.handles[i].css(this.config.isVertical?"top":"left", `${handleX[i]}px`);
    }
    this.handleX = handleX;
  }
}
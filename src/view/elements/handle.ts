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
        jQuery('<div>', {
          class: 'slider__handle',
        }).appendTo(this.track);
        this.handles.push($(this.slider).find('.slider__handle'));
        break;
      case 2:
        jQuery('<div>', {
          class: 'slider__handle slider__handle_left',
        }).appendTo(this.track);
        jQuery('<div>', {
          class: 'slider__handle slider__handle_right',
        }).appendTo(this.track);
        this.handles.push($(this.slider).find('.slider__handle_left'), $(this.slider).find('.slider__handle_right'));
        break;
    }
  }

  initHandles(handleX: number[]) {
    switch (this.handles.length) {
      case 1:
        this.handles[0].css("left", `${handleX[0]}px`);
        break;
      case 2:
        this.handles[0].css("left", `${handleX[0]}px`);
        this.handles[1].css("left", `${handleX[1]}px`);
        break;
    }
    this.handleX = handleX;
  }

  moveByHandle(x: number, handle: JQuery<HTMLElement>) {
    for (let i in this.handles) {
      if (this.handles[i] == handle) {
        this.handles[i].css("left", `${x}px`);
        this.handleX[i] = x;
        if (this.handleX[0] > this.handleX[1]) {
          this.handleX = this.handleX.reverse();
          this.handles = this.handles.reverse();
        }
        return this.handleX;
      }
    }
  }

  moveByX(x: number) {
    if (this.handles.length == 1) {
      this.handles[0].css("left", `${x}px`);
      this.handleX[0] = x;
    } else {
      let index = this.handleX.reduce(function (prev, curr) {
        return (Math.abs(curr - x) < Math.abs(prev - x) ? 1 : 0);
      });
      this.handles[index].css("left", `${x}px`);
      this.handleX[index] = x;
    }
    return this.handleX;
  }
}
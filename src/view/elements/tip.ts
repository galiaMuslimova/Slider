import Observer from "../../observer";
import { IConfig } from "../../interfaces";

export default class Handle {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  track: JQuery<HTMLElement>;
  observer: Observer;
  handles: JQuery<HTMLElement>[];
  //tips: JQuery<HTMLElement>[];
  handleX: [];

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
    let handles: JQuery<HTMLElement>[] = [];
    $(this.slider).find('.slider__handle').each(function () {
      handles.push($(this))
    });
    this.handles = handles;
  }

  initTips(handleX: number[]) {
    jQuery('<div>', {
      class: 'slider__tip',
    }).appendTo(this.handles[0]);
  }
}
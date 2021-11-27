import Observer from "../../observer";
import { IConfig } from "../../interfaces";

export default class Handle {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  observer: Observer;
  handles: JQuery<HTMLElement>[];
  tips: JQuery<HTMLElement>[];

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.slider = slider;
    this.config = config;
    this.observer = new Observer();
    this.handles = [];
    this.tips = [];
    this.init();
  }

  init() {
    let handles: JQuery<HTMLElement>[] = [];
    $(this.slider).find('.slider__handle').each(function () {
      handles.push($(this))
    });
    this.handles = handles;
  }

  initTips(values: number[]) {
    for (let i in values) {
      let tip = jQuery('<div>', {
        class: 'slider__tip',
        text: values[i]
      }).appendTo(this.handles[i]);
      this.tips.push($(tip))
    }
  }

  changeTips(values:number[]){
    for (let i in this.tips) {
      this.tips[i].html(`${values[i]}`)
    }
  }
}
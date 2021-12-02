import Observer from "../../observer";
import { IConfig } from "../../interfaces";

export default class Handle {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  observer: Observer;
  handles: JQuery<HTMLElement>[];
  tips: JQuery<HTMLElement>[];
  tip: JQuery<HTMLElement>;
  handleWidth: number;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.slider = slider;
    this.config = config;
    this.observer = new Observer();
    this.handles = [];
    this.tips = []
    this.handleWidth = this.config.handleWidth ? this.config.handleWidth : 20;
    this.tip = jQuery('<div>', {
      class: 'meta-slider__tip',
      style: `line-height: ${this.handleWidth}px`
    })
    this.initTips()
  }

  initTips(tip = this.config.tip) {
    this.slider.find('.meta-slider__tip').remove();
    this.tips = [];
    let handles = this.slider.find('.meta-slider__handle');
    if (tip) {
      for (let i = 0; i < handles.length; i++) {
        let tip = this.tip.clone();
        tip.appendTo($(handles[i]));
        this.tips.push(tip)
      }
    }
  }

  changeTips(values: number[]) {
    for (let i in this.tips) {
      this.tips[i].html(`${values[i]}`)
    }
  }
}
import { IConfig, ISettings } from "../../interfaces";

export default class Scale {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  scale: JQuery<HTMLElement>;
  trackWidth: number | undefined;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.slider = slider;
    this.config = config;
    jQuery('<div>', {
      class: 'slider__scale',
    }).appendTo(this.slider);
    this.scale = this.slider.find(".slider__scale");    
  }

  initScale(stepsArr: { value: number, x: number }[]){
    this.scale.empty()
    let handleWidth = this.config.handleWidth ? this.config.handleWidth : 20;
    stepsArr.map(item => {
      jQuery('<div>', {
        class: 'slider__value',
        data_value: item.value,
        text: item.value,
        style: this.config.vertical ? `top: ${item.x - handleWidth / 2}px`:`left: ${item.x - handleWidth/2}px`
      }).appendTo(this.scale);
    })
  }
}
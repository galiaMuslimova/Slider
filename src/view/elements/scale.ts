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
    stepsArr.map(item => {
      jQuery('<div>', {
        class: 'slider__value',
        data_value: item.value,
        text: item.value,
        style: this.config.isVertical?`top: ${item.x}px`:`left: ${item.x}px`
      }).appendTo(this.scale);
    })
  }
}
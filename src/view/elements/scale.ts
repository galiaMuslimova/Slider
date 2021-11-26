import { IConfig, ISettings } from "../../interfaces";

export default class Scale {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  scale: JQuery<HTMLElement>;
  track: JQuery<HTMLElement>;
  trackWidth: number | undefined;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.slider = slider;
    this.config = config;
    this.track = this.slider.find(".slider__track");
    jQuery('<div>', {
      class: 'slider__scale',
    }).appendTo(this.slider);
    this.scale = this.slider.find(".slider__scale");
    this.trackWidth = this.slider.width();
  }

  initValuesPosition(positionsArr: { value: number, x: number }[]){
    this.scale.empty()
    positionsArr.map(item => {
      let value = jQuery('<div>', {
        class: 'slider__value',
        data_value: item.value,
        text: item.value,
        style: `left: ${item.x}px`
      }).appendTo(this.scale);
    })
  }
  
}
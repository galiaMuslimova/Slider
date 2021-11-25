import { IConfig, ISettings } from "../../interfaces";

export default class Scale {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  scale: JQuery<HTMLElement>;
  sliderWidth: number | undefined;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.slider = slider;
    this.config = config;
    jQuery('<div>', {
      class: 'slider__scale',
    }).appendTo(this.slider);
    this.scale = this.slider.find(".slider__scale");
    this.sliderWidth = this.slider.width();
    this.initScaleValues()
  }

  initScaleValues() {
    if (this.config.max && this.config.min && this.config.step) {
      for (let i = this.config.min; i <= this.config.max; i += this.config.step) {
        jQuery('<div>', {
          class: 'slider__value',
          data_value: i,
          text: i,          
        }).appendTo(this.scale);
      }
    } else {
      throw new Error('wrong parameters')
    }
  }

  changeScale(settings: ISettings) {
    this.config = $.extend(this.config, settings);
    $(this.scale).find('.slider__value').each(function () {
      this.remove()
    });
    this.initScaleValues();
  }
}
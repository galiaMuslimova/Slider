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
    if (!this.config.max) {
      throw new Error("max number error")
    } else if (!this.config.min) {
      throw new Error("min number error")
    } else if (!this.config.step) {
      throw new Error("step number error")
    } else if (!this.sliderWidth) {
      throw new Error("wrong width of slider")
    } else {
      let range = this.config.max - this.config.min;
      let stepWidth = this.sliderWidth / range * this.config.step;
      for (let i = this.config.min; i <= this.config.max; i += this.config.step) {
        jQuery('<div>', {
          class: 'slider__value',
          data_value: i,
          style: `width: ${stepWidth}px`
        }).appendTo(this.scale);
      }
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
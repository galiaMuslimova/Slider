export default class Scale {
  constructor(slider, config) {
    this.slider = slider;
    this.config = config;
    this.scale;
    this.init()
  }

  init() {
    let scale = `<div class="slider__scale"></div>`;
    this.slider[0].insertAdjacentHTML("beforeEnd", scale);
    this.scale = this.slider.find(".slider__scale")[0];
    this.initValues();
  }

  initValues(){
    let sliderWidth = this.slider[0].getBoundingClientRect().width;
    let range = this.config.max - this.config.min;
    let stepWidth = sliderWidth / range * this.config.step;
    for (let i = this.config.min; i <= this.config.max; i += this.config.step) {
      let item = `<div class="slider__value" data_value=${i} style="width: ${stepWidth}px;">${i}</div>`;
      this.scale.insertAdjacentHTML("beforeEnd", item);
    }
  }

  changeScale(settings){
    this.config[settings.key] = +settings.value;
    $(this.scale).find('.slider__value').each(function(){
      this.remove()
    });
    this.initValues();
  }
}
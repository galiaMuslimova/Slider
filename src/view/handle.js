export default class Handle {
  constructor(handle, config) {
    this.handle = handle;
    this.config = config;
  }

  moveByX(x) {
    this.handle.style.left = x + 'px';
    return x;
  }

  moveByValue(value) {
    let slider = this.handle.closest(".slider");
    let valueElement = $(slider).find(`.slider__value[data_value=${value}]`);
    let valuePosition = valueElement[0].getBoundingClientRect().left;
    let x = valuePosition - this.config.sliderLeft;
    this.moveByX(x);
  }

  takePositionByValue(value) {
    let slider = this.handle.closest(".slider");
    let valueElement = $(slider).find(`.slider__value[data_value=${value}]`);
    let valuePosition = valueElement[0].getBoundingClientRect().left;
    let x = valuePosition - this.config.sliderLeft;
    return x;
  }

  takeValueByPosition(x) {
    
    return value;
  }
}
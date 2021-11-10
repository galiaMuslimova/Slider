export default class Handle {
  constructor(handle, config) {
    this.handle = handle;
    this.config = config;
  }

  moveByX(x) {
    this.handle.style.left = x + 'px';
  }

  moveByValue(value) {
    let slider = this.handle.closest(".slider");
    let valueElement = $(slider).find(`.slider__value[data_value=${value}]`);
    let valuePosition = valueElement[0].getBoundingClientRect().left;
    let x = valuePosition - this.config.sliderLeft;
    this.moveByX(x);
  }

  takePositionByValue(value){
    let slider = this.handle.closest(".slider");
    let valueElement = $(slider).find(`.slider__value[data_value=${value}]`);
    let valuePosition = valueElement[0].getBoundingClientRect().left;
    let x = valuePosition - this.config.sliderLeft;
    return x;
  }

  moveByMouse(event) {
    let endPosition = this.config.sliderLeft + this.config.sliderWidth;
    let sibling = $(this.handle).siblings('.slider__handle');
    let hasSibling = sibling.length > 0;
    let siblingHandlePosition;
    if (hasSibling) {
      siblingHandlePosition = sibling[0].getBoundingClientRect().left;
    }     

    let isFirst = $(this.handle).hasClass('slider__handle_first');
    let isSecond = $(this.handle).hasClass('slider__handle_second');

    let movedStepsCount = Math.round((event.pageX - this.config.sliderLeft) / this.config.stepLength);
    let x = this.config.stepLength * movedStepsCount;

    if (isFirst) {
      if (hasSibling){
        if ((event.pageX < siblingHandlePosition) && (event.pageX > this.config.sliderLeft)) {
          this.moveByX(x);
          return x
        }
      } else {
        if ((event.pageX < endPosition) && (event.pageX > this.config.sliderLeft)) {
          this.moveByX(x);
          return x
        }
      }      
    }
    else if (isSecond) {
      if ((event.pageX < endPosition) && (event.pageX > siblingHandlePosition)) {
        this.moveByX(x);
        return x
      }
    }
  }
}
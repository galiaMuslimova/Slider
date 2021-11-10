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

  moveByMouse(event) {
    let endPosition = this.config.sliderLeft + this.config.sliderWidth;
    let siblingHandlePosition = $(this.handle).siblings()[0].getBoundingClientRect().left;

    let isLeft = $(this.handle).hasClass('slider__handle_left');
    let isRight = $(this.handle).hasClass('slider__handle_right');

    let movedStepsCount = Math.round((event.pageX - this.config.sliderLeft) / this.config.stepLength);
    let x = this.config.stepLength * movedStepsCount;

    if (isLeft) {
      if ((event.pageX < siblingHandlePosition) && (event.pageX > this.config.sliderLeft)) {
        this.moveByX(x);
      }
    }
    else if (isRight) {
      if ((event.pageX < endPosition) && (event.pageX > siblingHandlePosition)) {
        this.moveByX(x);
      }
    }
  }
}
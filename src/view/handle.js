export default class Handle {
  constructor(element, config){
    this.element = element;
    this.config = config;
    this.trackPosition;
    this.stepLength;
    this.value;    
    this.x;    
  }

  init(){
    let handle = this.element;
    this.trackPosition = handle.find('.slider__track')[0].getBoundingClientRect();
    let stepsCount = (this.config.max - this.config.min) / this.config.step;
    this.stepLength = this.trackPosition.width/stepsCount;
  }

  move(x){
    let handle = this.element;
    handle.style.left = x + 'px';
  }

  changePosition(value) {
    let scalePosition = $('.slider__scale')[0].getBoundingClientRect().left;
    let valueElement = $('.slider__scale').find(`.slider__value[data_value=${value}]`);
    let valuePosition = valueElement[0].getBoundingClientRect().left;
    let x = valuePosition - scalePosition;
    this.x = x;
    return x
  }

  moveHandle() {
    let handle = this.element;

    function onMouseMove(event) {
      let trackWidth = this.trackPosition.width;
      let startPositionX = trackPosition.left;
      let endPositionX = startPositionX + trackWidth;
      let siblingHandlePosition = $(handle).siblings()[0].getBoundingClientRect().left;
      let isLeft = $(handle).hasClass('slider__handle_left');
      let isRight = $(handle).hasClass('slider__handle_right');

      if(isLeft) {
        if ((event.pageX < siblingHandlePosition) && (event.pageX > startPositionX)) {
          handle.style.left = event.pageX - startPositionX + window.pageXOffset + 'px';
        }
      }
      else if(isRight) {
        if ((event.pageX < endPositionX) && (event.pageX > siblingHandlePosition)) {
          handle.style.left = event.pageX - startPositionX + window.pageXOffset + 'px';
        }
      }
    }

    document.onmousemove = function (event) {
      onMouseMove(event)
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };

    handle.ondragstart = function () {
      return false;
    };
  } 
}
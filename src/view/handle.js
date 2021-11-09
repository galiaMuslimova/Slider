export default class Handle {
  constructor(element){
    this.element = element;
  }

  moveHandle() {
    let handle = this.element;

    function onMouseMove(event) {
      let trackPosition = handle.closest('.slider__track').getBoundingClientRect();
      let trackWidth = trackPosition.width;
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
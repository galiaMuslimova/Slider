export default class Handle {
  constructor(){
    this.element;
  }

  moveHandle(element) {
    let handle = element;
    let trackPosition = handle.closest('.slider__track').getBoundingClientRect();

    let startPositionX = trackPosition.left;
    let trackWidth = trackPosition.width;

    function moveAt(pageX) {
      if ((pageX - startPositionX < trackWidth) && (pageX > startPositionX)) {
        handle.style.left = pageX - startPositionX + window.pageXOffset + 'px';
        handle.style.top = 0 + 'px';
      }
    }

    function onMouseMove(event) {
      moveAt(event.pageX);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null;
    };

    handle.ondragstart = function () {
      return false;
    };
  } 
}
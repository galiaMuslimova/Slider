export default class Handle {
  constructor(trackPosition){
    this.className = "slider__handle_left";
    this.trackPosition = trackPosition;
    this.element;
  }

  addElement() {
    let newDiv = document.createElement("div");
    if (this.className) {
      $(newDiv).addClass(this.className);
    }
    this.element = newDiv;
  }

  moveElement() {
    let startPositionX = this.trackPosition.left;
    let startPositionY = this.trackPosition.top;
    let trackWidth = this.trackPosition.width;
    this.element.style.position = 'absolute';
    this.element.style.zIndex = 10;
    let handle = this.element;
    
    this.element.onmousedown = function (event) { 
      document.body.append(handle);
      function moveAt(pageX) {
        if ((pageX - startPositionX < trackWidth) && (pageX > startPositionX)) {
          handle.style.left = pageX + 'px';
          handle.style.top = startPositionY + 'px';
        }
      }
      function onMouseMove(event) {
        moveAt(event.pageX);
      }
      document.addEventListener('mousemove', onMouseMove);
      document.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        handle.onmouseup = null;
      };
    };
    this.element.ondragstart = function () {
      return false;
    };
  } 
  
  createElement() {
    this.addElement();
    this.moveElement();
    return this.element;
  }
}
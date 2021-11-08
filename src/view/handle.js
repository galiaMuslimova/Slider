export default class Handle {
  constructor(){
    this.className = "slider__handle_left";
    this.trackPosition;
    this.element;
  }

  addElement() {
    let newDiv = document.createElement("div");
    if (this.className) {
      $(newDiv).addClass(this.className);
    }
    this.element = newDiv;
    return this.element;
  }

  onMouseMove(event) {
    let startPositionX = this.trackPosition.left;
    let startPositionY = this.trackPosition.top;
    let trackWidth = this.trackPosition.width;

    if ((event.pageX - startPositionX < trackWidth) && (event.pageX > startPositionX)) {
      this.element.style.left = event.pageX + 'px';
      this.element.style.top = startPositionY + 'px';
    }
  }

  moveHandle(track, handle) {
    document.body.append(handle);
    this.trackPosition = track.getBoundingClientRect();
  } 
  
  createElement() {
    this.addElement();
    return this.element;
  }
}
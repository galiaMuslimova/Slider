export default class Handle {
  constructor(){
    this.width = 200;
    this.className = "slider__handle";
    this.element;
  }

  /*get width () {
    return this.width;
  }

  set width(value) {
    this.width = value;
  }*/
  
  addNode() {
    let newDiv = document.createElement("div");
    if (this.className) {
      $(newDiv).addClass(this.className);
    }
    this.element = newDiv;
  }
}
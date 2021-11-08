export default class Track {
  constructor() {
    this.className = "slider__track";
    this.element;
    this.trackPosition;
  }

  addElement() {
    let newDiv = document.createElement("div");
    if (this.className) {
      $(newDiv).addClass(this.className);
    }
    this.element = newDiv;
    return this.element;
  }

  getPosition() {
    this.trackPosition = this.element.getBoundingClientRect();
    return this.trackPosition;
  }

  createElement() {
    this.addElement();
    return this.element;
  }
}
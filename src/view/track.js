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
  }

  setPosition() {
    this.trackPosition = this.element.getBoundingClientRect();
  }

  getPosition() {
    return this.trackPosition;
  }

  createElement() {
    this.addElement();
    this.setPosition();
    return this.element;
  }
}
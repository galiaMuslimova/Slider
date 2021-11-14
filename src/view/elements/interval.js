export default class Interval {
  constructor(slider, config) {
    this.slider = slider;
    this.config = config;
    this.init()
  }

  init() {
    let interval = `<div class="slider__interval"></div>`;
    let track = $(this.slider).find('.slider__track')[0];
    track.insertAdjacentHTML("afterBegin", interval);
  }

  moveByX(left, right){
    let domElement = $(this.interval)[0]
    let width = right - left;
    domElement.style.width = width + 'px';
    domElement.style.left = left + 'px';
  }
}
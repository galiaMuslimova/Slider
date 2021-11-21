export default class Interval {
  constructor(slider, config) {
    this.slider = slider;
    this.config = config;
    this.interval;
    this.init()
  }

  init() {
    let interval = `<div class="slider__interval"></div>`;
    let track = $(this.slider).find('.slider__track')[0];
    track.insertAdjacentHTML("afterBegin", interval);
    this.interval = $(this.slider).find('.slider__interval')[0];
  }

  moveInterval(handleX){
    let left;
    let right;
    switch (handleX.length) {
      case 1:
        left = this.config.min;
        right = handleX[0];
        break;
      case 2:
        left = handleX[0];
        right = handleX[1];
        break;
    }
    let width = right - left;
    this.interval.style.width = width + 'px';
    this.interval.style.left = left + 'px';
  }
}
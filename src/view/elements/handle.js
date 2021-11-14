export default class Handle {
  constructor(slider, config) {
    this.slider = slider;
    this.config = config;
    this.handles = [];
    this.init();
  }

  init() {
    let track = $(this.slider).find('.slider__track')[0];
    switch (this.config.handleCount) {
      case 1:
        let handle = `<div class="slider__handle"></div>`;
        track.insertAdjacentHTML("afterBegin", handle);
        this.handles.push(handle);
        break;
      case 2:
        let handleLeft = `<div class="slider__handle slider__handle_left"></div>`;
        track.insertAdjacentHTML("afterBegin", handleLeft);
        let handleRight = `<div class="slider__handle slider__handle_right"></div>`;
        track.insertAdjacentHTML("afterBegin", handleRight);
        this.handles.push(handleLeft, handleRight);
        break;
    }
  }

  moveByX(x) {
    this.handle.style.left = x + 'px';
    return x;
  }
}
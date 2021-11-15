import Observer from "@/observer.js";

export default class Handle {
  constructor(slider, config) {
    this.slider = slider;
    this.config = config;
    this.observer = new Observer();
    this.handles = [];
    this.handleX = [];
    this.init();
  }

  init() {
    let track = $(this.slider).find('.slider__track')[0];
    switch (this.config.handleCount) {
      case 1:
        let handle = `<div class="slider__handle"></div>`;
        track.insertAdjacentHTML("afterBegin", handle);
        this.handles.push($(this.slider).find('.slider__handle')[0]);
        break;
      case 2:
        let handleLeft = `<div class="slider__handle slider__handle_left"></div>`;
        track.insertAdjacentHTML("afterBegin", handleLeft);
        let handleRight = `<div class="slider__handle slider__handle_right"></div>`;
        track.insertAdjacentHTML("afterBegin", handleRight);
        this.handles.push($(this.slider).find('.slider__handle_left')[0], $(this.slider).find('.slider__handle_right')[0]);
        break;
    }
  }

  initHandles(handleX) {
    switch (this.handles.length) {
      case 1:
        this.handles[0].style.left = handleX[0] + 'px';
        break;
      case 2:
        this.handles[0].style.left = handleX[0] + 'px';
        this.handles[1].style.left = handleX[1] + 'px';
        break;
    }
    this.handleX = handleX;
  }

  moveByHandle(x, handle) {
    for (let i in this.handles) {
      if (this.handles[i] == handle) {
        this.handles[i].style.left = x + 'px';
        this.handleX[i] = x;
        if (this.handleX[0] > this.handleX[1]) {
          this.handleX = this.handleX.reverse();
          this.handles = this.handles.reverse()
        }
        return this.handleX;
      }
    }
  }

  moveByX(x) {
    if (this.handles.length == 1) {
      this.handles[0].style.left = x + 'px';
      this.handleX[0] = x;
    } else {
      let index = this.handleX.reduce(function (prev, curr) {
        return (Math.abs(curr - x) < Math.abs(prev - x) ? 1 : 0);
      });
      this.handles[index].style.left = x + 'px';
      this.handleX[index] = x;
    }
    return this.handleX;
  }
}
export default class Handle {
  constructor(handle, config) {
    this.handle = handle;
    this.config = config;
  }

  moveByX(x) {
    this.handle.style.left = x + 'px';
    return x;
  }
}
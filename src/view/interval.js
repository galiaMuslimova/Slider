export default class Interval {
  constructor(interval) {
    this.interval = interval;
  }

  moveByX(left, right){
    let width = right - left;
    this.interval.style.width = width + 'px';
    this.interval.style.left = left + 'px';
  }
}
export default class Interval {
  constructor(interval) {
    this.interval = interval;
  }

  moveByX(left, right){
    let domElement = $(this.interval)[0]
    let width = right - left;
    domElement.style.width = width + 'px';
    domElement.style.left = left + 'px';
  }
}
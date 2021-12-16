export default class Interval {
  slider: JQuery<HTMLElement>;

  interval: JQuery<HTMLElement>;

  track: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    this.slider = slider;
    this.track = $(this.slider).find('.meta-slider__track');
    jQuery('<div>', {
      class: 'meta-slider__interval',
    }).appendTo(this.track);
    this.interval = this.slider.find('.meta-slider__interval');
  }

  moveInterval(handleX: number[], vertical: boolean) {
    let min: number;
    let width: number;
    const handleWidth = 20;
    const gap = 2; // to make a gap between interval and handle
    if (handleX.length === 1) {
      min = 0;
      width = handleX[0] - handleWidth / 2 - gap;
    } else if (handleX.length === 2) {
      const minHandle = Math.min(handleX[0], handleX[1]);
      const maxHandle = Math.max(handleX[0], handleX[1]);
      min = minHandle + handleWidth / 2;
      width = maxHandle - minHandle - handleWidth - gap;
    } else {
      throw new Error('wrong number of handles');
    }
    width = (width > 0) ? width : 0;
    this.interval.css(vertical ? 'height' : 'width', `${width}px`);
    this.interval.css(vertical ? 'top' : 'left', `${min}px`);
  }
}

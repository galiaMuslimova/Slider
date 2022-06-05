import { IParameters } from '../../../interfaces/interfaces';
import IInterval from './interface';

class Interval implements IInterval {
  private $interval: JQuery<HTMLElement>;

  private vertical: boolean;

  private range: boolean;

  constructor() {
    this.$interval = jQuery('<div>');
    this.vertical = false;
    this.range = true;
  }

  public init($slider: JQuery<HTMLElement>): void {
    const $track = $slider.find('.js-meta-slider__track');
    this.$interval.addClass('meta-slider__interval js-meta-slider__interval');
    this.$interval.appendTo($track);
  }

  public setVertical(vertical: boolean): void {
    this.vertical = vertical;
  }

  public setRange(range: boolean): void {
    this.range = range;
  }

  public moveInterval(parameters: IParameters[]): void {
    let min: number;
    let width: number;
    const handleWidth = 20;
    const gap = 2; // to make a gap between interval and handle
    if (this.range) {
      min = Math.min(parameters[0].position, parameters[1].position) + handleWidth / 2;
      width = Math.abs(parameters[1].position - parameters[0].position) - handleWidth - gap;
    } else {
      min = 0;
      width = parameters[0].position - handleWidth / 2 - gap;
    }
    width = width > 0 ? width : 0;
    this.$interval.css(this.vertical ? 'height' : 'width', `${width}px`);
    this.$interval.css(this.vertical ? 'width' : 'height', '10px');
    this.$interval.css(this.vertical ? 'top' : 'left', `${min}px`);
    this.$interval.css(this.vertical ? 'left' : 'top', '0px');
  }
}

export default Interval;

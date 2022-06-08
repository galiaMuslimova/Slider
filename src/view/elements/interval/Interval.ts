import { IParameters } from '../../../interfaces/interfaces';
import IInterval from './interface';

class Interval implements IInterval {
  private $slider: JQuery<HTMLElement>;

  private $interval: JQuery<HTMLElement>;

  private vertical: boolean;

  private range: boolean;

  constructor($slider: JQuery<HTMLElement>) {
    this.$slider = $slider;
    this.$interval = jQuery('<div>');
    this.vertical = false;
    this.range = true;
    this.init();
  }

  public setVertical(vertical: boolean): void {
    this.vertical = vertical;
  }

  public setRange(range: boolean): void {
    this.range = range;
  }

  public moveInterval(parameters: IParameters): void {
    let min: number;
    let width: number;
    const handleWidth = 20;
    const gap = 2; // to make a gap between interval and handle
    if (parameters.to && this.range) {
      min = Math.min(parameters.from.position, parameters.to.position) + handleWidth / 2;
      width = Math.abs(parameters.to.position - parameters.from.position) - handleWidth - gap;
    } else {
      min = 0;
      width = parameters.from.position - handleWidth / 2 - gap;
    }
    width = width > 0 ? width : 0;
    this.$interval.css(this.vertical ? 'height' : 'width', `${width}px`);
    this.$interval.css(this.vertical ? 'width' : 'height', '10px');
    this.$interval.css(this.vertical ? 'top' : 'left', `${min}px`);
    this.$interval.css(this.vertical ? 'left' : 'top', '0px');
  }

  private init(): void {
    const $track = this.$slider.find('.js-meta-slider__track');
    this.$interval.addClass('meta-slider__interval js-meta-slider__interval');
    this.$interval.appendTo($track);
  }
}

export default Interval;

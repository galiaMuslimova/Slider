import { IParameters } from '../../../interfaces/interfaces';
import IInterval from './interface';

class Interval implements IInterval {
  public $interval: JQuery<HTMLElement>;

  readonly $slider: JQuery<HTMLElement>;

  private vertical: boolean;

  constructor(slider: JQuery<HTMLElement>) {
    this.$slider = slider;
    this.$interval = jQuery('<div>');
    this.vertical = false;
    this.init();
  }

  public correctInterval(): void {
    const $track = this.$slider.find('.js-meta-slider__track');
    this.$interval.appendTo($track);
  }

  public changeVertical(vertical: boolean): void {
    this.vertical = vertical;
  }

  public moveInterval(parameters: IParameters[]): void {
    let min: number;
    let width: number;
    const handleWidth = 20;
    const gap = 2; // to make a gap between interval and handle
    switch (parameters.length) {
      case 1:
        min = 0;
        width = parameters[0].position - handleWidth / 2 - gap;
        break;
      case 2:
        min = Math.min(parameters[0].position, parameters[1].position) + handleWidth / 2;
        width = Math.abs(parameters[1].position - parameters[0].position) - handleWidth - gap;
        break;
      default:
        throw new Error('wrong number of handles');
    }
    width = (width > 0) ? width : 0;
    this.$interval.css(this.vertical ? 'height' : 'width', `${width}px`);
    this.$interval.css(this.vertical ? 'width' : 'height', '10px');
    this.$interval.css(this.vertical ? 'top' : 'left', `${min}px`);
    this.$interval.css(this.vertical ? 'left' : 'top', '0px');
  }

  private init(): void {
    this.$interval.addClass('meta-slider__interval');
  }
}

export default Interval;

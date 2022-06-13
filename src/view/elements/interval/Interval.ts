import IInterval from './interface';

class Interval implements IInterval {
  private $track: JQuery<HTMLElement>;

  private $interval: JQuery<HTMLElement>;

  private isVertical: boolean;

  private withRange: boolean;

  constructor($track: JQuery<HTMLElement>) {
    this.$track = $track;
    this.$interval = jQuery('<div>');
    this.isVertical = false;
    this.withRange = true;
    this.init();
  }

  public setVertical(isVertical: boolean): void {
    this.isVertical = isVertical;
  }

  public setRange(withRange: boolean): void {
    this.withRange = withRange;
  }

  public moveInterval(fromPosition: number, toPosition: number): void {
    let min: number;
    let width: number;
    const handleWidth = 20;
    const gap = 2; // to make a gap between interval and handle
    if (this.withRange) {
      min = Math.min(fromPosition, toPosition) + handleWidth / 2;
      width = Math.abs(toPosition - fromPosition) - handleWidth - gap;
    } else {
      min = 0;
      width = fromPosition - handleWidth / 2 - gap;
    }
    width = width > 0 ? width : 0;
    this.$interval.css(this.isVertical ? 'height' : 'width', `${width}px`);
    this.$interval.css(this.isVertical ? 'width' : 'height', '10px');
    this.$interval.css(this.isVertical ? 'top' : 'left', `${min}px`);
    this.$interval.css(this.isVertical ? 'left' : 'top', '0px');
  }

  private init(): void {
    this.$interval.addClass('meta-slider__interval js-meta-slider__interval');
    this.$interval.appendTo(this.$track);
  }
}

export default Interval;

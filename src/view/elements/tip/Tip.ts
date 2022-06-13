import { IPositions } from '../../../interfaces/interfaces';
import ITip from './interface';

class Tip implements ITip {
  private $handle: JQuery<HTMLElement>;

  private $tip: JQuery<HTMLElement>;

  constructor($handle: JQuery<HTMLElement>) {
    this.$handle = $handle;
    this.$tip = jQuery('<div>');
    this.init();
  }

  public init() {
    this.$tip.addClass('meta-slider__tip js-meta-slider__tip');
    this.$tip.appendTo(this.$handle);
  }

  public changeTip(item: number): void {
    this.$tip.html(`${item}`);
  }

  public getElement(): JQuery<HTMLElement> {
    return this.$tip;
  }
}

export default Tip;

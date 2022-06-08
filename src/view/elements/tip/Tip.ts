import { IPositions } from '../../../interfaces/interfaces';
import ITip from './interface';

class Tip implements ITip {
  private $tip: JQuery<HTMLElement>;

  constructor() {
    this.$tip = jQuery('<div>');
  }

  public init($handle: JQuery<HTMLElement>) {
    this.$tip.addClass('meta-slider__tip js-meta-slider__tip');
    this.$tip.appendTo($handle);
  }

  public changeTip(parameter: IPositions): void {
    this.$tip.html(`${parameter.value}`);
  }

  public getElement(): JQuery<HTMLElement> {
    return this.$tip;
  }
}

export default Tip;

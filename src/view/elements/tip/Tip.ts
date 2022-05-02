import { IParameters } from '../../../interfaces/interfaces';
import ITip from './interface';

class Tip implements ITip {
  readonly $slider: JQuery<HTMLElement>;

  readonly $tip: JQuery<HTMLElement>;

  private $tips: JQuery<HTMLElement>[];

  constructor(slider: JQuery<HTMLElement>) {
    this.$slider = slider;
    this.$tips = [];
    this.$tip = jQuery('<div>');
  }

  public init(tip: boolean = true): void {
    this.$tip.addClass('meta-slider__tip');
    const element = this;
    this.$slider.find('.meta-slider__tip').remove();
    this.$tips = [];
    if (tip) {
      const $handles = this.$slider.find('.meta-slider__handle');
      $handles.each(function () {
        const $tipClone = element.$tip.clone();
        $tipClone.appendTo($(this));
        element.$tips.push($tipClone);
      });
    }
  }

  public changeTips(parameters: IParameters[]): void {
    this.$tips.forEach((item, index) => {
      item.html(`${parameters[index].value}`);
    });
  }
}

export default Tip;

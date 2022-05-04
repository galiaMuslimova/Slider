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
    this.init();
  }

  public correctTips(tip: boolean = true): void {
    const element = this;
    this.$slider.find('.js-meta-slider__tip').remove();
    this.$tips = [];
    if (tip) {
      const $handles = this.$slider.find('.js-meta-slider__handle');
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

  private init() {
    this.$tip.addClass('meta-slider__tip js-meta-slider__tip');
  }
}

export default Tip;

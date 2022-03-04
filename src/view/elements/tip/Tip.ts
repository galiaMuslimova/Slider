class Tip {
  $slider: JQuery<HTMLElement>;

  $handles: JQuery<HTMLElement>[];

  $tips: JQuery<HTMLElement>[];

  $tip: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    this.$slider = slider;
    this.$handles = [];
    this.$tips = [];
    this.$tip = jQuery('<div>', {
      class: 'meta-slider__tip',
    });
  }

  initTips(tip = true) {
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

  changeTips(values: number[]) {
    this.$tips.forEach((item, index) => {
      item.html(`${values[index]}`);
    });
  }
}

export default Tip;

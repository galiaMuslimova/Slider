export default class Handle {
  slider: JQuery<HTMLElement>;

  handles: JQuery<HTMLElement>[];

  tips: JQuery<HTMLElement>[];

  tip: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    this.slider = slider;
    this.handles = [];
    this.tips = [];
    this.tip = jQuery('<div>', {
      class: 'meta-slider__tip',
    });
  }

  initTips(tip = true) {
    this.slider.find('.meta-slider__tip').remove();
    this.tips = [];
    const handles = this.slider.find('.meta-slider__handle');
    if (tip) {
      for (let i = 0; i < handles.length; i += 1) {
        const tipClone = this.tip.clone();
        tipClone.appendTo($(handles[i]));
        this.tips.push(tipClone);
      }
    }
  }

  changeTips(values: number[]) {
    this.tips.forEach((item, index) => {
      item.html(`${values[index]}`);
    });
  }
}

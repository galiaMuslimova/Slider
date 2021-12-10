export default class Handle {
  slider: JQuery<HTMLElement>;
  handles: JQuery<HTMLElement>[];
  tips: JQuery<HTMLElement>[];
  tip: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    this.slider = slider;
    this.handles = [];
    this.tips = []
    this.tip = jQuery('<div>', {
      class: 'meta-slider__tip',
    })
  }

  initTips(tip = true) {
    this.slider.find('.meta-slider__tip').remove();
    this.tips = [];
    let handles = this.slider.find('.meta-slider__handle');
    if (tip) {
      for (let i = 0; i < handles.length; i++) {
        let tip = this.tip.clone();
        tip.appendTo($(handles[i]));
        this.tips.push(tip)
      }
    }
  }

  changeTips(values: number[]) {
    for (let i in this.tips) {
      this.tips[i].html(`${values[i]}`)
    }
  }
}
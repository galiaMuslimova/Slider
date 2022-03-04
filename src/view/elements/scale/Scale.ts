class Scale {
  readonly $slider: JQuery<HTMLElement>;

  readonly $scale: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    this.$slider = slider;
    this.$scale = jQuery('<div>', {
      class: 'meta-slider__scale',
    }).appendTo(this.$slider);
  }

  public initScale(stepsArr: { value: number, x: number }[], vertical:boolean = false) {
    this.$scale.empty();
    const handleWidth = 20;
    stepsArr.forEach((item) => {
      jQuery('<div>', {
        class: 'meta-slider__value',
        data_value: item.value,
        text: item.value,
        style: vertical ? `top: ${item.x - handleWidth / 2}px` : `left: ${item.x - handleWidth / 2}px`,
      }).appendTo(this.$scale);
    });
  }
}

export default Scale;

export default class Handle {
  $slider: JQuery<HTMLElement>;

  handles: JQuery<HTMLElement>[];

  constructor(slider: JQuery<HTMLElement>) {
    this.$slider = slider;
    this.handles = [];
  }

  initHandles(range:boolean = true) {
    this.handles = [];
    const $handles = this.$slider.find('.meta-slider__handle');
    $handles.remove();

    const $track = $(this.$slider).find('.meta-slider__track');
    const $handle = jQuery('<div>', {
      class: 'meta-slider__handle meta-slider__handle_left',
    }).appendTo($track);

    this.handles.push($handle);
    if (range) {
      const $handle2 = jQuery('<div>', {
        class: 'meta-slider__handle meta-slider__handle_right',
      }).appendTo($track);

      this.handles.push($handle2);
    }
  }

  moveHandles(handleX: number[], vertical:boolean) {
    const handleWidth = 20;
    this.handles.forEach((item, index) => {
      item.css(vertical ? 'top' : 'left', `${handleX[index] - handleWidth / 2}px`);
    });
  }
}

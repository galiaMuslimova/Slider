export default class Handle {
  slider: JQuery<HTMLElement>;
  handles: JQuery<HTMLElement>[];

  constructor(slider: JQuery<HTMLElement>) {
    this.slider = slider;
    this.handles = [];
  }

  initHandles(range:boolean = true) {
    this.handles = []
    this.slider.find('.meta-slider__handle').remove();

    let track = $(this.slider).find('.meta-slider__track');
    let handle = jQuery('<div>', {
      class: 'meta-slider__handle meta-slider__handle_left',
    }).appendTo(track);
    this.handles.push(handle);
    if (range) {
      let handle2 = jQuery('<div>', {
        class: 'meta-slider__handle meta-slider__handle_right',
      }).appendTo(track);
      this.handles.push(handle2);
    } 
  }

  moveHandles(handleX: number[], vertical:boolean) {
    let handleWidth = 20;
    for (let i in this.handles) {
      this.handles[i].css(vertical ? "top" : "left", `${handleX[i] - handleWidth / 2}px`);
    }
  }
}
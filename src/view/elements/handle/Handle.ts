import Observer from '../../../observer/Observer';

class Handle {
  readonly $slider: JQuery<HTMLElement>;

  readonly $track: JQuery<HTMLElement>;

  private vertical: boolean;

  public observer: Observer;

  private handles: JQuery<HTMLElement>[];

  constructor(slider: JQuery<HTMLElement>, vertical: boolean) {
    this.$slider = slider;
    this.$track = this.$slider.find('.meta-slider__track');
    this.vertical = vertical;
    this.observer = new Observer();
    this.handles = this.initHandles();
    this.bindEventListeners();
  }

  private bindEventListeners() {
    this.handles.forEach((item) => {
      item.on('mousedown touchstart', this.handleHandleMouseDown.bind(this));
    });
  }

  private handleHandleMouseDown(event: Event) {
    event.preventDefault();
    const eventTarget = <Element>event.target;
    $(document).on('mousemove', this.handleMouseMove.bind(this, eventTarget));
    $(document).on('touchmove', this.handleTouchMove.bind(this, eventTarget));
    $(document).on('mouseup touchend', this.handleMoveEnd.bind(this));
    $(document).on('dragstart', Handle.handleDragStart);
  }

  private handleMouseMove(eventTarget: EventTarget, event: Event) {
    const index = $(eventTarget).hasClass('meta-slider__handle_right') ? 1 : 0;
    const eventPosition = this.vertical ? (<MouseEvent>event).pageY : (<MouseEvent>event).pageX;
    const options = { eventPosition, index };
    this.observer.notify('mousemove', options);
  }

  private handleTouchMove(eventTarget: EventTarget, event: Event) {
    const index = $(eventTarget).hasClass('meta-slider__handle_right') ? 1 : 0;
    const touches = (<TouchEvent>event)?.touches;
    if (touches !== undefined) {
      const touch = touches[0];
      const eventPosition = this.vertical ? touch.pageY : touch.pageX;
      const options = { eventPosition, index };
      this.observer.notify('mousemove', options);
    }
  }

  private handleMoveEnd(event: Event) {
    this.observer.notify('moveend', event);
    $(document).off('mousemove mouseup touchmove touchend');
  }

  static handleDragStart() {
    return false;
  }

  private initHandles() {
    const handles: JQuery<HTMLElement>[] = [];
    const $handle1 = jQuery('<div>', {
      class: 'meta-slider__handle meta-slider__handle_left',
    }).appendTo(this.$track);
    handles.push($handle1);
    const $handle2 = jQuery('<div>', {
      class: 'meta-slider__handle meta-slider__handle_right',
    }).appendTo(this.$track);
    handles.push($handle2);
    return handles;
  }

  public correctHandlesByRange(range: boolean) {
    if (range && this.handles.length === 1) {
      const $handle2 = jQuery('<div>', {
        class: 'meta-slider__handle meta-slider__handle_right',
      }).appendTo(this.$track);
      this.handles.push($handle2);
    } else if (!range && this.handles.length === 2) {
      const $handle2 = this.handles[1];
      $handle2.remove();
      this.handles.pop();
    }
    this.bindEventListeners();
  }

  public moveHandles(positions: number[]) {
    this.handles.forEach((item, index) => {
      item.css(this.vertical ? 'top' : 'left', `${positions[index] - 20 / 2}px`);
    });
  }

  public setVertical(vertical: boolean) {
    this.vertical = vertical;
  }
}

export default Handle;


import Observer from '../../../observer/Observer';
import IObserver from '../../../observer/interface';
import IHandle from './interface';
import { IParameters } from '../../../interfaces/interfaces';

class Handle implements IHandle {
  public observer: IObserver;

  readonly $slider: JQuery<HTMLElement>;

  private $track: JQuery<HTMLElement>;

  private vertical: boolean;

  private $leftHandle: JQuery<HTMLElement>;

  private $rightHandle: JQuery<HTMLElement>;

  private handles: JQuery<HTMLElement>[];

  constructor(slider: JQuery<HTMLElement>) {
    this.$slider = slider;
    this.$track = jQuery('<div>');
    this.vertical = false;
    this.observer = new Observer();
    this.$leftHandle = jQuery('<div>');
    this.$rightHandle = jQuery('<div>');
    this.handles = [];
    this.init();
  }

  public correctHandles(vertical: boolean): void {
    this.handles = [];
    this.$track = this.$slider.find('.js-meta-slider__track');
    this.$leftHandle.appendTo(this.$track);
    this.handles.push(this.$leftHandle);
    this.$rightHandle.appendTo(this.$track);
    this.handles.push(this.$rightHandle);
    this.vertical = vertical;
  }

  public correctHandlesByRange(range: boolean): void {
    if (range && this.handles.length === 1) {
      this.$rightHandle.appendTo(this.$track);
      this.handles.push(this.$rightHandle);
    } else if (!range && this.handles.length === 2) {
      const $handle2 = this.$track.find('.js-meta-slider__handle_right');
      $handle2.remove();
      this.handles.pop();
    }
    this.bindEventListeners();
  }

  public moveHandles(parameters: IParameters[]): void {
    this.handles.forEach((item, index) => {
      item.css(this.vertical ? 'top' : 'left', `${parameters[index].position - 20 / 2}px`);
      item.css(this.vertical ? 'left' : 'top', '-5px');
    });
  }

  public setVertical(vertical: boolean): void {
    this.vertical = vertical;
  }

  public getVertical(): boolean {
    return this.vertical;
  }

  public getHandles(): JQuery<HTMLElement>[] {
    return this.handles;
  }

  static handleDragStart(): boolean {
    return false;
  }

  private init(): void {
    this.$leftHandle = jQuery('<div>', { class: 'meta-slider__handle js-meta-slider__handle meta-slider__handle_left' });
    this.$rightHandle = jQuery('<div>', { class: 'meta-slider__handle js-meta-slider__handle meta-slider__handle_right js-meta-slider__handle_right' });
  }

  private bindEventListeners(): void {
    this.handles.forEach((item) => {
      item.on('mousedown touchstart', this.handleHandleMouseDown.bind(this));
    });
  }

  private handleHandleMouseDown(event: Event): void {
    event.preventDefault();
    const eventTarget = <Element>event.target;
    const index = $(eventTarget).hasClass('meta-slider__handle_left') ? 0 : 1;
    $(document).on('mousemove', this.handleMouseMove.bind(this, index));
    $(document).on('touchmove', this.handleTouchMove.bind(this, index));
    $(document).on('mouseup touchend', this.handleMoveEnd.bind(this));
    $(document).on('dragstart', Handle.handleDragStart);
  }

  private handleMouseMove(index: number, event: Event): void {
    const eventPosition = this.vertical ? (<MouseEvent>event).pageY : (<MouseEvent>event).pageX;
    const options = { eventPosition, index };
    this.observer.notify('mouseMove', options);
  }

  private handleTouchMove(index: number, event: Event): void {
    const touches = (<TouchEvent>event)?.touches;
    if (touches !== undefined) {
      const touch = touches[0];
      const eventPosition = this.vertical ? touch.pageY : touch.pageX;
      const options = { eventPosition, index };
      this.observer.notify('mouseMove', options);
    }
  }

  private handleMoveEnd(event: Event): void {
    this.observer.notify('moveEnd', 0);
    $(document).off('mousemove mouseup touchmove touchend');
  }
}

export default Handle;

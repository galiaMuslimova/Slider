import Observer from '../../../observer/Observer';
import IObserver from '../../../observer/interface';
import { IParameters } from '../../../interfaces/interfaces';
import ITip from '../tip/interface';
import Tip from '../tip/tip';
import IHandle from './interface';

class Handle implements IHandle {
  public observer: IObserver;

  public isTip: boolean;

  private vertical: boolean;

  private $handle: JQuery<HTMLElement>;

  private tip: ITip | null;

  constructor() {
    this.observer = new Observer();
    this.isTip = true;
    this.vertical = false;
    this.$handle = jQuery('<div>');
    this.tip = new Tip();
    this.bindEventListeners();
  }

  public init($track: JQuery<HTMLElement>): void {
    this.$handle.addClass('meta-slider__handle js-meta-slider__handle');
    this.$handle.appendTo($track);
    this.tip?.init(this.$handle);
  }

  public setVertical(vertical: boolean): void {
    this.vertical = vertical;
  }

  public getVertical(): boolean {
    return this.vertical;
  }

  public getElement(): JQuery<HTMLElement> {
    return this.$handle;
  }

  public moveHandle(parameters: IParameters): void {
    this.$handle.css(this.vertical ? 'top' : 'left', `${parameters.position - 20 / 2}px`);
    this.$handle.css(this.vertical ? 'left' : 'top', '-5px');
    this.tip?.changeTip(parameters);
  }

  public toggleTip(tip: boolean): void {
    this.isTip = tip;
    if (tip && !this.tip) {
      this.tip = new Tip();
      this.tip.init(this.$handle);
    } else if (!tip && this.tip) {
      const tipElement = this.tip.getElement();
      tipElement.remove();
      this.tip = null;
    }
  }

  static handleDragStart(): boolean {
    return false;
  }

  private bindEventListeners(): void {
    this.$handle.on('mousedown touchstart', this.handleHandleMouseDown.bind(this));
  }

  private handleHandleMouseDown(event: Event): void {
    event.preventDefault();
    $(document).on('mousemove', this.handleMouseMove.bind(this));
    $(document).on('touchmove', this.handleTouchMove.bind(this));
    $(document).on('mouseup touchend', this.handleMoveEnd.bind(this));
    $(document).on('dragstart', Handle.handleDragStart);
  }

  private handleMouseMove(event: Event): void {
    const eventPosition = this.vertical ? (<MouseEvent>event).pageY : (<MouseEvent>event).pageX;
    this.observer.notify('mouseMove', eventPosition);
  }

  private handleTouchMove(event: Event): void {
    const touches = (<TouchEvent>event)?.touches;
    if (touches !== undefined) {
      const touch = touches[0];
      const eventPosition = this.vertical ? touch.pageY : touch.pageX;
      this.observer.notify('mouseMove', eventPosition);
    }
  }

  private handleMoveEnd(event: Event): void {
    $(document).off('mousemove mouseup touchmove touchend');
    this.observer.notify('moveEnd', 0);
  }
}

export default Handle;

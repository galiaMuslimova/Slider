import Observer from '../../../observer/Observer';
import IObserver from '../../../observer/interface';
import { IPositions, IParameters, ITrackPosition } from '../../../interfaces/interfaces';
import ITip from '../tip/interface';
import Tip from '../tip/tip';
import IHandle from './interface';

class Handle implements IHandle {
  public observer: IObserver;

  private $slider: JQuery<HTMLElement>;

  public isTip: boolean;

  private vertical: boolean;

  private $handle: JQuery<HTMLElement>;

  private tip: ITip | null;

  private trackStart: number;

  private trackWidth: number;

  constructor($slider: JQuery<HTMLElement>) {
    this.$slider = $slider;
    this.observer = new Observer();
    this.isTip = true;
    this.vertical = false;
    this.$handle = jQuery('<div>');
    this.tip = new Tip(this.$handle);
    this.trackStart = 0;
    this.trackWidth = 500;
    this.bindEventListeners();
    this.init();
  }

  public setVertical(vertical: boolean): void {
    this.vertical = vertical;
  }

  public getElement(): JQuery<HTMLElement> {
    return this.$handle;
  }

  public setTrackParameters(trackParameters: ITrackPosition): void {
    const { trackStart, trackWidth } = trackParameters;
    this.trackStart = trackStart;
    this.trackWidth = trackWidth;
  }

  public moveHandle(parameters: IPositions): void {
    this.$handle.css(
      this.vertical ? 'top' : 'left',
      `${parameters.position - 20 / 2}px`,
    );
    this.$handle.css(this.vertical ? 'left' : 'top', '-5px');
    this.tip?.changeTip(parameters);
  }

  public toggleTip(tip: boolean): void {
    this.isTip = tip;
    if (tip && !this.tip) {
      this.tip = new Tip(this.$handle);
    } else if (!tip && this.tip) {
      const tipElement = this.tip.getElement();
      tipElement.remove();
      this.tip = null;
    }
  }

  static handleDragStart(): boolean {
    return false;
  }

  private init(): void {
    const $track = this.$slider.find('.js-meta-slider__track');
    this.$handle.addClass('meta-slider__handle js-meta-slider__handle');
    this.$handle.appendTo($track);
  }

  private bindEventListeners(): void {
    this.$handle.on(
      'mousedown touchstart',
      this.handleHandleMouseDown.bind(this),
    );
  }

  private handleHandleMouseDown(event: Event): void {
    event.preventDefault();
    $(document).on('mousemove', this.handleMouseMove.bind(this));
    $(document).on('touchmove', this.handleTouchMove.bind(this));
    $(document).on('mouseup touchend', this.handleMoveEnd.bind(this));
    $(document).on('dragstart', Handle.handleDragStart);
  }

  private handleMouseMove(event: Event): void {
    const eventPosition = this.vertical
      ? (<MouseEvent>event).pageY
      : (<MouseEvent>event).pageX;
    const correctedPosition = Math.round(eventPosition - this.trackStart);
    const isInScale = correctedPosition >= 0 && correctedPosition <= this.trackWidth;
    if (isInScale) {
      this.observer.notify('mouseMove', correctedPosition);
    }
  }

  private handleTouchMove(event: Event): void {
    const touches = (<TouchEvent>event)?.touches;
    const touch = touches[0];
    const eventPosition = this.vertical ? touch.pageY : touch.pageX;
    const correctedPosition = Math.round(eventPosition - this.trackStart);
    const isInScale = correctedPosition >= 0 && correctedPosition <= this.trackWidth;
    if (touches !== undefined && isInScale) {
      this.observer.notify('mouseMove', correctedPosition);
    }
  }

  private handleMoveEnd(): void {
    $(document).off('mousemove mouseup touchmove touchend');
    this.observer.notify('moveEnd', 0);
  }
}

export default Handle;

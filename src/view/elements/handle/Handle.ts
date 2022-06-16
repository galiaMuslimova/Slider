import Observer from '../../../observer/Observer';
import IObserver from '../../../observer/interface';
import { IConfig, ITrackPosition } from '../../../interfaces/interfaces';
import ITip from '../tip/interface';
import Tip from '../tip/tip';
import IHandle from './interface';

class Handle implements IHandle {
  public observer: IObserver;

  private $track: JQuery<HTMLElement>;

  public hasTip: boolean;

  private isVertical: boolean;

  private $handle: JQuery<HTMLElement>;

  private tip: ITip | null;

  private trackStart: number;

  private trackWidth: number | null;

  constructor($track: JQuery<HTMLElement>, config: IConfig) {
    this.$track = $track;
    this.observer = new Observer();
    this.hasTip = config.hasTip;
    this.isVertical = config.isVertical;
    this.$handle = jQuery('<div>');
    this.tip = new Tip(this.$handle);
    this.trackStart = 0;
    this.trackWidth = null;
    this.bindEventListeners();
    this.init();
  }

  public setVertical(isVertical: boolean): void {
    this.isVertical = isVertical;
  }

  public getElement(): JQuery<HTMLElement> {
    return this.$handle;
  }

  public setTrackParameters(trackParameters: ITrackPosition): void {
    const { trackStart, trackWidth } = trackParameters;
    this.trackStart = trackStart;
    this.trackWidth = trackWidth;
  }

  public moveHandle(item: number, itemPosition: number): void {
    this.$handle.css(
      this.isVertical ? 'top' : 'left',
      `${itemPosition - 20 / 2}px`,
    );
    this.$handle.css(this.isVertical ? 'left' : 'top', '-5px');
    this.tip?.changeTip(item);
  }

  public toggleTip(hasTip: boolean): void {
    this.hasTip = hasTip;
    if (hasTip && !this.tip) {
      this.tip = new Tip(this.$handle);
    } else if (!hasTip && this.tip) {
      const tipElement = this.tip.getElement();
      tipElement.remove();
      this.tip = null;
    }
  }

  static handleDragStart(): boolean {
    return false;
  }

  private init(): void {
    this.$handle.addClass('meta-slider__handle js-meta-slider__handle');
    this.$handle.appendTo(this.$track);
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
    const eventPosition = this.isVertical
      ? (<MouseEvent>event).pageY
      : (<MouseEvent>event).pageX;
    const { correctedPosition, isInScale } = this.getCorrectPosition(eventPosition);
    if (isInScale) {
      this.observer.notify('mouseMove', correctedPosition);
    }
  }

  private getCorrectPosition(eventPosition: number): {
    correctedPosition: number;
    isInScale: boolean;
  } {
    if (this.trackWidth) {
      const correctedPosition = Math.round(eventPosition - this.trackStart);
      const isInScale = correctedPosition >= 0 && correctedPosition <= this.trackWidth;
      return { correctedPosition, isInScale };
    }
    throw new Error('wrong track positions');
  }

  private handleTouchMove(event: Event): void {
    const touches = (<TouchEvent>event)?.touches;
    const touch = touches[0];
    const eventPosition = this.isVertical ? touch.pageY : touch.pageX;
    const { correctedPosition, isInScale } = this.getCorrectPosition(eventPosition);
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

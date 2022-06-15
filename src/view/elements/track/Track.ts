import { IConfig, ITrackPosition } from '../../../interfaces/interfaces';
import Observer from '../../../observer/Observer';
import IObserver from '../../../observer/interface';
import ITrack from './interface';

class Track implements ITrack {
  public observer: IObserver;

  private $slider: JQuery<HTMLElement>;

  private $track: JQuery<HTMLElement>;

  private isVertical: boolean;

  private trackStart: number;

  private trackWidth: number | undefined;

  constructor($slider: JQuery<HTMLElement>, config: IConfig) {
    this.$slider = $slider;
    this.observer = new Observer();
    this.$track = jQuery('<div>');
    this.isVertical = config.isVertical;
    this.trackStart = 0;
    this.trackWidth = 500;
    this.init();
  }

  public setVertical(isVertical: boolean): void {
    this.isVertical = isVertical;
  }

  public getElement(): JQuery<HTMLElement> {
    return this.$track;
  }

  public getTrackParameters(): ITrackPosition {
    const position = this.$track.position();
    this.trackStart = this.isVertical
      ? Number(position.top)
      : Number(position.left);
    this.trackWidth = this.isVertical
      ? this.$track.height()
      : this.$track.width();
    if (this.trackWidth) {
      return { trackStart: this.trackStart, trackWidth: this.trackWidth };
    }
    throw new Error('wrong width of slider');
  }

  private init(): void {
    this.$track.addClass('meta-slider__track js-meta-slider__track');
    this.$track.appendTo(this.$slider);
    this.bindEventListeners();
  }

  private bindEventListeners(): void {
    this.$track.on('click', this.handleTrackClick.bind(this));
  }

  private handleTrackClick(event: Event): void {
    if (this.trackStart) {
      const eventPosition = this.isVertical
        ? (<MouseEvent>event).pageY
        : (<MouseEvent>event).pageX;
      const position = Math.round(eventPosition - this.trackStart);
      this.observer.notify('trackClick', position);
    }
    throw new Error('wrong start position of track');
  }
}

export default Track;

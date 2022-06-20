import { IConfig, ITrackPosition } from '../../../interfaces/interfaces';
import Observer from '../../../observer/Observer';
import IObserver from '../../../observer/interface';
import ITrack from './interface';

class Track implements ITrack {
  public observer: IObserver;

  private $slider: JQuery<HTMLElement>;

  private $track: JQuery<HTMLElement>;

  private isVertical: boolean;

  private trackStart: number | null;

  private trackWidth: number | null;

  constructor($slider: JQuery<HTMLElement>, config: IConfig) {
    this.$slider = $slider;
    this.observer = new Observer();
    this.$track = jQuery('<div>');
    this.isVertical = config.isVertical;
    this.trackStart = null;
    this.trackWidth = null;
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
    const trackWidth = this.isVertical
      ? this.$track.css('height')
      : this.$track.css('width');
    this.trackWidth = Number(trackWidth.split('px')[0]) || 500;
    return { trackStart: this.trackStart, trackWidth: this.trackWidth };
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
    const mousePosition = this.isVertical
      ? (<MouseEvent>event).pageY
      : (<MouseEvent>event).pageX;
    if (this.trackStart !== null) {
      const position = Math.round(mousePosition - this.trackStart);
      this.observer.notify('trackClick', position);
    } else { throw new Error('wrong track start'); }
  }
}

export default Track;

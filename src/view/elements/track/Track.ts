import { ITrackPosition } from '../../../interfaces/interfaces';
import Observer from '../../../observer/Observer';
import IObserver from '../../../observer/interface';
import ITrack from './interface';

class Track implements ITrack {
  public observer: IObserver;

  public $slider: JQuery<HTMLElement>;

  public $track: JQuery<HTMLElement>;

  private vertical: boolean;

  private trackStart: number;

  private trackWidth: number;

  constructor(slider: JQuery<HTMLElement>) {
    this.$slider = slider;
    this.vertical = false;
    this.$track = jQuery('<div>');
    this.observer = new Observer();
    this.trackStart = 0;
    this.trackWidth = 500;
    this.init();
  }

  public correctTrack(vertical: boolean): void {
    this.$track.empty();
    this.vertical = vertical;
    const position = this.$track.position();
    this.trackStart = this.vertical ? Number(position.top) : Number(position.left);
    this.trackWidth = this.vertical ? this.$track.height() || 500 : this.$track.width() || 500;
  }

  public getTrackParameters(): ITrackPosition {
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
    const eventPosition = this.vertical ? (<MouseEvent>event).pageY : (<MouseEvent>event).pageX;
    const position = Math.round(eventPosition - this.trackStart);
    this.observer.notify('trackClick', position);
  }
}

export default Track;

import { ITrackPosition } from '../../../interfaces/interfaces';
import Observer from '../../../observer/Observer';
import IObserver from '../../../observer/interface';
import ITrack from './interface';

class Track implements ITrack {
  public observer: IObserver;

  private $track: JQuery<HTMLElement>;

  private vertical: boolean;

  private trackStart: number;

  private trackWidth: number | undefined;

  constructor() {
    this.observer = new Observer();
    this.$track = jQuery('<div>');
    this.vertical = false;
    this.trackStart = 0;
    this.trackWidth = 0;
  }

  public init($slider: JQuery<HTMLElement>): void {
    this.$track.addClass('meta-slider__track js-meta-slider__track');
    this.$track.appendTo($slider);
    this.bindEventListeners();
  }

  public setVertical(vertical: boolean): void {
    this.vertical = vertical;
  }

  public getTrackParameters(): ITrackPosition {
    const position = this.$track.position();
    this.trackStart = this.vertical ? Number(position.top) : Number(position.left);
    this.trackWidth = this.vertical ? this.$track.height() : this.$track.width();
    if (this.trackStart && this.trackWidth) {
      return { trackStart: this.trackStart, trackWidth: this.trackWidth };
    }
    throw new Error('wrong width of slider');
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

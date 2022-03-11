import { ITrackPosition } from '../../../interfaces/interfaces';
import Observer from '../../../observer/Observer';
import IObserver from '../../../observer/interface';
import ITrack from './interface';

class Track implements ITrack {
  public observer: IObserver;

  readonly $slider: JQuery<HTMLElement>;

  readonly $track: JQuery<HTMLElement>;

  readonly position: { top: number, left: number };

  private vertical: boolean;

  private trackStart: number;

  constructor(slider: JQuery<HTMLElement>, vertical: boolean) {
    this.$slider = slider;
    this.vertical = vertical;
    this.$track = jQuery('<div>', {
      class: 'meta-slider__track',
    }).appendTo(this.$slider);
    this.observer = new Observer();
    this.position = this.$track.position();
    this.trackStart = this.vertical ? Number(this.position.top) : Number(this.position.left);
    this.bindEventListeners();
  }

  public getTrackParameters(): ITrackPosition {
    const trackStart = this.vertical ? Number(this.position.top) : Number(this.position.left);
    const trackWidth = this.vertical ? this.$track.height() : this.$track.width();
    this.trackStart = trackStart;
    return { trackStart, trackWidth };
  }

  public setVertical(vertical: boolean): void {
    this.vertical = vertical;
  }

  private bindEventListeners(): void {
    this.$track.on('click', this.handleTrackClick.bind(this));
  }

  private handleTrackClick(event: Event): void {
    const eventPosition = this.vertical ? (<MouseEvent>event).pageY : (<MouseEvent>event).pageX;
    const position = Math.round(eventPosition - this.trackStart);
    this.observer.notify('position', position);
  }
}

export default Track;

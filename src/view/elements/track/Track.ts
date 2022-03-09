import Observer from '../../../observer/Observer';

class Track {
  readonly $slider: JQuery<HTMLElement>;

  readonly $track: JQuery<HTMLElement>;

  public observer: Observer;

  private vertical: boolean;

  readonly position: { top: number, left: number };

  private trackStart: number;

  private trackWidth: number | undefined;

  constructor(slider: JQuery<HTMLElement>, vertical: boolean) {
    this.$slider = slider;
    this.vertical = vertical;
    this.$track = jQuery('<div>', {
      class: 'meta-slider__track',
    }).appendTo(this.$slider);
    this.observer = new Observer();
    this.position = this.$track.position();
    this.trackStart = this.vertical ? Number(this.position.top) : Number(this.position.left);
    this.trackWidth = this.vertical ? this.$track.height() : this.$track.width();
    this.bindEventListeners();
  }

  private bindEventListeners() {
    this.$track.on('click', this.handleTrackClick.bind(this));
  }

  private handleTrackClick(event: Event) {
    const eventPosition = this.vertical ? (<MouseEvent>event).pageY : (<MouseEvent>event).pageX;
    const position = Math.round(eventPosition - this.trackStart);
    this.observer.notify('position', position);
  }

  public getTrackParameters() {
    const trackStart = this.vertical ? Number(this.position.top) : Number(this.position.left);
    const trackWidth = this.vertical ? this.$track.height() : this.$track.width();
    this.trackStart = trackStart;
    this.trackWidth = trackWidth;
    return { trackStart, trackWidth };
  }

  public setVertical(vertical: boolean) {
    this.vertical = vertical;
  }
}

export default Track;

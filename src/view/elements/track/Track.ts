import Observer from '../../../observer/Observer';

class Track {
  $slider: JQuery<HTMLElement>;

  $track: JQuery<HTMLElement>;

  observer: Observer;

  vertical: boolean;

  position: { top: number, left: number };

  trackStart: number;

  trackWidth: number | undefined;

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

  bindEventListeners() {
    this.$track.on('click', this.handleTrackClick.bind(this));
  }

  handleTrackClick(event: any) {
    const eventPosition = this.vertical ? event.pageY : event.pageX;
    const position = Math.round(eventPosition - this.trackStart);
    this.observer.notify('position', position);
  }

  getTrackParameters(vertical: boolean) {
    this.vertical = vertical;
    const trackStart = vertical ? Number(this.position.top) : Number(this.position.left);
    const trackWidth = vertical ? this.$track.height() : this.$track.width();
    this.trackStart = trackStart;
    this.trackWidth = trackWidth;
    return { trackStart, trackWidth };
  }
}

export default Track;

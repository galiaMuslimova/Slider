import Observer from '../../../observer/Observer';

class Track {
  $slider: JQuery<HTMLElement>;

  $track: JQuery<HTMLElement>;

  observer: Observer;

  position: { top: number, left: number };

  constructor(slider: JQuery<HTMLElement>) {
    this.$slider = slider;
    this.$track = jQuery('<div>', {
      class: 'meta-slider__track',
    }).appendTo(this.$slider);
    this.observer = new Observer();
    this.position = this.$track.position();
    this.bindEventListeners();
  }

  bindEventListeners() {
    this.$track.on('click', this.handleTrackClick.bind(this));
  }

  handleTrackClick(event: any) {
    const position = event.pageX;
    this.observer.notify('position', position);
  }

  getTrackParameters(vertical: boolean) {
    const trackStart = vertical ? Number(this.position.top) : Number(this.position.left);
    const trackWidth = vertical ? this.$track.height() : this.$track.width();
    return { trackStart, trackWidth };
  }
}

export default Track;

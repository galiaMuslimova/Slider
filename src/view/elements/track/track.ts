export default class Track {
  slider: JQuery<HTMLElement>;

  track: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    this.slider = slider;
    this.track = jQuery('<div>', {
      class: 'meta-slider__track',
    }).appendTo(this.slider);
  }

  getTrackParameters(vertical: boolean) {
    const position = this.track.position();
    const trackStart = vertical ? Number(position.top) : Number(position.left);
    const trackWidth = vertical ? this.track.height() : this.track.width();
    if (trackStart && trackWidth) {
      return { trackStart, trackWidth };
    }
    throw new Error('wrong track parameters');
  }
}

class Track {
  $slider: JQuery<HTMLElement>;

  $track: JQuery<HTMLElement>;

  position: { top:number, left:number };

  constructor(slider: JQuery<HTMLElement>) {
    this.$slider = slider;
    this.$track = jQuery('<div>', {
      class: 'meta-slider__track',
    }).appendTo(this.$slider);
    this.position = this.$track.position();
  }

  getTrackParameters(vertical: boolean) {
    const trackStart = vertical ? Number(this.position.top) : Number(this.position.left);
    const trackWidth = vertical ? this.$track.height() : this.$track.width();
    const hasTrackParameters = trackStart && trackWidth;
    if (hasTrackParameters) {
      return { trackStart, trackWidth };
    }
    throw new Error('wrong track position');
  }
}

export default Track;

export default class Track {
  slider: JQuery<HTMLElement>;
  track: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    this.slider = slider; 
    this.track = jQuery('<div>', {
      class: 'meta-slider__track',
    }).appendTo(this.slider);
  }

  getTrackParameters(vertical: boolean){
    let trackStart = vertical ? Number(this.track.position().top) : Number(this.track.position().left);
    let trackWidth = vertical ? this.track.height() : this.track.width();
    if (trackStart && trackWidth) {
      return {trackStart, trackWidth}
    } else {
      throw new Error ('wrong track parameters')
    }
  }
}
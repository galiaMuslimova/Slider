export default class Track {
  constructor(slider, config) {
    this.slider = slider;
    this.config = config;   
    this.init()
  }

  init(){
    let track = `<div class="slider__track"></div>`;
    this.slider[0].insertAdjacentHTML("afterBegin", track);
  }
}
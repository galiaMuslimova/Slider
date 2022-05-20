import Slider from '../slider/Slider.js';

class Main {
  constructor($element) {
    this.$element = $element;
    this.init();
  }

  init() {
    const options = require('./main.json')[0];
    const $simpleSliderElement = this.$element.find('[data-type="simple"]');
    const simpleSlider = new Slider(options['simple'], $simpleSliderElement);
    simpleSlider.showValues();
    const $singleSliderElement = this.$element.find('[data-type="single"]');
    const singleSlider = new Slider(options['single'], $singleSliderElement);  
    const $verticalSliderElement = this.$element.find('[data-type="vertical"]');
    const verticalSlider = new Slider(options['vertical'], $verticalSliderElement);    
  }
}

export default Main;
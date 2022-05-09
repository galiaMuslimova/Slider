import Slider from '../slider/Slider.js';

class Main {
  constructor($element) {
    this.$element = $element;
    this.init();
  }

  init() {
    const options = require('./main.json');
    const $sliderElements = this.$element.find('.js-main__slider');
    $sliderElements.each(function (index) {
      new Slider(options[index], $(this))
    })
  }
}

export default Main;
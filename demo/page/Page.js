import Slider from '../slider/Slider.js';

class Page {
  constructor($element) {
    this.$element = $element;
    this.init();
  }

  init() {
    const options = require('./page.json');
    const $sliderElements = this.$element.find('.js-page__slider');
    $sliderElements.each(function (index) {
      new Slider(options[index], $(this))
    })
  }
}

export default Page;
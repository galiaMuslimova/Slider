import MetaSlider from '../../src/MetaSlider';
import '../../src/index';

class Slider{
  constructor(options, $root) {
    this.options = options;
    this.$root = $root;
    this.init();
  }

  init() {
    const $element = this.$root.find('.js-slider');
    const slider = $element.MetaSlider(this.options)
    slider.addPanel();
  }
}

export default Slider;
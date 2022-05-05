import MetaSlider from '../../src/MetaSlider';

class Slider{
  constructor(options, $root) {
    this.options = options;
    this.$root = $root;
    this.init();
  }

  init() {
    const $element = this.$root.find('.js-slider');
    const slider = new MetaSlider($element, this.options);
    slider.addPanel();
  }
}

export default Slider;
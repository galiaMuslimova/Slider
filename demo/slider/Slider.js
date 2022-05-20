import '../../src/index';

class Slider {
  constructor(options, $root) {
    this.options = options;
    this.$root = $root;
    this.slider = {};
    this.init();
  }

  init() {
    const $sliderRoot = this.$root.find('.js-slider__root')
    const $sliderOptions = this.$root.find('.js-slider__options')
    this.$sliderValues = this.$root.find('.js-slider__values')
    this.slider = $sliderRoot.MetaSlider(this.options);
    this.slider.addPanel();
    const options = this.slider.getOptions();
    this.showItems(options, $sliderOptions);
  }

  showItems(items, place) {
    let text = '';
    Object.entries(items).forEach(([key, value]) => {
      text += `${key}: ${value}; \n`
    })
    place.text(text);
  }

  showValues() {
    const el = this;
    this.slider.setOptions($.extend(this.options, {
      onChange: function (values) {
        el.$sliderValues.text(`from: ${values[0]}; to: ${values[1]}`);
      }
    }))
  }
}

export default Slider;
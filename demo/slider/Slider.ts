import '../../src/index';
import { IOptions, ISettings } from '../interfaces/interfaces';
import Panel from '../panel/Panel';
import ISlider from './interface';

class Slider implements ISlider {
  private options: IOptions;
  private $root: JQuery<HTMLElement>;
  private slider: JQuery<HTMLElement>;
  private $sliderValues: JQuery<HTMLElement>;

  constructor($root: JQuery<HTMLElement>, options: IOptions) {
    this.$root = $root;
    this.options = options;
    this.slider = null;
    this.$sliderValues;
    this.init();
  }

  public showValues(): void {
    const el = this;
    this.slider.setOptions($.extend(this.options, {
      onChange: function (values) {
        el.$sliderValues.text(`from: ${values[0]}; to: ${values[1]}`);
      }
    }))
  }

  private init(): void {
    const $sliderRootElement = this.$root.find('.js-slider__root');
    const $sliderPanelElement = this.$root.find('.js-slider__panel');
    const $sliderOptions = this.$root.find('.js-slider__options');
    this.$sliderValues = this.$root.find('.js-slider__values');
    this.slider = $sliderRootElement.MetaSlider(this.options);
    this.options = this.slider.getOptions();
    const panel = new Panel($sliderPanelElement, this.options);
    panel.observer.subscribe({ key: 'setting', observer: this.changeSettings.bind(this) })
    this.showItems(this.options, $sliderOptions);
  }

  private showItems(items: IOptions, place: JQuery<HTMLElement>): void {
    let text = '';
    Object.entries(items).forEach(([key, value]) => {
      text += `${key}: ${value}; \n`
    })
    place.text(text);
  }

  private changeSettings(setting: ISettings) {
    this.options = $.extend(this.options, setting);
    this.slider.setOptions(this.options);
  }
}

export default Slider;
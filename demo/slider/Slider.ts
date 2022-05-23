import '../../src/index';
import IMetaSlider from '../../src/interface';
import { IOptions, ISettings } from '../interfaces/interfaces';
import IPanel from '../panel/interface';
import Panel from '../panel/Panel';
import ISlider from './interface';

class Slider implements ISlider {
  private options: IOptions;
  private $root: JQuery<HTMLElement>;
  private slider: IMetaSlider;
  private panel: IPanel;
  private $sliderValues: JQuery<HTMLElement>;

  constructor($root: JQuery<HTMLElement>, options: IOptions) {
    this.$root = $root;
    this.options = options;
    this.slider = null;
    this.panel = null;
    this.$sliderValues;
    this.init();
  }

  public showValues(): void {
    const el = this;
    this.slider.setOptions($.extend(this.options, {
      onChange: function (values) {
        el.$sliderValues.text(`from: ${values[0]}; to: ${values[1]}`);
        el.panel.setValue({'from': values[0]})
        if(values[1]) {
          el.panel.setValue({ 'to': values[1] })
        }
      }
    }))
  }

  private init(): void {
    const $sliderRootElement = this.$root.find('.js-slider__root');
    const $sliderPanelElement = this.$root.find('.js-slider__panel');
    this.$sliderValues = this.$root.find('.js-slider__values');
    this.slider = $sliderRootElement.MetaSlider(this.options).getSlider();
    const newOptions = this.slider.getOptions();    
    this.panel = new Panel($sliderPanelElement, newOptions);
    this.panel.observer.subscribe({ key: 'setting', observer: this.changeSettings.bind(this) })
    this.showValues();
    this.$sliderValues.text(`from: ${this.options.from}; to: ${this.options.to}`);
  }

  private changeSettings(setting: ISettings) {
    this.options = this.slider.getOptions();
    this.options = $.extend(this.options, setting);
    this.slider.setOptions(this.options);
  }
}

export default Slider;
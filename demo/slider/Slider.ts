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
    this.initPanel();
  }

  public showValues(): void {
    const el = this;
    this.$sliderValues.text(`from: ${this.options.from}; to: ${this.options.to}`);
    this.slider.setOptions($.extend(this.options, {
      onChange: function (values) {        
        el.$sliderValues.text(`from: ${values[0]}; to: ${values[1]}`);
        el.changeValues(values)
      }
    }))
  }

  private init(): void {
    const $sliderRootElement = this.$root.find('.js-slider__root');    
    this.$sliderValues = this.$root.find('.js-slider__values');
    this.slider = $sliderRootElement.MetaSlider(this.options).getSlider();
    this.options = this.slider.getOptions();        
  }

  private initPanel(): void {
    const $sliderPanelElement = this.$root.find('.js-slider__panel');
    const sliderOptions = this.slider.getOptions();
    this.panel = new Panel($sliderPanelElement, sliderOptions);
    this.panel.observer.subscribe({ key: 'setting', observer: this.changeSettings.bind(this) });
  }

  private changeSettings(setting: ISettings) {   
    this.slider.setOptions($.extend(this.options, setting));
    this.options = this.slider.getOptions();
    this.changeValues([this.options.from, this.options.to])
  }

  private changeValues(values) {
    this.options.from = values[0];
    this.panel.setValue({ 'from': values[0] })
    if (values[1]) {
      this.options.to = values[1];
      this.panel.setValue({ 'to': values[1] })
    }
  }
}

export default Slider;
import '../../src/index';
import { ISettings } from '../../src/interfaces/interfaces';
import IPanel from '../panel/interface';
import Panel from '../panel/Panel';
import ISlider from './interface';

class Slider implements ISlider {
  private $root: JQuery<HTMLElement>;
  private $element: JQuery<HTMLElement>;
  private $sliderRootElement: JQuery<HTMLElement>;
  private $sliderValues: JQuery<HTMLElement>;
  private slider: JQuery<HTMLElement>;
  private panel: IPanel;
  private isDisplayValues: boolean;

  constructor($root: JQuery<HTMLElement>) {
    this.$root = $root;
    this.$element = $('<div>');
    this.$sliderRootElement;
    this.$sliderValues;
    this.slider = null;
    this.panel = null;
    this.isDisplayValues = false;
    this.init();
    this.initPanel();
  }

  public displayValues(): void {
    this.isDisplayValues = true;
  }

  private init(): void {
    this.$element = this.$root.find('.js-slider');
    this.$sliderRootElement = this.$element.find('.js-slider__root');
    this.$sliderValues = this.$element.find('.js-slider__values');
    const options = { ...this.$sliderRootElement.data() }
    this.slider = this.$sliderRootElement.MetaSlider('init', options).MetaSlider('setOptions', {
      onChange: (values) => {
        this.showValues(values);
        return values;
      }
    })
  }

  private showValues(values: number[]): void {
    if (this.isDisplayValues) {
      this.$sliderValues.text(`from: ${values[0]}; to: ${values[1]}`);
      this.changeValues(values)
    }
  }

  private initPanel(): void {
    const $sliderPanelElement = this.$root.find('.js-slider__panel');
    this.panel = new Panel($sliderPanelElement, this.slider.getOptions());
    this.panel.observer.subscribe({ key: 'setting', observer: this.changeSettings.bind(this) });
  }

  private changeSettings(setting: ISettings) {
    this.slider = this.slider.MetaSlider('setOptions', setting)
    const options = { ...this.$element.data() };
    this.changeValues([options.from, options.to]);    
  }

  private changeValues(values) {
    this.panel.setValue({ 'from': values[0] })
    if (values[1]) {
      this.panel.setValue({ 'to': values[1] })
    }
  }
}

export default Slider;
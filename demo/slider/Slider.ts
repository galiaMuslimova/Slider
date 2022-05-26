import '../../src/index';
import IMetaSlider from '../../src/interface';
import { IOptions, ISettings } from '../interfaces/interfaces';
import IPanel from '../panel/interface';
import Panel from '../panel/Panel';
import ISlider from './interface';

class Slider implements ISlider {
  private options: IOptions;
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
    this.options = null;
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
    const options = {
      min: this.$element.data().min,
      max: this.$element.data().max,
      step: this.$element.data().step,
      from: this.$element.data().from,
      to: this.$element.data().to,
      tip: Boolean(this.$element.data().tip),
      range: Boolean(this.$element.data().range),
      vertical: Boolean(this.$element.data().vertical),
    };
    this.slider = this.$sliderRootElement.MetaSlider(options).setOptions({
      onChange: (values) => {
        this.addAttributes(values);
        this.showValues(values);
        return values;
      }
    })
    this.options = this.slider.getOptions();
  }

  private showValues(values: number[]): void {
    if (this.isDisplayValues) {
      this.$sliderValues.text(`from: ${values[0]}; to: ${values[1]}`);
      this.changeValues(values)
    }
  }

  private addAttributes(values: number[]): void {
    this.$element.attr(`data-from`, `${values[0]}`);
    this.$element.attr(`data-to`, `${values[1]}`);
  }

  private initPanel(): void {
    const $sliderPanelElement = this.$root.find('.js-slider__panel');
    const sliderOptions = this.slider.getOptions();
    this.panel = new Panel($sliderPanelElement, sliderOptions);
    this.panel.observer.subscribe({ key: 'setting', observer: this.changeSettings.bind(this) });
  }

  private changeSettings(setting: ISettings) {
    const [key, value] = Object.entries(setting)[0];
    this.$element.attr(`data-${key}`, `${value}`)
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
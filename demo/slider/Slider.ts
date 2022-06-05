import '../../src/index';
import { IConfig, IOptions } from '../../src/interfaces/interfaces';
import IPanel from '../panel/interface';
import Panel from '../panel/Panel';
import ISlider from './interface';

class Slider implements ISlider {
  private $root: JQuery<HTMLElement>;

  private $element: JQuery<HTMLElement>;

  private $sliderRootElement: JQuery<HTMLElement>;

  private slider: JQuery<HTMLElement>;

  private panel: IPanel;

  private isDisplayValues: boolean;

  constructor($root: JQuery<HTMLElement>) {
    this.$root = $root;
    this.$element = $('<div>');
    this.$sliderRootElement = $('<div>');
    this.slider = null;
    this.panel = null;
    this.isDisplayValues = false;
    this.init();
    this.initPanel();
  }

  public displayValues(isDisplay: boolean): void {
    this.isDisplayValues = isDisplay;
  }

  private init(): void {
    this.$element = this.$root.find('.js-slider');
    this.$sliderRootElement = this.$element.find('.js-slider__root');
    this.slider = this.$sliderRootElement
      .MetaSlider()
      .MetaSlider('setOptions', {
        onChange: (config) => {
          this.showValues(config);
        },
      });
  }

  private showValues(config: IConfig): void {
    const $sliderValues = this.$element.find('.js-slider__values');
    this.panel.setValue(config);
    if (this.isDisplayValues) {
      $sliderValues.text(`from: ${config.from}; to: ${config.to}`);
    }
  }

  private initPanel(): void {
    const $sliderPanelElement = this.$root.find('.js-slider__panel');
    const options = this.slider.MetaSlider('getOptions');
    this.panel = new Panel($sliderPanelElement, options);
    this.panel.observer.subscribe({
      key: 'setting',
      observer: this.changeSettings.bind(this),
    });
  }

  private changeSettings(setting: IOptions) {
    this.slider = this.slider.MetaSlider('setOptions', setting);
    this.panel.setValue(this.slider.MetaSlider('getOptions'));
  }
}

export default Slider;

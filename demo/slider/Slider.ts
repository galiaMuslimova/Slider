import '../../src/index';
import { IConfig, IOptions } from '../../src/interfaces/interfaces';
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
    this.$element = $("<div>");
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
    this.$element = this.$root.find(".js-slider");
    this.$sliderRootElement = this.$element.find(".js-slider__root");
    this.$sliderValues = this.$element.find(".js-slider__values");
    const options = { ...this.$sliderRootElement.data() };
    this.slider = this.$sliderRootElement
      .MetaSlider("init", options)
      .MetaSlider("setOptions", {
        onChange: (config) => {
          this.showValues(config);
          return config;
        },
      });
  }

  private showValues(config: IConfig): void {
    if (this.isDisplayValues) {
      this.$sliderValues.text(`from: ${config.from}; to: ${config.to}`);
      this.changeValues(config);
    }
  }

  private initPanel(): void {
    const $sliderPanelElement = this.$root.find(".js-slider__panel");
    this.panel = new Panel(
      $sliderPanelElement,
      this.slider.MetaSlider("getOptions")
    );
    this.panel.observer.subscribe({
      key: "setting",
      observer: this.changeSettings.bind(this),
    });
  }

  private changeSettings(setting: IOptions) {
    this.slider.MetaSlider("setOptions", setting);
  }

  private changeValues(config:IConfig) {
    this.panel.setValue({ from: config.from });
    if (config.to) {
      this.panel.setValue({ to: config.to });
    }
  }
}

export default Slider;
import "./slider.scss";
import Settings from "./settings/settings";
import Observer from "../observer";
import { IConfig, IParameters, IPositions, ISettings } from "../interfaces";

import Track from "./elements/track";
import Scale from "./elements/scale";
import Handle from "./elements/handle";
import Interval from "./elements/interval";
import Tip from "./elements/tip";

export class View {
  config: IConfig;
  root: JQuery<HTMLElement>;
  container: JQuery<HTMLElement>;
  slider: JQuery<HTMLElement>;
  observer: Observer;
  settings: Settings;
  track: Track;
  handles: Handle;
  interval: Interval;
  scale: Scale;
  tips: Tip;

  constructor(root: JQuery<HTMLElement>, config: IConfig) {
    this.config = config;
    this.root = root;
    this.container = jQuery('<div>', {
      class: `meta-slider ${this.config.orientation == 'vertical' ? 'meta-slider_vertical' : 'meta-slider_horizontal'}`,
    }).appendTo(this.root)
    this.slider = jQuery('<div>', {
      class: 'meta-slider__slider slider',
    }).appendTo(this.container);
    this.observer = new Observer();
    this.settings = new Settings(this.container, this.config);
    this.track = new Track(this.slider, this.config);
    this.handles = new Handle(this.slider, this.config);
    this.interval = new Interval(this.slider, this.config);
    this.scale = new Scale(this.slider, this.config);
    this.tips = new Tip(this.slider, this.config);
    this.init();
  }

  init() {
    
    this.moveHandle();
    this.clickOnScale();
    this.settings.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) })    
  }

  initScale(stepsArr: IPositions[]) {
    this.scale.initScale(stepsArr);
  }

  changeSettings(settings: ISettings) {
    this.observer.notify('settings', settings);
  }

  changeParameters(parameters: IParameters) {
    this.handles.moveHandles(parameters.handleX);
    this.tips.changeTips(parameters.values) 
    this.interval.moveInterval(parameters.handleX);  
    this.settings.initValues(parameters.values);     
  }

  /*when user move handle by drag*/
  moveHandle() {
    let element = this;
    this.slider.on('mousedown', '.slider__handle', function () {
      let index = $(this).hasClass('slider__handle_right')?1:0;
      document.onmousemove = function (event) {
        element.observer.notify('mousemove', { event, index })
      };
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
      this.ondragstart = function () {
        return false;
      };
    })
  }

  /*when user click on value */
  clickOnScale() {
    let element = this;
    this.slider.on('click', '.slider__value', function () {
      let currentValue = Number($(this).attr('data_value'));
      element.observer.notify('click', currentValue);
    })
  }
}

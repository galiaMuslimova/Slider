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
  parameters: IParameters;
  observer: Observer;
  root: JQuery<HTMLElement>;
  container: JQuery<HTMLElement>;
  slider: JQuery<HTMLElement>;
  settings: Settings;
  track: Track;
  scale: Scale;
  handles: Handle;
  interval: Interval;
  tips: Tip;

  constructor(root: JQuery<HTMLElement>, config: IConfig) {
    this.config = config;
    this.parameters = {
      values: [],
      handleX: []
    };
    this.observer = new Observer();
    this.root = root;
    this.container = jQuery('<div>', {
      class: `meta-slider ${this.config.vertical ? 'meta-slider_vertical' : 'meta-slider_horizontal'}`,
    }).appendTo(this.root);
    this.slider = jQuery('<div>', {
      class: 'meta-slider__slider',
    }).appendTo(this.container);
    this.settings = new Settings(this.container, this.config);
    this.settings.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) })
    this.track = new Track(this.slider, this.config);
    this.scale = new Scale(this.slider, this.config);
    this.handles = new Handle(this.slider, this.config);
    this.interval = new Interval(this.slider, this.config);
    this.tips = new Tip(this.slider, this.config);
    this.init();
  }

  init() {
    this.moveHandle();
    this.clickOnScale();
  }

  initSlider() {
    this.root.find('.meta-slider').remove();
    this.container = jQuery('<div>', {
      class: `meta-slider ${this.config.vertical ? 'meta-slider_vertical' : 'meta-slider_horizontal'}`,
    }).appendTo(this.root)

    this.slider = jQuery('<div>', {
      class: 'meta-slider__slider',
    }).appendTo(this.container);
    this.settings = new Settings(this.container, this.config);
    this.settings.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) })
    this.track = new Track(this.slider, this.config);
    this.scale = new Scale(this.slider, this.config);
    this.handles = new Handle(this.slider, this.config);
    this.interval = new Interval(this.slider, this.config);
    this.tips = new Tip(this.slider, this.config);
    this.init();
  }

  initScale(stepsArr: IPositions[]) {
    this.scale.initScale(stepsArr);
  }

  changeSettings(settings: ISettings) {
    if (settings) {
      this.config = $.extend({}, this.config, settings)
      let key = Object.keys(settings)[0]
      if (key == 'tip') {
        this.tips.initTips(this.config.tip)
      } else if (key == 'range') {
        this.handles.initHandles(this.config.range)
        this.tips.initTips(this.config.tip)
      } else if (key == 'start' || key == 'end') {
        this.settings.changeBounds(this.config)
      }
      else if (key == 'vertical') {
        this.initSlider()
      }
      this.observer.notify('settings', settings)
    }
  }

  changeParameters(parameters: IParameters) {
    this.parameters = parameters;
    this.handles.moveHandles(parameters.handleX);
    this.tips.changeTips(parameters.values)
    this.interval.moveInterval(parameters.handleX);
    this.settings.initValues(parameters.values);
  }

  /*when user move handle by drag*/
  moveHandle() {
    let observer = this.observer
    this.slider.on('mousedown touchstart', '.meta-slider__handle', function () {
      let index = $(this).hasClass('meta-slider__handle_right') ? 1 : 0;
      $(document).on('mousemove', function (event) {
        let eventPosition = {pageX: event.pageX, pageY: event.pageY}
        observer.notify('mousemove', { eventPosition, index })
      });
      $(document).on('touchmove', function (event) {
        if (event && event.originalEvent && event.originalEvent.touches && event.originalEvent.touches[0]) {
          let touch =  event.originalEvent.touches[0]
          let eventPosition = { pageX: touch.pageX, pageY: touch.pageY }
          observer.notify('mousemove', { eventPosition, index }) 
        }    
      });
      $(document).on('mouseup touchend', function () {
        $(document).off('mousemove mouseup touchmove touchend')
      });
      this.ondragstart = function () {
        return false;
      };
    })
  }

  /*when user click on value */
  clickOnScale() {
    let observer = this.observer
    this.slider.on('click touchstart', '.meta-slider__value', function () {
      let currentValue = Number($(this).attr('data_value'));
      observer.notify('click', currentValue);
    })
  }
}

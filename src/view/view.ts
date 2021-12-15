import "./slider.scss";
import Settings from "./settings/settings";
import Observer from "../observer";
import { IConfig, IParameters, IPositions, ISettings } from "../interfaces";

import Track from "./elements/track/track";
import Scale from "./elements/scale/scale";
import Handle from "./elements/handle/handle";
import Interval from "./elements/interval/interval";
import Tip from "./elements/tip/tip";

export default class View {
  vertical: boolean;
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

  constructor(root: JQuery<HTMLElement>, vertical: boolean) {
    this.root = root; 
    this.vertical = vertical;
    this.observer = new Observer();    
    this.container = jQuery('<div>', {
      class: `meta-slider ${this.vertical ? 'meta-slider_vertical' : 'meta-slider_horizontal'}`,
    }).appendTo(this.root);
    this.slider = jQuery('<div>', {
      class: 'meta-slider__slider',
    }).appendTo(this.container);
    this.track = new Track(this.slider);
    this.scale = new Scale(this.slider);
    this.handles = new Handle(this.slider);
    this.tips = new Tip(this.slider);
    this.interval = new Interval(this.slider);
    this.settings = new Settings(this.container);
    this.settings.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) })
    this.moveHandle();
    this.clickOnScale();
  }

  getTrackParameters(){
    return this.track.getTrackParameters(this.vertical)
  }

  initScale(stepsArr: IPositions[]) {
    this.scale.initScale(stepsArr, this.vertical);
  }

  initHandles(range:boolean){
    this.handles.initHandles(range)
  }

  initTips(tip: boolean) {
    this.tips.initTips(tip)
  }

  setParameters(parameters: IParameters) {
    this.handles.moveHandles(parameters.handleX, this.vertical);
    this.tips.changeTips(parameters.values)
    this.interval.moveInterval(parameters.handleX, this.vertical);
    this.settings.initValues(parameters.values);
  }

  initSettings(config:IConfig){
    this.settings.initSettings(config);
  }

  moveHandle() {
    let observer = this.observer
    this.slider.on('mousedown touchstart', '.meta-slider__handle', function () {
      let index = $(this).hasClass('meta-slider__handle_right') ? 1 : 0;
      $(document).on('mousemove', function (event) {
        let eventPosition = { pageX: event.pageX, pageY: event.pageY }
        observer.notify('mousemove', { eventPosition, index })
      });
      $(document).on('touchmove', function (event) {
        if (event && event.originalEvent && event.originalEvent.touches && event.originalEvent.touches[0]) {
          let touch = event.originalEvent.touches[0]
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

  clickOnScale() {
    let observer = this.observer
    this.slider.on('click touchstart', '.meta-slider__value', function () {
      let currentValue = Number($(this).attr('data_value'));
      observer.notify('click', currentValue);
    })
  }

  changeSettings(settings: ISettings){
    this.observer.notify('settings', settings);    
  }
}

 

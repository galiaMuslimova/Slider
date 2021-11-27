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
  slider: JQuery<HTMLElement>;
  isTwoHandle: boolean;
  handleX: number[];
  values: number[];
  observer: Observer;
  settings: Settings;
  track: Track;
  handles: Handle;
  interval: Interval;
  scale: Scale;
  tips: Tip;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.config = config;
    this.slider = slider;
    this.isTwoHandle = this.config.handleCount == 2;
    this.handleX = [];
    this.values = [];
    this.observer = new Observer();
    this.settings = new Settings(this.slider, this.config);
    this.track = new Track(this.slider, this.config);
    this.handles = new Handle(this.slider, this.config);
    this.interval = new Interval(this.slider, this.config);
    this.scale = new Scale(this.slider, this.config);
    this.tips = new Tip(this.slider, this.config);

    this.init();
    this.dragNDropHandle();
    this.clickOnValue();
  }

  init() {
    this.settings.observer.subscribe({ key: 'moveHandle', observer: this.moveInterval.bind(this) })
    this.settings.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) })
  }

  changeSettings(settings: ISettings) {
    this.observer.notify('settings', settings);
  }

  moveInterval(handleX = this.handleX) {
    this.interval.moveInterval(handleX)
  }

  initParameters(parameters:IParameters){
    this.handles.initHandles(parameters.handleX);
    this.interval.moveInterval(parameters.handleX);
    this.settings.initValues(parameters.values);
  }

  initStepsPosition(stepsArr: IPositions[]){
    this.scale.initStepsPosition(stepsArr);
  }

  moveByHandle(parameters: IParameters) {
    let handleX = parameters.handleX
    this.handles.initHandles(handleX);
    this.handleX = handleX;
    this.interval.moveInterval(handleX);
  }

  moveByX(x: number) {
    let handleX = this.handles.moveByX(x);
    this.handleX = this.handleX;
    this.interval.moveInterval(handleX);
  }

  /*when user move handle by drag*/
  dragNDropHandle() {
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
  clickOnValue() {
    let element = this;
    this.slider.on('click', '.slider__value', function () {
      let currentValue = Number($(this).attr('data_value'));
      element.observer.notify('click', currentValue);
    })
  }
}

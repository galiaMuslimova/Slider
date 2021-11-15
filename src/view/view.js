import Settings from "@/view/settings/settings.js";
import Observer from "@/observer.js";

import Track from "@/view/elements/track.js";
import Scale from "@/view/elements/scale.js";
import Handle from "@/view/elements/handle.js";
import Interval from "@/view/elements/interval.js";


export default class View {
  constructor(slider, config) {
    this.config = config;
    this.slider = slider;

    this.isTwoHandle = this.config.handleCount == 2;    
    this.handleX;

    this.init();
    this.dragNDropHandle();
    this.clickOnValue();
  }

  init() {
    this.observer = new Observer();
    this.settings = new Settings(this.slider, this.config);

    this.track = new Track(this.slider, this.config);
    this.handles = new Handle(this.slider, this.config);
    this.interval = new Interval(this.slider, this.config);
    this.scale = new Scale(this.slider, this.config);
    
    this.settings.observer.subscribe({ key: 'moveHandle', observer: this.moveInterval.bind(this) })
    this.settings.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) })
  }

  changeSettings(settings) {
    this.scale.changeScale(settings)    
    this.observer.notify('settings', settings);
  }

  moveInterval(handleX = this.handleX) {
    this.interval.moveInterval(handleX)
  }

  /* move handle by parameter x */
  initHandles(handleX) {
    this.handleX = handleX;
    this.handles.initHandles(handleX);
    this.interval.moveInterval(handleX)
  }

  moveByHandle(x, handle){
    let handleX = this.handles.moveByHandle(x, handle);
    this.handleX = handleX;
    this.interval.moveInterval(handleX);
  }

  moveByX(x) {
    let handleX = this.handles.moveByX(x);
    this.handleX = this.handleX;
    this.interval.moveInterval(handleX);
  }

  /*when user move handle by drag*/
  dragNDropHandle() {
    let element = this;
    this.slider.on('mousedown', '.slider__handle', function () {
      let handle = this;
      document.onmousemove = function (event) {
        element.observer.notify('mousemove', { event, handle })
      };

      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };

      handle.ondragstart = function () {
        return false;
      };
    })
  }

  /*when user click on value */
  clickOnValue() {
    let element = this;
    this.slider.on('click', '.slider__value', function () {
      let currentValue = +$(this).attr('data_value');
      element.observer.notify('click', currentValue);
    })
  }
}

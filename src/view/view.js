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
    this.handleX = [0, 0];

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
    
    this.settings.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) })
  }

  changeSettings(settings) {    
    this.observer.notify('settings', settings);
  }

  moveInterval(x1 = this.handleX[0], x2 = this.handleX[1]) {
    switch (this.config.handleCount) {
      case 1:
        this.interval.moveByX(this.config.min, x1);
        break;
      case 2:
        this.interval.moveByX(x1, x2)
        break;
    }
  }

  /* move handle by parameter x */
  moveByX(handleOrder, x) {
    switch (handleOrder) {
      case 1:
        this.handleX[0] = this.firstHandle.moveByX(x);
        break;
      case 2:
        this.handleX[1] = this.secondHandle.moveByX(x);
        break;
    }
    this.moveInterval()
  }

  /*when user move handle by drag*/
  dragNDropHandle() {
    let element = this;
    this.slider.on('mousedown', '.slider__handle', function () {
      let handle = this;
      let handleOrder = $(handle).hasClass('slider__handle_first') ? 1 : 2;
      document.onmousemove = function (event) {
        element.observer.notify('mousemove', { event, handleOrder })
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

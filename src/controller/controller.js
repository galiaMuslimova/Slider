import View from "@/view/view.js";
import Model from "@/model/model.js";

const defaults = {
  text: "this is slider",
  handleCount: 2,
  min: 0,
  max: 50,
  step: 5,
  values: [20, 30]
}

export class Controller {
  constructor(slider, options) {
    this.config = $.extend({}, defaults, options);
    this.options = options;
    this.slider = slider;
    this.view = new View(this.slider, this.config);
    this.model = new Model(this.slider, this.config);
    this.init();
  }

  init() {
    let handleX = this.model.initPosition();
    this.view.initHandles(handleX);

    this.view.observer.subscribe({ key: 'mousemove', observer: this.moveHandle.bind(this) });
    this.view.observer.subscribe({ key: 'click', observer: this.clickValue.bind(this) });
    this.view.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) });
    //this.model.observer.subscribe({ key: 'changeValues', observer: this.changeValues.bind(this) });
  }

  changeSettings(settings){
    this.model.changeSettings(settings)
  }

  moveHandle(data) {
    let x = this.model.takeXByEvent(data.event);
    this.view.moveByHandle(x, data.handle)
  }

  clickValue(data) {
    let x = this.model.takeXByValue(data);
    this.view.moveByX(x)
  }

  /*changePosition(data) {
    this.view.moveByX(data);
  }*/

  /*changeValues(data) {
    switch (data.length) {
      case 1:
        this.view.moveByX(1, this.model.takeXByValue(data[0]));
        break;
      case 2:
        this.view.moveByX(1, this.model.takeXByValue(data[0]));
        this.view.moveByX(2, this.model.takeXByValue(data[1]))
        break;
    }
  }*/
}


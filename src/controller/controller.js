import View from "@/view/view.js";
import Model from "@/model/model.js";

const defaults = {
  text: "this is slider",
  handleCount: 2,
  min: 0,
  max: 50,
  step: 5,
  values: [20, 30],
  sliderLeft: 0,
  sliderWidth: 500,
  stepsCount: 10,
  stepLength: 50,
  handleX: []
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
    this.changePosition(handleX)

    this.view.observer.subscribe({ key: 'mousemove', observer: this.moveHandle.bind(this) });
    this.view.observer.subscribe({ key: 'click', observer: this.clickValue.bind(this) });
    this.model.observer.subscribe({ key: 'changePosition', observer: this.changePosition.bind(this) });
    this.model.observer.subscribe({ key: 'changeValues', observer: this.changeValues.bind(this) });    
  }

  moveHandle(data) {
    let x = this.model.takePositionByEvent(data.event, data.handleOrder);
    this.view.moveByX(data.handleOrder, x)
  }

  clickValue(data) {
    let [handleOrder, x] = this.model.takePositionByValue(data);
    this.view.moveByX(handleOrder, x)
  }

  changePosition(data) {
    switch (data.length) {
      case 1:
        this.view.moveByX(1, data[0]);
        break;
      case 2:
        this.view.moveByX(1, data[0]);
        this.view.moveByX(2, data[1]);
        break;
    }
  }

  changeValues(data) {
    switch (data.length) {
      case 1:
        this.view.moveByX(1, this.model.takePositionByValue(data[0]));
        break;
      case 2:
        this.view.moveByX(1, this.model.takePositionByValue(data[0]));
        this.view.moveByX(2, this.model.takePositionByValue(data[1]))
        break;
    }
  }
}


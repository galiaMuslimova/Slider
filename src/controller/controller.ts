import { View } from "../view/view";
import Model from "../model/model";
import { IConfig, ISettings } from "../interfaces";

const defaults: IConfig = {
  min: 10,
  max: 50,
  step: 5,
  from: 15,
  to: 45,
  handleCount: 2,
  vertical: true
}

export class Controller {
  model: Model;
  view: View;
  config: IConfig;
  slider: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>, options: IConfig) {
    this.config = $.extend({}, defaults, options);
    this.slider = slider;
    this.view = new View(this.slider, this.config);
    this.model = new Model(this.slider, this.config);
    this.init();
  }

  init() {
    this.changeSettings(null);
    let positionsArr = this.model.getPositionsArr();
    this.view.initValuesPosition(positionsArr);

    this.view.observer.subscribe({ key: 'mousemove', observer: this.moveHandle.bind(this) });
    this.view.observer.subscribe({ key: 'click', observer: this.clickValue.bind(this) });
    this.view.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) });
    //this.model.observer.subscribe({ key: 'changeValues', observer: this.changeValues.bind(this) });
  }

  changeSettings(settings: ISettings | null) {
    let data: { handleX: number[], values: number[], positionsArr: { value: number, x: number }[] } = this.model.changeSettings(settings);
    this.view.initHandles(data.handleX);
    this.view.initValues(data.values);
    this.view.initValuesPosition(data.positionsArr)
  }

  moveHandle(data: { event: MouseEvent, handle: JQuery<HTMLElement> }) {
    let x = this.model.takeXByEvent(data.event);
    if (x != undefined) {
      this.view.moveByHandle(x, data.handle)
    }
  }

  clickValue(value: number) {
    let x: number = this.model.takeXByValue(value);
    this.view.moveByX(x)
  }
}


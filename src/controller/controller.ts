import { View } from "../view/view";
import Model from "../model/model";
import { IConfig, ISettings, IParameters, IPositions } from "../interfaces";

const defaults: IConfig = {
  start: 10,
  end: 50,
  step: 5,
  from: 15,
  to: 45,
  vertical: false,
  tip: true,
  range: true
}

export class Controller {
  model: Model;
  view: View;
  config: IConfig;
  root: JQuery<HTMLElement>;

  constructor(root: JQuery<HTMLElement>, options: IConfig) {
    this.config = $.extend({}, defaults, options);
    this.config.handleWidth = 20;
    this.root = root;
    this.view = new View(this.root, this.config);
    this.model = new Model(this.root, this.config);
    this.init();
  }

  init() {
    this.changeSettings(null);
    this.view.observer.subscribe({ key: 'mousemove', observer: this.moveHandle.bind(this) });
    this.view.observer.subscribe({ key: 'click', observer: this.clickOnScale.bind(this) });
    this.view.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) });
  }

  changeSettings(settings: ISettings | null) {
    let data = this.model.changeSettings(settings);
    if (data) {
      if (data.parameters) {
        this.view.changeParameters(data.parameters)
      } 
       if (data.stepsArr) {
        this.view.initScale(data.stepsArr)
      }
    }
  }

  moveHandle(data: { eventPosition: { pageX: number, pageY: number }, index: number }) {
    let parameters = this.model.takeXByEvent(data.eventPosition, data.index);
    if (parameters) {
      this.view.changeParameters(parameters)
    }
  }

  clickOnScale(value: number) {
    let parameters = this.model.takeXByScale(value);
    if (parameters) {
      this.view.changeParameters(parameters)
    } else {
      throw new Error('wrong parameters for scale')
    }
  }

}


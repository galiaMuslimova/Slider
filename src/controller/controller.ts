import { View } from "../view/view";
import Model from "../model/model";
import { IConfig, ISettings, IParameters, IPositions } from "../interfaces";

const defaults: IConfig = {
  start: 10,
  end: 50,
  step: 5,
  from: 15,
  to: 45,
  handleCount: 2,
  orientation: 'horizontal'
}

export class Controller {
  model: Model;
  view: View;
  config: IConfig;
  root: JQuery<HTMLElement>;

  constructor(root: JQuery<HTMLElement>, options: IConfig) {
    this.config = $.extend({}, defaults, options);
    this.config.isVertical = this.config.orientation=='vertical'
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
    //this.model.observer.subscribe({ key: 'changeValues', observer: this.changeValues.bind(this) });
  }

  changeSettings(settings: ISettings | null) {
    let data: { parameters: IParameters, stepsArr: IPositions[] } = this.model.changeSettings(settings);
    this.view.changeParameters(data.parameters)
    this.view.initScale(data.stepsArr)
  }

  moveHandle(data: { event: MouseEvent, index: number }) {
    let parameters = this.model.takeXByEvent(data.event, data.index);
    if (parameters != undefined) {
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


import { View } from "../view/view";
import Model from "../model/model";
import { IConfig, ISettings, IParameters, IPositions } from "../interfaces";

const defaults: IConfig = {
  min: 10,
  max: 40,
  step: 4,
  from: 8,
  to: 24,
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
    console.log(this.config)
    this.root = root;
    this.view = new View(this.root, this.config);
    let trackStart = this.view.initTrackStart();
    let trackWidth = this.view.initTrackWidth()
    if(trackWidth){
      this.model = new Model(this.config, trackStart, trackWidth)
    } else {
      throw new Error('wrong track width')
    }    
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


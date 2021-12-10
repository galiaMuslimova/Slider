import View  from "../view/view";
import Model from "../model/model";
import { IConfig, ISettings, IParameters, IPositions } from "../interfaces";

export class Controller {
  model: Model;
  view: View;
  options: IConfig;
  root: JQuery<HTMLElement>;
  vertical: boolean;

  constructor(root: JQuery<HTMLElement>, options: IConfig) {
    this.options = options
    this.root = root;
    this.vertical = (options.vertical != undefined) ? options.vertical : false;
    this.view = new View(this.root, this.vertical);
    let { trackStart, trackWidth } = this.view.getTrackParameters();
    this.model = new Model(this.options, trackStart, trackWidth); 
    this.init();
  }

  init() {    
    let stepsArr = this.model.initStepsArr();
    this.view.initScale(stepsArr);
    let range = this.model.config.range;
    this.view.initHandles(range)
    let tip = this.model.config.tip;
    this.view.initTips(tip)
    let parameters = this.model.initParameters();
    this.view.setParameters(parameters)
  }

  /*init() {
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
  }*/

}


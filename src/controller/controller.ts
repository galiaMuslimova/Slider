import View  from "../view/view";
import Model from "../model/model";
import { IConfig, ISettings } from "../interfaces";

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
    this.view.setParameters(parameters);
    this.view.observer.subscribe({ key: 'mousemove', observer: this.moveHandle.bind(this) });
    this.view.observer.subscribe({ key: 'click', observer: this.clickOnScale.bind(this) });
    this.view.initSettings(this.model.config)
    this.view.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) });
  }

  moveHandle(data: { eventPosition: { pageX: number, pageY: number }, index: number }) {
    let parameters = this.model.takeParamByEvent(data.eventPosition, data.index);
    if (parameters) {
      this.view.setParameters(parameters)
    }
  }

  clickOnScale(value: number) {
    let parameters = this.model.takeXByScale(value);
    if (parameters) {
      this.view.setParameters(parameters)
    }
  }

  changeSettings(settings: ISettings) {
    this.model.config = this.model.correctConfig($.extend({}, this.model.config, settings))
    let key = Object.keys(settings)[0];
    let value = Object.values(settings)[0];
    switch(key) {
      case 'min':
      case 'max':
      case 'step':
        this.view.initScale(this.model.initStepsArr())
        this.view.setParameters(this.model.initParameters());
        break;
      case 'from':
      case 'to':
        this.view.setParameters(this.model.initParameters());
        break;
      case 'range':
        this.view.initHandles(value as boolean);
        this.view.initTips(this.model.config.tip)
        this.view.setParameters(this.model.initParameters());
        break;
      case 'tip':
        this.view.initTips(value as boolean)
        this.view.setParameters(this.model.initParameters());
        break;
      case 'vertical':
        this.options.vertical = this.vertical = !this.vertical;
        this.root.find('.meta-slider').remove();
        this.view = new View(this.root, this.vertical);
        let { trackStart, trackWidth } = this.view.getTrackParameters();
        this.model = new Model(this.options, trackStart, trackWidth);  
        this.init()
    }
  }  
}


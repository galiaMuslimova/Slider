import {
  IOptions, ICoordinates, IConfig,
} from '../interfaces/interfaces';
import View from '../view/View';
import IView from '../view/interface';
import Model from '../model/Model';
import IModel from '../model/interface';
import IController from './interface';

class Controller implements IController {
  public model: IModel;

  public view: IView;

  private $root: JQuery<HTMLElement>;

  private options: IOptions;

  constructor(root: JQuery<HTMLElement>, options: IOptions) {
    this.$root = root;
    this.options = options;
    this.model = new Model(this.options);
    this.view = new View(this.$root);
    this.init();
  }

  public setOptions(options: IOptions): IConfig {
    this.model.setOptions(options);
    this.init();
    return this.model.getConfig();
  }

  public getOptions(): IConfig {
    return this.model.getConfig();
  }

  private init() {
    this.view.initConfig(this.model.getConfig());
    this.view.$slider.ready(() => {
      this.model.init(this.view.getStepsArr());
      this.view.setParameters(this.model.getParameters());
    });
    this.view.observer.subscribe({
      key: 'moveHandle',
      observer: this.changeParameters.bind(this),
    });
    this.view.observer.subscribe({
      key: 'moveEnd',
      observer: this.correctParameters.bind(this),
    });
  }

  private changeParameters(setting: ICoordinates) {
    this.view.setParameters(this.model.changeParameter(setting));
  }

  private correctParameters() {
    this.model.correctFromTo();
    this.view.setParameters(this.model.getParameters());
  }
}

export default Controller;

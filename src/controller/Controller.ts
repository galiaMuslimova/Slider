import { IOptions, ICoordinates, IConfig } from '../interfaces/interfaces';
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

  public setOptions(options: IOptions): void {
    this.model.setOptions(options);
    this.view.initConfig(this.model.getConfig());
  }

  public getOptions(): IConfig {
    return this.model.getConfig();
  }

  private init() {
    this.view.observer.subscribe({
      key: 'init',
      observer: this.initParameters.bind(this),
    });
    this.view.observer.subscribe({
      key: 'moveHandle',
      observer: this.changeParameters.bind(this),
    });
    this.view.observer.subscribe({
      key: 'moveEnd',
      observer: this.correctParameters.bind(this),
    });
    this.view.initConfig(this.model.getConfig());
  }

  private initParameters() {
    this.model.init(this.view.getPositions());
    this.view.setParameters(this.model.getParameters());
  }

  private changeParameters(setting: ICoordinates) {
    this.view.setParameters(this.model.changeParameter(setting));
  }

  private correctParameters() {
    this.model.correctParameters();
    this.view.setParameters(this.model.getParameters());
  }
}

export default Controller;

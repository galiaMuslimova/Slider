import { IOptions, ICoordinates } from '../interfaces/interfaces';
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
    this.view = new View(this.$root, this.model.getConfig());
    this.init();
  }

  public setOptions(options: IOptions): void {
    this.model.setOptions(options);
    this.view.changeConfig(this.model.getConfig());
  }

  public getOptions(): IOptions {
    return this.model.getOptions();
  }

  private init(): void {
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
  }

  private initParameters(): void {
    this.model.init(this.view.getPositions());
    this.view.setParameters(this.model.getConfig());
  }

  private changeParameters(setting: ICoordinates): void {
    this.model.changeParameter(setting);
    this.view.setParameters(this.model.getConfig());
  }

  private correctParameters(): void {
    this.model.correctParameters();
    this.view.setParameters(this.model.getConfig());
  }
}

export default Controller;

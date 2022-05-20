import {
  IOptions, ICoordinates, IConfig,
} from '../interfaces/interfaces';
import View from '../view/View';
import IView from '../view/interface';
import Model from '../model/Model';
import IModel from '../model/interface';
import IController from './interface';

class Controller implements IController {
  readonly options: IOptions;

  readonly $root: JQuery<HTMLElement>;

  public view: IView;

  public model: IModel;

  constructor(root: JQuery<HTMLElement>, options: IOptions) {
    this.options = options;
    this.$root = root;
    this.model = new Model(this.options);
    this.view = new View();
    this.init();
  }

  private init() {
    this.view.initSlider(this.$root, this.initData.bind(this));
    this.view.initConfig(this.model.getConfig());
    this.view.initElements();
    this.view.observer.subscribe({ key: 'moveHandle', observer: this.changeData.bind(this) });
  }

  public setOptions(options: IOptions): void {
    this.model.setOptions(options);
    this.initData();
  }

  public getOptions(): IConfig {
    return this.model.getOptions();
  }

  public getValues(): number[] {
    return this.model.getValues();
  }

  private initData() {
    const { trackStart, trackWidth } = this.view.getTrackParameters();
    this.model.setTrackParameters(trackStart, trackWidth);
    this.model.init();
    this.view.initData(this.model.getData());
  }

  private changeData(setting: ICoordinates) {
    const key = Object.keys(setting)[0];
    const value = setting[key];
    if (key === '0' || key === '1') {
      this.view.setParameters(this.model.changeParameter(value, Number(key)));
    } else if (key === 'moveEnd') {
      this.view.initData(this.model.correctFromToByParams());
    } else {
      this.view.setParameters(this.model.changeParameter(value));
    }
  }
}

export default Controller;

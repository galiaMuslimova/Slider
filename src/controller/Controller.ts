import {
  IOptions, ISettings, IEventPosition, IConfig, IParameters, ICoordinates,
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
    this.view.init(this.$root);
    this.view.initConfig(this.model.getConfig());
    this.view.observer.subscribe({ key: 'moveHandle', observer: this.changeData.bind(this) });
    this.view.observer.subscribe({ key: 'changeSetting', observer: this.changeSetting.bind(this) });
    setTimeout(() => {
      this.initData();
    }, 10);
  }

  public addPanel() {
    this.view.initPanel(this.model.getConfig());
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

  private changeSetting(setting: ISettings) {
    this.model.setSetting(setting);
    this.initData();
  }
}

export default Controller;

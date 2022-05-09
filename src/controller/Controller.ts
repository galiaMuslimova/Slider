import {
  IOptions, ISettings, IEventPosition, IConfig,
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
    this.view.toggleDirection(this.model.getVertical());
    this.view.toggleRange(this.model.getRange());
    this.view.toggleTip(this.model.getTip());
    this.view.observer.subscribe({ key: 'mouseMove', observer: this.mouseMove.bind(this) });
    this.view.observer.subscribe({ key: 'moveEnd', observer: this.moveEnd.bind(this) });
    this.view.observer.subscribe({ key: 'scaleClick', observer: this.clickOnScale.bind(this) });
    this.view.observer.subscribe({ key: 'trackClick', observer: this.changePositionByTrack.bind(this) });
    this.view.observer.subscribe({ key: 'changeScale', observer: this.changeScale.bind(this) });
    this.view.observer.subscribe({ key: 'changeParameters', observer: this.changeParameters.bind(this) });
    this.view.observer.subscribe({ key: 'changeDirection', observer: this.changeDirection.bind(this) });
    setTimeout(() => {
      const { trackStart, trackWidth } = this.view.getTrackParameters();
      this.model.setTrackParameters(trackStart, trackWidth);
      this.model.init();
      this.view.correctScale(this.model.getStepsArr());
      this.view.setParameters(this.model.getParameters());
    }, 10);
  }

  public addPanel() {
    this.view.initPanel(this.model.getConfig());
  }

  private mouseMove(options: IEventPosition) {
    const parameters = this.model.takeParamHandleMove(options);
    if (parameters !== undefined) {
      this.view.setParameters(parameters);
    }
  }

  private moveEnd() {
    this.view.setParameters(this.model.correctFromToByParams());
  }

  private clickOnScale(value: number) {
    const parameters = this.model.takeParamScaleClick(value);
    this.view.setParameters(parameters);
  }

  private changePositionByTrack(position: number) {
    const parameters = this.model.takeParamTrackClick(position);
    this.view.setParameters(parameters);
  }

  private changeScale(setting: ISettings) {
    this.model.setSetting(setting);
    this.view.correctScale(this.model.initStepsArr());
    this.model.correctFromTo();
    this.view.setParameters(this.model.initParameters());
  }

  private changeParameters(setting: ISettings) {
    this.model.setSetting(setting);
    this.model.initParameters();
    this.view.setParameters(this.model.correctFromToByParams());
  }

  private changeDirection(setting: ISettings) {
    this.model.setSetting(setting);
    const { trackStart, trackWidth } = this.view.getTrackParameters();
    this.model.setTrackParameters(trackStart, trackWidth);
    this.view.correctScale(this.model.initStepsArr());
    this.view.setParameters(this.model.initParameters());
  }
}

export default Controller;

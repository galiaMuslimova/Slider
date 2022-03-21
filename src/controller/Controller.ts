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

  public $slider: JQuery<HTMLElement>;

  private vertical: boolean;

  constructor(root: JQuery<HTMLElement>, options: IOptions) {
    this.options = options;
    this.$root = root;
    this.$slider = jQuery('<div>', { class: 'meta-slider' }).prependTo(this.$root);
    this.model = new Model(this.options);
    this.vertical = this.model.getConfig().vertical;
    this.view = new View(this.$slider, this.model.getConfig());
    this.view.observer.subscribe({ key: 'mouseMove', observer: this.moveHandle.bind(this) });
    this.view.observer.subscribe({ key: 'moveEnd', observer: this.moveEnd.bind(this) });
    this.view.observer.subscribe({ key: 'click', observer: this.clickOnScale.bind(this) });
    this.view.observer.subscribe({ key: 'position', observer: this.changePositionByTrack.bind(this) });
    this.init();
  }

  public init() {
    this.$slider.addClass(this.vertical ? 'meta-slider_vertical' : 'meta-slider_horizontal');
    const { trackStart, trackWidth } = this.view.getTrackParameters();
    this.model.setTrackParameters(trackStart, trackWidth);
    const stepsArr = this.model.initStepsArr();
    this.view.init(stepsArr);
    this.model.correctFromTo();
    const parameters = this.model.initParameters();
    this.view.setParameters(parameters);
  }

  public addPanel() {
    this.view.initPanel(this.model.getConfig());
    this.view.observer.subscribe({ key: 'setting', observer: this.changeSettings.bind(this) });
  }

  private moveHandle(options: IEventPosition) {
    const parameters = this.model.takeParamHandleMove(options);
    if (typeof parameters !== 'boolean') {
      this.view.setParameters(parameters);
    }
  }

  private moveEnd() {
    const { from, to } = this.model.correctFromToByParams();
    this.view.setSettings({ from });
    this.view.setSettings({ to });
    this.view.setParameters(this.model.getParameters());
  }

  private clickOnScale(value: number) {
    const parameters = this.model.takeParamScaleClick(value);
    if (parameters) {
      this.view.setParameters(parameters);
    }
  }

  private changeSettings(setting: ISettings) {
    this.model.setSetting(setting);
    const newConfig = this.model.getConfig();
    const key = Object.keys(setting)[0];
    switch (key) {
      case 'min':
      case 'max':
      case 'step':
        this.view.initScale(this.model.initStepsArr());
        this.model.correctFromTo();
        this.view.setParameters(this.model.initParameters());
        break;
      case 'from':
      case 'to':
        this.view.setParameters(this.model.initParameters());
        break;
      case 'range':
        this.view.correctHandlesByRange(newConfig.range);
        this.view.initTips(newConfig.tip);
        this.view.setParameters(this.model.initParameters());
        break;
      case 'tip':
        this.view.initTips(newConfig.tip);
        this.view.changeTips(this.model.getParameters());
        break;
      case 'vertical': {
        this.vertical = !this.vertical;
        this.model.setVertical(this.vertical);
        this.$slider.removeClass(this.vertical ? 'meta-slider_horizontal' : 'meta-slider_vertical');
        this.view.changeDirection(this.model.getConfig());
        this.init();
        break;
      }
      default: {
        throw new Error('undefined setting');
      }
    }
  }

  private changePositionByTrack(position: number) {
    const parameters = this.model.takeParamTrackClick(position);
    if (parameters) {
      this.view.setParameters(parameters);
    }
  }
}

export default Controller;

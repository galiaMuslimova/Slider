import { IOptions, ISettings } from '../interfaces/interfaces';
import View from '../view/View';
import Model from '../model/Model';

class Controller {
  readonly model: Model;

  readonly view: View;

  readonly options: IOptions;

  readonly $root: JQuery<HTMLElement>;

  private vertical: boolean;

  constructor(root: JQuery<HTMLElement>, options: IOptions) {
    this.options = options;
    this.$root = root;
    this.vertical = (options.vertical !== undefined) ? options.vertical : false;
    this.view = new View(this.$root, this.vertical);
    const { trackStart, trackWidth } = this.view.getTrackParameters();
    this.model = new Model(this.options, trackStart, trackWidth);
    this.init();
  }

  init() {
    this.initElements();
    this.view.observer.subscribe({ key: 'mousemove', observer: this.moveHandle.bind(this) });
    this.view.observer.subscribe({ key: 'click', observer: this.clickOnScale.bind(this) });
    this.view.initPanel(this.model.getConfig());
    this.view.observer.subscribe({ key: 'setting', observer: this.changeSettings.bind(this) });
    this.view.observer.subscribe({ key: 'position', observer: this.changePositionByTrack.bind(this) });
  }

  private initElements() {
    const stepsArr = this.model.getStepsArr();
    this.view.initScale(stepsArr);
    const { range } = this.model.getConfig();
    this.view.initHandles(range);
    const { tip } = this.model.getConfig();
    this.view.initTips(tip);
    const parameters = this.model.getParameters();
    this.view.setParameters(parameters);
  }

  private moveHandle(options: { eventPosition: { pageX: number, pageY: number }, index: number }) {
    const parameters = this.model.takeParamHandleMove(options);
    if (parameters) {
      this.view.setParameters(parameters);
    }
  }

  private clickOnScale(value: number) {
    const parameters = this.model.takeParamScaleClick(value);
    if (parameters) {
      this.view.setParameters(parameters);
    }
  }

  private changeSettings(setting: ISettings) {
    const modelConfig = this.model.getConfig();
    const newConfig = $.extend({}, modelConfig, setting);
    this.model.setConfig(newConfig);
    const key = Object.keys(setting)[0];
    switch (key) {
      case 'min':
      case 'max':
      case 'step':
        this.model.correctMinMax();
        this.view.initScale(this.model.initStepsArr());
        this.view.setSettings({ min: newConfig.min }, 'min');
        this.view.setSettings({ max: newConfig.max }, 'max');
        this.view.setSettings({ step: newConfig.step }, 'step');
        this.model.correctFromTo();
        this.view.setParameters(this.model.initParameters());
        break;
      case 'from':
      case 'to':
        this.model.correctFromTo();
        this.view.setSettings({ from: newConfig.from }, 'from');
        this.view.setSettings({ to: newConfig.to }, 'to');
        this.view.setParameters(this.model.initParameters());
        break;
      case 'range':
        this.model.correctFromTo();
        this.view.setSettings({ range: newConfig.range }, 'range');
        this.view.initHandles(newConfig.range);
        this.view.initTips(newConfig.tip);
        this.view.setParameters(this.model.initParameters());
        break;
      case 'tip':
        this.view.setSettings({ tip: newConfig.tip }, 'tip');
        this.view.initTips(newConfig.tip);
        this.view.changeTips(this.model.getParameters().values);
        break;
      case 'vertical': {
        this.view.setSettings({ vertical: newConfig.vertical }, 'vertical');
        const vertical = !this.vertical;
        this.options.vertical = vertical;
        this.vertical = vertical;
        this.view.changeDirection(vertical);
        const { trackStart, trackWidth } = this.view.getTrackParameters();
        this.model.setTrackStart(trackStart);
        this.model.settrackWidth(trackWidth);
        this.initElements();
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

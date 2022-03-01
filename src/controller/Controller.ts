import { IOptions, ISettings } from '../interfaces/interfaces';
import View from '../view/View';
import Model from '../model/Model';

class Controller {
  model: Model;

  view: View;

  options: IOptions;

  $root: JQuery<HTMLElement>;

  vertical: boolean;

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
    this.view.initPanel(this.model.config);
    this.view.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) });
    this.view.observer.subscribe({ key: 'position', observer: this.changePositionByTrack.bind(this) });
  }

  initElements() {
    const { stepsArr } = this.model;
    this.view.initScale(stepsArr);
    const { range } = this.model.config;
    this.view.initHandles(range);
    const { tip } = this.model.config;
    this.view.initTips(tip);
    const parameters = this.model.initParameters();
    this.view.setParameters(parameters);
  }

  moveHandle(options: { eventPosition: { pageX: number, pageY: number }, index: number }) {
    const parameters = this.model.takeParamHandleMove(options);
    if (parameters) {
      this.view.setParameters(parameters);
    }
  }

  clickOnScale(value: number) {
    const parameters = this.model.takeParamScaleClick(value);
    if (parameters) {
      this.view.setParameters(parameters);
    }
  }

  changeSettings(settings: ISettings) {
    this.model.config = $.extend({}, this.model.config, settings);
    const key = Object.keys(settings)[0];
    switch (key) {
      case 'min':
      case 'max':
      case 'step':
        this.model.changeConfig();
        this.view.setSettings({ min: this.model.config.min }, 'min');
        this.view.setSettings({ max: this.model.config.max }, 'max');
        this.view.setSettings({ step: this.model.config.step }, 'step');
        this.view.initScale(this.model.stepsArr);
        this.view.setParameters(this.model.initParameters());
        break;
      case 'from':
      case 'to':
        this.model.correctFromTo();
        this.view.setSettings({ from: this.model.config.from }, 'from');
        this.view.setSettings({ to: this.model.config.to }, 'to');
        this.view.setParameters(this.model.initParameters());
        break;
      case 'range':
        this.model.correctFromTo();
        this.view.setSettings({ range: this.model.config.range }, 'range');
        this.view.initHandles(this.model.config.range);
        this.view.initTips(this.model.config.tip);
        this.view.setParameters(this.model.initParameters());
        break;
      case 'tip':
        this.view.setSettings({ tip: this.model.config.tip }, 'tip');
        this.view.initTips(this.model.config.tip);
        this.view.changeTips(this.model.parameters.values);
        break;
      case 'vertical': {
        this.view.setSettings({ vertical: this.model.config.vertical }, 'vertical');
        const vertical = !this.vertical;
        this.options.vertical = vertical;
        this.vertical = vertical;
        this.view.changeDirection(vertical);
        const { trackStart, trackWidth } = this.view.getTrackParameters();
        this.model.trackStart = trackStart || 0;
        this.model.trackWidth = trackWidth || 500;
        this.initElements();
        break;
      }
      default: {
        throw new Error('undefined setting');
      }
    }
  }

  changePositionByTrack(position: number) {
    const parameters = this.model.takeParamTrackClick(position);
    if (parameters) {
      this.view.setParameters(parameters);
    }
  }
}

export default Controller;

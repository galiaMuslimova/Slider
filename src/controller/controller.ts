import View from '../view/view';
import Model from '../model/model';
import { IOptions, ISettings } from '../interfaces';

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
    const stepsArr = this.model.initStepsArr();
    this.view.initScale(stepsArr);
    const { range } = this.model.config;
    this.view.initHandles(range);
    const { tip } = this.model.config;
    this.view.initTips(tip);
    const parameters = this.model.initParameters();
    this.view.setParameters(parameters);
    this.view.observer.subscribe({ key: 'mousemove', observer: this.moveHandle.bind(this) });
    this.view.observer.subscribe({ key: 'click', observer: this.clickOnScale.bind(this) });
    this.view.initSettings(this.model.config);
    this.view.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) });
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
    this.model.config = this.model.correctConfig($.extend({}, this.model.config, settings));
    const key = Object.keys(settings)[0];
    const value = Object.values(settings)[0];
    switch (key) {
      case 'min':
      case 'max':
      case 'step': {
        this.view.initScale(this.model.initStepsArr());
        this.model.positionsArr = this.model.initPositionsArr();
        this.view.setParameters(this.model.initParameters());
        break;
      }
      case 'from':
      case 'to': {
        this.view.setParameters(this.model.initParameters());
        break;
      }
      case 'range': {
        this.view.initHandles(value as boolean);
        this.view.initTips(this.model.config.tip);
        this.view.setParameters(this.model.initParameters());
        break;
      }
      case 'tip': {
        this.view.initTips(value as boolean);
        this.view.changeTips(this.model.parameters.values);
        break;
      }
      case 'vertical': {
        this.options.vertical = !this.vertical;
        this.vertical = !this.vertical;
        this.$root.find('.meta-slider').remove();
        this.view = new View(this.$root, this.vertical);
        const { trackStart, trackWidth } = this.view.getTrackParameters();
        this.model = new Model(this.options, trackStart, trackWidth);
        this.init();
        break;
      }
      default: {
        throw new Error('undefined setting');
      }
    }
  }
}

export default Controller;

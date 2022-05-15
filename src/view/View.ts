import {
  IConfig, ICoordinates, IData, IOptions, IParameters, ISettings, ITrackPosition,
} from '../interfaces/interfaces';
import Panel from '../panel/Panel';
import IPanel from '../panel/interface';
import Observer from '../observer/Observer';

import './slider.scss';
import IView from './interface';

import Track from './elements/track/track';
import Scale from './elements/scale/scale';
import Handle from './elements/handle/handle';
import Interval from './elements/interval/interval';
import ITrack from './elements/track/interface';
import IScale from './elements/scale/interface';
import IHandle from './elements/handle/interface';
import IInterval from './elements/interval/interface';

class View implements IView {
  public observer: Observer;

  private $slider: JQuery<HTMLElement>;

  private $container: JQuery<HTMLElement>;

  private $trackElement: JQuery<HTMLElement>;

  private track: ITrack;

  private firstHandle: IHandle;

  private secondHandle: IHandle | null;

  private interval: IInterval;

  private scale: IScale;

  private panel: IPanel | null;

  private config: IConfig | IOptions;

  constructor() {
    this.observer = new Observer();
    this.$slider = jQuery('<div>');
    this.$container = jQuery('<div>');
    this.$trackElement = jQuery('<div>');
    this.track = new Track();
    this.scale = new Scale();
    this.firstHandle = new Handle();
    this.secondHandle = null;
    this.interval = new Interval();
    this.panel = null;
    this.config = {};
  }

  public init($root: JQuery<HTMLElement>) {
    this.$slider.addClass('meta-slider js-meta-slider meta-slider_horizontal');
    this.$slider.prependTo($root);
    this.$container.addClass('meta-slider__container meta-slider__container_horizontal');
    this.$container.appendTo(this.$slider);
    this.track.init(this.$container);
    this.track.observer.subscribe({ key: 'trackClick', observer: this.changePositionByTrack.bind(this) });
    this.$trackElement = this.track.getElement();
    this.firstHandle.init(this.$trackElement);
    this.firstHandle.observer.subscribe({ key: 'mouseMove', observer: this.mouseMove.bind(this, '0') });
    this.firstHandle.observer.subscribe({ key: 'moveEnd', observer: this.mouseMoveEnd.bind(this) });
    this.interval.init(this.$trackElement);
    this.scale.init(this.$container);
    this.scale.observer.subscribe({ key: 'scaleClick', observer: this.scaleClick.bind(this) });
  }

  public initConfig(config: IConfig | IOptions): void {
    this.config = config;
    this.toggleDirection(config);
    this.toggleRange(config);
    this.toggleTip(config);
  }

  public initPanel(config: IConfig): void {
    this.panel = new Panel(this.$slider);
    this.panel.observer.subscribe({ key: 'setting', observer: this.changeSettings.bind(this) });
    this.panel.initPanel(config);
    this.panel.initBounds(config);
  }

  public initData(data: IData) {
    this.correctScale(data.stepsArr);
    this.setParameters(data.parameters);
  }

  public setParameters(parameters: IParameters[]): void {
    this.firstHandle.moveHandle(parameters[0]);
    this.secondHandle?.moveHandle(parameters[1]);
    this.interval.moveInterval(parameters);
    if (this.panel !== null) {
      this.panel.initValues(parameters);
    }
  }

  public getTrackParameters(): ITrackPosition {
    const { trackStart, trackWidth } = this.track.getTrackParameters();
    this.firstHandle.setTrackParameters({ trackStart, trackWidth });
    this.secondHandle?.setTrackParameters(this.track.getTrackParameters());
    return { trackStart, trackWidth };
  }

  private toggleDirection(config: IConfig | IOptions): void {
    const { vertical } = config;
    this.$slider.removeClass(vertical ? 'meta-slider_horizontal' : 'meta-slider_vertical');
    this.$slider.addClass(vertical ? 'meta-slider_vertical' : 'meta-slider_horizontal');
    this.$container.removeClass(vertical ? 'meta-slider__container_horizontal' : 'meta-slider__container_vertical');
    this.$container.addClass(vertical ? 'meta-slider__container_vertical' : 'meta-slider__container_horizontal');
    this.track.setVertical(vertical);
    this.firstHandle.setVertical(vertical);
    this.secondHandle?.setVertical(vertical);
    this.interval.setVertical(vertical);
    this.scale.setVertical(vertical);
  }

  private toggleRange(config: IConfig | IOptions): void {
    const { range } = config;
    if (range && !this.secondHandle) {
      this.secondHandle = new Handle();
      this.secondHandle.init(this.$trackElement);
      this.secondHandle.setVertical(this.firstHandle.getVertical());
      this.secondHandle.setTrackParameters(this.track.getTrackParameters());
      this.secondHandle.observer.subscribe({ key: 'mouseMove', observer: this.mouseMove.bind(this, '1') });
      this.secondHandle.observer.subscribe({ key: 'moveEnd', observer: this.mouseMoveEnd.bind(this) });
    } else if (!range && this.secondHandle) {
      const handle = this.secondHandle.getElement();
      this.$trackElement.find(handle).remove();
      this.secondHandle = null;
    }
  }

  private toggleTip(config: IConfig | IOptions): void {
    const { tip } = config;
    this.firstHandle.toggleTip(tip);
    this.secondHandle?.toggleTip(tip);
  }

  private changePositionByTrack(position: number): void {
    const options: ICoordinates = {};
    options.track = { position };
    this.observer.notify('moveHandle', options);
  }

  private mouseMove(name: string, eventPosition: number): void {
    const options: ICoordinates = {};
    options[name] = { position: eventPosition };
    this.observer.notify('moveHandle', options);
  }

  private mouseMoveEnd(): void {
    this.observer.notify('moveHandle', { moveEnd: {} });
  }

  private scaleClick(value: number): void {
    const options: ICoordinates = {};
    options.scale = { value };
    this.observer.notify('moveHandle', options);
  }

  private changeSettings(setting: ISettings): void {
    this.config = $.extend({}, this.config, setting);
    this.initConfig(this.config);
    this.observer.notify('changeSetting', setting);
  }

  private correctScale(stepsArr: IParameters[]): void {
    this.scale.correctScale(stepsArr);
  }
}

export default View;

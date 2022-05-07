import {
  IConfig, IEventPosition, IParameters, ISettings, ITrackPosition,
} from '../interfaces/interfaces';
import Panel from '../panel/Panel';
import IPanel from '../panel/interface';
import Observer from '../observer/Observer';
import IView from './interface';
import './slider.scss';

import Track from './elements/track/track';
import Scale from './elements/scale/scale';
import Handle from './elements/handle/handle';
import Interval from './elements/interval/interval';
import Tip from './elements/tip/tip';
import ITrack from './elements/track/interface';
import IScale from './elements/scale/interface';
import IHandle from './elements/handle/interface';
import IInterval from './elements/interval/interface';
import ITip from './elements/tip/interface';

class View implements IView {
  public observer: Observer;

  public scale: IScale;

  public handles: IHandle;

  public track: ITrack;

  public interval: IInterval;

  public tips: ITip;

  public panel: IPanel | null;

  readonly $root: JQuery<HTMLElement>;

  readonly $container: JQuery<HTMLElement>;

  private $slider: JQuery<HTMLElement>;

  private config: IConfig;

  constructor($root: JQuery<HTMLElement>, config: IConfig) {
    this.$root = $root;
    this.$slider = jQuery('<div>');
    this.config = config;
    this.observer = new Observer();
    this.$container = jQuery('<div>');
    this.toggleDirection(this.config);
    this.track = new Track(this.$container);
    this.scale = new Scale(this.$container);
    this.handles = new Handle(this.$container);
    this.tips = new Tip(this.$container);
    this.interval = new Interval(this.$container);
    this.panel = null;
    this.init();
  }

  public toggleDirection(config: IConfig): void {
    const isVertical = config.vertical;
    this.$slider.removeClass(isVertical ? 'meta-slider_horizontal' : 'meta-slider_vertical');
    this.$slider.addClass(isVertical ? 'meta-slider_vertical' : 'meta-slider_horizontal');
    this.$container.removeClass(isVertical ? 'meta-slider__container_horizontal' : 'meta-slider__container_vertical');
    this.$container.addClass(isVertical ? 'meta-slider__container_vertical' : 'meta-slider__container_horizontal');
  }

  public correctView(stepsArr: IParameters[]): void {
    this.handles.correctHandles(this.config.vertical);
    this.handles.correctHandlesByRange(this.config.range);
    this.tips.correctTips(this.config.tip);
    this.interval.correctInterval();
    this.interval.changeVertical(this.config.vertical);
    this.scale.correctScale(stepsArr, this.config.vertical);
  }

  public getTrackParameters(): ITrackPosition {
    this.track.correctTrack(this.config.vertical);
    return this.track.getTrackParameters();
  }

  public setParameters(parameters: IParameters[]): void {
    this.handles.moveHandles(parameters);
    this.tips.changeTips(parameters);
    this.interval.moveInterval(parameters);
    if (this.panel !== null) {
      this.panel.initValues(parameters);
    }
  }

  public initScale(stepsArr: IParameters[]): void {
    this.scale.correctScale(stepsArr, this.config.vertical);
  }

  public correctHandlesByRange(range:boolean): void {
    this.handles.correctHandlesByRange(range);
  }

  public initTips(tip: boolean): void {
    this.tips.correctTips(tip);
  }

  public changeTips(parameters: IParameters[]): void {
    this.tips.changeTips(parameters);
  }

  public setSettings(setting: ISettings): void {
    if (this.panel !== null) {
      this.panel.setValue(setting);
    }
  }

  public initPanel(config: IConfig): void {
    this.panel = new Panel(this.$slider);
    this.panel.observer.subscribe({ key: 'setting', observer: this.changeSettings.bind(this) });
    this.panel.initPanel(config);
    this.panel.initBounds(config);
  }

  private init() {
    this.$slider.addClass('meta-slider js-meta-slider');
    this.$slider.prependTo(this.$root);
    this.$container.appendTo(this.$slider);
    this.track.observer.subscribe({ key: 'trackClick', observer: this.changePositionByTrack.bind(this) });
    this.handles.observer.subscribe({ key: 'mouseMove', observer: this.mouseMove.bind(this) });
    this.handles.observer.subscribe({ key: 'moveEnd', observer: this.mouseMoveEnd.bind(this) });
    this.scale.observer.subscribe({ key: 'scaleClick', observer: this.scaleClick.bind(this) });
  }

  private changePositionByTrack(position: number): void {
    this.observer.notify('trackClick', position);
  }

  private scaleClick(currentValue: number): void {
    this.observer.notify('scaleClick', currentValue);
  }

  private changeSettings(setting: ISettings): void {
    this.observer.notify('setting', setting);
  }

  private mouseMove(options: IEventPosition): void {
    this.observer.notify('mouseMove', options);
  }

  private mouseMoveEnd(event: Event): void {
    this.observer.notify('moveEnd', event);
  }
}

export default View;

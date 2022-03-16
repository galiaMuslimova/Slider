import {
  IConfig, IEventPosition, IParameters, IStepsArr, ISettings, ITrackPosition,
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

  public panel: IPanel;

  public track: ITrack;

  public interval: IInterval;

  public tips: ITip;

  readonly $root: JQuery<HTMLElement>;

  readonly $container: JQuery<HTMLElement>;

  readonly $slider: JQuery<HTMLElement>;

  private vertical: boolean;

  constructor(root: JQuery<HTMLElement>, vertical: boolean) {
    this.$root = root;
    this.vertical = vertical;
    this.observer = new Observer();
    this.$container = this.$root.closest('.js-body__container').addClass(this.vertical ? 'body__container_vertical' : 'body__container_horizontal');
    this.$slider = jQuery('<div>', {
      class: 'meta-slider',
    }).addClass(this.vertical ? 'meta-slider_vertical' : 'meta-slider_horizontal').appendTo(this.$root);
    this.track = new Track(this.$slider, this.vertical);
    this.track.observer.subscribe({ key: 'position', observer: this.changePositionByTrack.bind(this) });
    this.scale = new Scale(this.$slider, this.vertical);
    this.scale.observer.subscribe({ key: 'click', observer: this.scaleClick.bind(this) });
    this.handles = new Handle(this.$slider, this.vertical);
    this.handles.observer.subscribe({ key: 'mouseMove', observer: this.mouseMove.bind(this) });
    this.handles.observer.subscribe({ key: 'moveEnd', observer: this.mouseMoveEnd.bind(this) });
    this.tips = new Tip(this.$slider);
    this.interval = new Interval(this.$slider);
    this.panel = new Panel(this.$container);
    this.panel.observer.subscribe({ key: 'setting', observer: this.changeSettings.bind(this) });
  }

  public getTrackParameters(): ITrackPosition {
    return this.track.getTrackParameters();
  }

  public initScale(stepsArr: IStepsArr[]): void {
    this.scale.initScale(stepsArr, this.vertical);
  }

  public correctHandlesByRange(range:boolean): void {
    this.handles.correctHandlesByRange(range);
  }

  public initTips(tip: boolean): void {
    this.tips.initTips(tip);
  }

  public changeTips(values: number[]): void {
    this.tips.changeTips(values);
  }

  public changeDirection(vertical: boolean): void {
    this.vertical = vertical;
    this.track.setVertical(vertical);
    this.scale.setVertical(vertical);
    this.handles.setVertical(vertical);
    this.$container.removeClass(`body__container_${this.vertical ? 'horizontal' : 'vertical'}`).addClass(`body__container_${this.vertical ? 'vertical' : 'horizontal'}`);
    this.$slider.removeClass(`meta-slider_${this.vertical ? 'horizontal' : 'vertical'}`).addClass(`meta-slider_${this.vertical ? 'vertical' : 'horizontal'}`);
  }

  public setParameters(parameters: IParameters): void {
    this.handles.moveHandles(parameters.positions);
    this.tips.changeTips(parameters.values);
    this.interval.moveInterval(parameters.positions, this.vertical);
    this.panel.initValues(parameters.values);
  }

  public setSettings(setting: ISettings): void {
    this.panel.setValue(setting);
  }

  public initPanel(config: IConfig): void {
    this.panel.initPanel(config);
  }

  private changePositionByTrack(position: number): void {
    this.observer.notify('position', position);
  }

  private scaleClick(currentValue: number): void {
    this.observer.notify('click', currentValue);
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

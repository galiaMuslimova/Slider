import {
  IConfig, IEventPosition, IParameters, IPosition, ISettings,
} from '../interfaces/interfaces';
import Panel from '../panel/Panel';
import Observer from '../observer/Observer';
import './slider.scss';

import Track from './elements/track/track';
import Scale from './elements/scale/scale';
import Handle from './elements/handle/handle';
import Interval from './elements/interval/interval';
import Tip from './elements/tip/tip';

class View {
  public observer: Observer;

  readonly $root: JQuery<HTMLElement>;

  readonly $container: JQuery<HTMLElement>;

  readonly $slider: JQuery<HTMLElement>;

  private vertical: boolean;

  private panel: Panel;

  private track: Track;

  private scale: Scale;

  private handles: Handle;

  private interval: Interval;

  private tips: Tip;

  constructor(root: JQuery<HTMLElement>, vertical: boolean) {
    this.$root = root;
    this.vertical = vertical;
    this.observer = new Observer();
    this.$container = this.$root.closest('.js-body__container').addClass(this.vertical ? 'body__container_vertical' : 'body__container_horizontal');
    this.$slider = jQuery('<div>', {
      class: 'meta-slider',
    }).appendTo(this.$root).addClass(this.vertical ? 'meta-slider_vertical' : 'meta-slider_horizontal');
    this.track = new Track(this.$slider, this.vertical);
    this.track.observer.subscribe({ key: 'position', observer: this.changePositionByTrack.bind(this) });
    this.scale = new Scale(this.$slider, this.vertical);
    this.scale.observer.subscribe({ key: 'click', observer: this.scaleClick.bind(this) });
    this.handles = new Handle(this.$slider, this.vertical);
    this.handles.observer.subscribe({ key: 'mousemove', observer: this.mouseMove.bind(this) });
    this.handles.observer.subscribe({ key: 'moveend', observer: this.mouseMoveEnd.bind(this) });
    this.tips = new Tip(this.$slider);
    this.interval = new Interval(this.$slider);
    this.panel = new Panel(this.$container);
    this.panel.observer.subscribe({ key: 'setting', observer: this.changeSettings.bind(this) });
  }

  public getTrackParameters() {
    return this.track.getTrackParameters();
  }

  public initScale(stepsArr: IPosition[]) {
    this.scale.initScale(stepsArr, this.vertical);
  }

  public correctHandlesByRange(range:boolean) {
    this.handles.correctHandlesByRange(range);
  }

  public initTips(tip: boolean) {
    this.tips.initTips(tip);
  }

  public changeTips(values: number[]) {
    this.tips.changeTips(values);
  }

  public changeDirection(vertical: boolean) {
    this.vertical = vertical;
    this.track.setVertical(vertical);
    this.scale.setVertical(vertical);
    this.handles.setVertical(vertical);
    this.$container.removeClass(`body__container_${this.vertical ? 'horizontal' : 'vertical'}`).addClass(`body__container_${this.vertical ? 'vertical' : 'horizontal'}`);
    this.$slider.removeClass(`meta-slider_${this.vertical ? 'horizontal' : 'vertical'}`).addClass(`meta-slider_${this.vertical ? 'vertical' : 'horizontal'}`);
  }

  public setParameters(parameters: IParameters) {
    this.handles.moveHandles(parameters.positions);
    this.tips.changeTips(parameters.values);
    this.interval.moveInterval(parameters.positions, this.vertical);
    this.panel.initValues(parameters.values);
  }

  public setSettings(setting: ISettings, key: string) {
    this.panel.setValue(setting);
  }

  public initPanel(config: IConfig) {
    this.panel.initPanel(config);
  }

  private changePositionByTrack(position: number) {
    this.observer.notify('position', position);
  }

  private scaleClick(currentValue: number) {
    this.observer.notify('click', currentValue);
  }

  private changeSettings(setting: ISettings) {
    this.observer.notify('setting', setting);
  }

  private mouseMove(options: IEventPosition) {
    this.observer.notify('mousemove', options);
  }

  private mouseMoveEnd(event: Event) {
    this.observer.notify('moveend', event);
  }
}

export default View;

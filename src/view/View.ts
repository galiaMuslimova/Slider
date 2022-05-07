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
  }

  public init($root: JQuery<HTMLElement>) {
    this.$slider.addClass('meta-slider js-meta-slider');
    this.$slider.prependTo($root);
    this.$container.addClass('meta-slider__container js-meta-slider__container');
    this.$container.appendTo(this.$slider);
    this.track.init(this.$container);
    this.track.observer.subscribe({ key: 'trackClick', observer: this.changePositionByTrack.bind(this) });
    this.$trackElement = this.track.getElement();
    this.firstHandle.init(this.$trackElement);
    this.firstHandle.observer.subscribe({ key: 'mouseMove', observer: this.mouseMove.bind(this, 0) });
    this.firstHandle.observer.subscribe({ key: 'moveEnd', observer: this.mouseMoveEnd.bind(this) });
    this.interval.init(this.$trackElement);
    this.scale.init(this.$container);
    this.scale.observer.subscribe({ key: 'scaleClick', observer: this.scaleClick.bind(this) });
  }

  public toggleDirection(vertical: boolean): void {
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

  public toggleRange(range: boolean): void {
    if (range && !this.secondHandle) {
      this.secondHandle = new Handle();
      this.secondHandle.init(this.$trackElement);
      this.secondHandle.observer.subscribe({ key: 'mouseMove', observer: this.mouseMove.bind(this, 1) });
      this.secondHandle.observer.subscribe({ key: 'moveEnd', observer: this.mouseMoveEnd.bind(this) });
    } else if (!range && this.secondHandle) {
      const handle = this.secondHandle.getElement();
      this.$trackElement.find(handle).remove();
      this.secondHandle = null;
    }
  }

  public correctScale(stepsArr: IParameters[]): void {
    this.scale.correctScale(stepsArr);
  }

  public getTrackParameters(): ITrackPosition {
    return this.track.getTrackParameters();
  }

  public setParameters(parameters: IParameters[]): void {
    this.firstHandle.moveHandle(parameters[0]);
    this.secondHandle?.moveHandle(parameters[1]);
    this.interval.moveInterval(parameters);
    if (this.panel !== null) {
      this.panel.initValues(parameters);
    }
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

  private toggleTip(tip: boolean): void {
    this.firstHandle.toggleTip(tip);
    this.secondHandle?.toggleTip(tip);
  }

  private changePositionByTrack(position: number): void {
    this.observer.notify('trackClick', position);
  }

  private scaleClick(currentValue: number): void {
    this.observer.notify('scaleClick', currentValue);
  }

  private changeSettings(setting: ISettings): void {
    const key = Object.keys(setting)[0];
    const value = setting[key];
    switch (key) {
      case 'min':
      case 'max':
      case 'step':
        this.observer.notify('changeScale', setting);
        break;
      case 'from':
      case 'to':
        this.observer.notify('changeParameters', setting);
        break;
      case 'range':
        this.toggleRange(Boolean(value));
        this.toggleTip(this.firstHandle.isTip);
        this.observer.notify('changeParameters', setting);
        break;
      case 'tip':
        this.toggleTip(Boolean(value));
        this.observer.notify('changeParameters', setting);
        break;
      case 'vertical': {
        this.toggleDirection(Boolean(value));
        this.observer.notify('changeDirection', setting);
        break;
      }
      default: {
        throw new Error('undefined setting');
      }
    }
  }

  private mouseMove(index: number, eventPosition: number): void {
    const options = { eventPosition, index };
    this.observer.notify('mouseMove', options);
  }

  private mouseMoveEnd(event: Event): void {
    this.observer.notify('moveEnd', event);
  }
}

export default View;

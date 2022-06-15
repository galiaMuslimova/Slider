import { IConfig, ICoordinates, IPositions } from '../interfaces/interfaces';
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

  public $slider: JQuery<HTMLElement>;

  private $root: JQuery<HTMLElement>;

  private config: IConfig;

  private track: ITrack;

  private scale: IScale;

  private firstHandle: IHandle;

  private secondHandle: IHandle | null;

  private interval: IInterval;

  constructor($root: JQuery<HTMLElement>, config: IConfig) {
    this.$root = $root;
    this.config = config;
    this.observer = new Observer();
    this.$slider = jQuery('<div>');
    this.track = new Track(this.$slider, this.config);
    this.scale = new Scale(this.$slider, this.config);
    this.firstHandle = new Handle(this.track.getElement(), this.config);
    this.secondHandle = null;
    this.interval = new Interval(this.track.getElement(), this.config);
    this.init();
  }

  private init() {
    this.$slider.addClass('meta-slider js-meta-slider meta-slider_horizontal');
    this.$slider.prependTo(this.$root);
    this.track.observer.subscribe({
      key: 'trackClick',
      observer: this.trackClick.bind(this),
    });
    this.scale.observer.subscribe({
      key: 'scaleClick',
      observer: this.scaleClick.bind(this),
    });
    this.firstHandle.observer.subscribe({
      key: 'mouseMove',
      observer: this.mouseMove.bind(this, 'from'),
    });
    this.firstHandle.observer.subscribe({
      key: 'moveEnd',
      observer: this.mouseMoveEnd.bind(this),
    });
    $(document).ready(() => {
      this.initTrackParameters();
    });
  }

  public changeConfig(config: IConfig) {
    this.config = config;
    this.toggleDirection();
    this.toggleRange();
    this.toggleTip();
    this.initTrackParameters();
  }

  public getPositions(): IPositions[] {
    return this.scale.getPositions();
  }

  public setParameters(config: IConfig): void {
    this.firstHandle.moveHandle(config.from, config.fromPosition);
    if (config.withRange) {
      this.secondHandle?.moveHandle(config.to, config.toPosition);
    }

    this.interval.moveInterval(config.fromPosition, config.toPosition);
  }

  private initTrackParameters() {
    const trackParameters = this.track.getTrackParameters();
    this.scale.initPositions(trackParameters);
    this.firstHandle.setTrackParameters(trackParameters);
    this.secondHandle?.setTrackParameters(trackParameters);
    this.observer.notify('init', null);
  }

  private toggleDirection(): void {
    const { isVertical } = this.config;
    this.$slider
      .removeClass(
        isVertical ? 'meta-slider_horizontal' : 'meta-slider_vertical',
      )
      .addClass(isVertical ? 'meta-slider_vertical' : 'meta-slider_horizontal');
    this.track.setVertical(isVertical);
    this.firstHandle.setVertical(isVertical);
    this.secondHandle?.setVertical(isVertical);
    this.interval.setVertical(isVertical);
    this.scale.setVertical(isVertical);
  }

  private toggleRange(): void {
    const { withRange, isVertical } = this.config;
    this.interval.setRange(withRange);
    if (withRange && !this.secondHandle) {
      this.secondHandle = new Handle(this.track.getElement(), this.config);
      this.secondHandle.setVertical(isVertical);
      this.secondHandle.observer.subscribe({
        key: 'mouseMove',
        observer: this.mouseMove.bind(this, 'to'),
      });
      this.secondHandle.observer.subscribe({
        key: 'moveEnd',
        observer: this.mouseMoveEnd.bind(this),
      });
    } else if (!withRange && this.secondHandle) {
      this.secondHandle.getElement().remove();
      this.secondHandle = null;
    }
  }

  private toggleTip(): void {
    const { hasTip } = this.config;
    this.firstHandle.toggleTip(hasTip);
    this.secondHandle?.toggleTip(hasTip);
  }

  private trackClick(position: number): void {
    const options: ICoordinates = {
      position,
    };
    this.observer.notify('moveHandle', options);
  }

  private mouseMove(key: 'from' | 'to', eventPosition: number): void {
    const options: ICoordinates = {
      key,
      position: eventPosition,
    };
    this.observer.notify('moveHandle', options);
  }

  private mouseMoveEnd(): void {
    this.observer.notify('moveEnd', null);
  }

  private scaleClick(value: number): void {
    const options: ICoordinates = {
      value,
    };
    this.observer.notify('moveHandle', options);
  }
}

export default View;

import {
  IConfig, ICoordinates, IPositions, IParameters,
} from '../interfaces/interfaces';
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

  private track: ITrack;

  private scale: IScale;

  private firstHandle: IHandle;

  private secondHandle: IHandle | null;

  private interval: IInterval;

  constructor($root: JQuery<HTMLElement>) {
    this.$root = $root;
    this.observer = new Observer();
    this.$slider = jQuery('<div>');
    this.track = new Track(this.$slider);
    this.scale = new Scale(this.$slider);
    this.firstHandle = new Handle(this.track.getElement());
    this.secondHandle = null;
    this.interval = new Interval(this.track.getElement());
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
      observer: this.mouseMove.bind(this, 0),
    });
    this.firstHandle.observer.subscribe({
      key: 'moveEnd',
      observer: this.mouseMoveEnd.bind(this),
    });
  }

  public initConfig(config: IConfig) {
    this.toggleDirection(config);
    this.toggleRange(config);
    this.toggleTip(config);
    $(document).ready(() => {
      this.scale.initPositions(config, this.track.getTrackParameters());
      this.firstHandle.setTrackParameters(this.track.getTrackParameters());
      this.secondHandle?.setTrackParameters(this.track.getTrackParameters());
      this.observer.notify('init', null);
    });
  }

  public getPositions(): IPositions[] {
    return this.scale.getPositions();
  }

  public setParameters(parameters: IParameters): void {
    this.firstHandle.moveHandle(parameters.from);
    if (parameters.to) {
      this.secondHandle?.moveHandle(parameters.to);
    }

    this.interval.moveInterval(parameters);
  }

  private toggleDirection(config: IConfig): void {
    const { isVertical } = config;
    this.$slider
      .removeClass(isVertical ? 'meta-slider_horizontal' : 'meta-slider_vertical')
      .addClass(isVertical ? 'meta-slider_vertical' : 'meta-slider_horizontal');
    this.track.setVertical(isVertical);
    this.firstHandle.setVertical(isVertical);
    this.secondHandle?.setVertical(isVertical);
    this.interval.setVertical(isVertical);
    this.scale.setVertical(isVertical);
  }

  private toggleRange(config: IConfig): void {
    const { withRange, isVertical } = config;
    this.interval.setRange(withRange);
    if (withRange && !this.secondHandle) {
      this.secondHandle = new Handle(this.track.getElement());
      this.secondHandle.setVertical(isVertical);
      this.secondHandle.observer.subscribe({
        key: 'mouseMove',
        observer: this.mouseMove.bind(this, 1),
      });
      this.secondHandle.observer.subscribe({
        key: 'moveEnd',
        observer: this.mouseMoveEnd.bind(this),
      });
    } else if (!withRange && this.secondHandle) {
      const handle = this.secondHandle.getElement();
      this.$slider.find(handle).remove();
      this.secondHandle = null;
    }
  }

  private toggleTip(config: IConfig): void {
    const { hasTip } = config;
    this.firstHandle.toggleTip(hasTip);
    this.secondHandle?.toggleTip(hasTip);
  }

  private trackClick(position: number): void {
    const options: ICoordinates = {
      position,
    };
    this.observer.notify('moveHandle', options);
  }

  private mouseMove(key: number, eventPosition: number): void {
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

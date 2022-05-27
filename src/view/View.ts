import {
  IConfig, ICoordinates, IData, IOptions, IParameters, ITrackPosition,
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

  private $trackElement: JQuery<HTMLElement>;

  private track: ITrack;

  private firstHandle: IHandle;

  private secondHandle: IHandle | null;

  private interval: IInterval;

  private scale: IScale;

  constructor() {
    this.observer = new Observer();
    this.$slider = jQuery('<div>');
    this.$trackElement = jQuery('<div>');
    this.track = new Track();
    this.scale = new Scale();
    this.firstHandle = new Handle();
    this.secondHandle = null;
    this.interval = new Interval();
  }

  public initSlider($root: JQuery<HTMLElement>, config: IConfig): void {
    this.$slider.addClass('meta-slider js-meta-slider meta-slider_horizontal');
    this.$slider.prependTo($root);
    this.track.init(this.$slider);
    this.$trackElement = this.track.getElement();
    this.changeConfig(config);
    this.track.observer.subscribe({ key: 'trackClick', observer: this.trackClick.bind(this) });
    this.firstHandle.init(this.$trackElement);
    this.firstHandle.observer.subscribe({ key: 'mouseMove', observer: this.mouseMove.bind(this, 0) });
    this.firstHandle.observer.subscribe({ key: 'moveEnd', observer: this.mouseMoveEnd.bind(this) });
    this.interval.init(this.$trackElement);
    this.scale.init(this.$slider);
    this.scale.observer.subscribe({ key: 'scaleClick', observer: this.scaleClick.bind(this) });
  }

  public changeConfig(config: IConfig): void {
    this.toggleDirection(config);
    this.toggleRange(config);
    this.toggleTip(config);
  }

  public initData(data: IData): void {
    this.correctScale(data.stepsArr);
    this.setParameters(data.parameters);
  }

  public setParameters(parameters: IParameters[]): void {
    this.firstHandle.moveHandle(parameters[0]);
    this.secondHandle?.moveHandle(parameters[1]);
    this.interval.moveInterval(parameters);
  }

  public getTrackParameters(): ITrackPosition {
    const { trackStart, trackWidth } = this.track.getTrackParameters();
    this.firstHandle.setTrackParameters({ trackStart, trackWidth });
    this.secondHandle?.setTrackParameters(this.track.getTrackParameters());
    return { trackStart, trackWidth };
  }

  private toggleDirection(config: IConfig): void {
    const { vertical } = config;
    this.$slider.removeClass(vertical ? 'meta-slider_horizontal' : 'meta-slider_vertical');
    this.$slider.addClass(vertical ? 'meta-slider_vertical' : 'meta-slider_horizontal');
    this.track.setVertical(vertical);
    this.firstHandle.setVertical(vertical);
    this.secondHandle?.setVertical(vertical);
    this.interval.setVertical(vertical);
    this.scale.setVertical(vertical);
  }

  private toggleRange(config: IConfig): void {
    const { range, vertical } = config;
    if (range && !this.secondHandle) {
      this.secondHandle = new Handle();
      this.secondHandle.init(this.$trackElement);
      this.secondHandle.setVertical(vertical);
      this.secondHandle.setTrackParameters(this.track.getTrackParameters());
      this.secondHandle.observer.subscribe({ key: 'mouseMove', observer: this.mouseMove.bind(this, 1) });
      this.secondHandle.observer.subscribe({ key: 'moveEnd', observer: this.mouseMoveEnd.bind(this) });
    } else if (!range && this.secondHandle) {
      const handle = this.secondHandle.getElement();
      this.$trackElement.find(handle).remove();
      this.secondHandle = null;
    }
  }

  private toggleTip(config: IConfig): void {
    const { tip } = config;
    this.firstHandle.toggleTip(tip);
    this.secondHandle?.toggleTip(tip);
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

  private correctScale(stepsArr: IParameters[]): void {
    this.scale.correctScale(stepsArr);
  }
}

export default View;

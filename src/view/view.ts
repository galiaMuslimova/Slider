import './slider.scss';
import Settings from './settings/settings';
import Observer from '../observer';
import {
  IConfig, IParameters, IPositions, ISettings,
} from '../interfaces';

import Track from './elements/track/track';
import Scale from './elements/scale/scale';
import Handle from './elements/handle/handle';
import Interval from './elements/interval/interval';
import Tip from './elements/tip/tip';

class View {
  vertical: boolean;

  observer: Observer;

  $root: JQuery<HTMLElement>;

  $container: JQuery<HTMLElement>;

  $slider: JQuery<HTMLElement>;

  settings: Settings;

  track: Track;

  scale: Scale;

  handles: Handle;

  interval: Interval;

  tips: Tip;

  constructor(root: JQuery<HTMLElement>, vertical: boolean) {
    this.$root = root;
    this.vertical = vertical;
    this.observer = new Observer();
    this.$container = jQuery('<div>', {
      class: `meta-slider ${this.vertical ? 'meta-slider_vertical' : 'meta-slider_horizontal'}`,
    }).appendTo(this.$root);

    this.$slider = jQuery('<div>', {
      class: 'meta-slider__slider',
    }).appendTo(this.$container);

    this.track = new Track(this.$slider);
    this.scale = new Scale(this.$slider);
    this.handles = new Handle(this.$slider);
    this.tips = new Tip(this.$slider);
    this.interval = new Interval(this.$slider);
    this.settings = new Settings(this.$container);
    this.settings.observer.subscribe({ key: 'settings', observer: this.changeSettings.bind(this) });
    this.handleMove();
    this.scaleClick();
  }

  getTrackParameters() {
    return this.track.getTrackParameters(this.vertical);
  }

  initScale(stepsArr: IPositions[]) {
    this.scale.initScale(stepsArr, this.vertical);
  }

  initHandles(range:boolean) {
    this.handles.initHandles(range);
  }

  initTips(tip: boolean) {
    this.tips.initTips(tip);
  }

  changeTips(values: number[]) {
    this.tips.changeTips(values);
  }

  setParameters(parameters: IParameters) {
    this.handles.moveHandles(parameters.handleX, this.vertical);
    this.tips.changeTips(parameters.values);
    this.interval.moveInterval(parameters.handleX, this.vertical);
    this.settings.initValues(parameters.values);
  }

  initSettings(config:IConfig) {
    this.settings.initSettings(config);
  }

  handleMove() {
    const { observer } = this;
    this.$slider.on('mousedown touchstart', '.meta-slider__handle', (event) => {
      const index = $(event.currentTarget).hasClass('meta-slider__handle_right') ? 1 : 0;
      $(document).on('mousemove', { index, observer }, View.sendMouseMoveOptions);
      $(document).on('touchmove', { index, observer }, View.sendTouchMoveOptions);

      $(document).on('mouseup touchend', () => {
        $(document).off('mousemove mouseup touchmove touchend');
      });

      $(document).on('dragstart', () => false);
    });
  }

  static sendMouseMoveOptions(e: {
    pageX: number;
    pageY: number;
    data: { index: number, observer: Observer }
  }) {
    const { index } = e.data;
    const { observer } = e.data;
    const eventPosition = { pageX: e.pageX, pageY: e.pageY };
    const options = { eventPosition, index };
    observer.notify('mousemove', options);
  }

  static sendTouchMoveOptions(e: {
    data: { index: number; observer: Observer };

    // use type any cause event can be any type
    originalEvent: any;
  }) {
    const { index } = e.data;
    const { observer } = e.data;
    const { originalEvent } = e;
    if (originalEvent !== undefined) {
      const { touches } = originalEvent;
      if (touches !== undefined) {
        const touch = touches[0];
        const eventPosition = { pageX: touch.pageX, pageY: touch.pageY };
        const options = { eventPosition, index };
        observer.notify('mousemove', options);
      }
    }
  }

  scaleClick() {
    const { observer } = this;
    this.$slider.on('click touchstart', '.meta-slider__value', { observer }, View.sendScaleClickValue);
  }

  static sendScaleClickValue(e: { currentTarget: HTMLElement; data: { observer: Observer } }) {
    const { observer } = e.data;
    const currentValue = Number($(e.currentTarget).attr('data_value'));
    observer.notify('click', currentValue);
  }

  changeSettings(settings: ISettings) {
    this.observer.notify('settings', settings);
  }
}

export default View;

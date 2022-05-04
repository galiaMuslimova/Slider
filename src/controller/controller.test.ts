import { expect } from 'chai';
import { assert } from 'console';
import { IOptions } from '../interfaces/interfaces';
import IPanel from '../panel/interface';
import IHandle from '../view/elements/handle/interface';
import IScale from '../view/elements/scale/interface';
import ITrack from '../view/elements/track/interface';

import Controller from './Controller';
import IController from './interface';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<head></head>
<body>
  <div class='testSlider'>
    <div class='body__slider js-body__slider'></div>        
  </div>
</body>`);
global.window = dom.window;
const { document } = dom.window;

describe('Controller', () => {
  let $rootEl: JQuery<HTMLElement>;
  let $slider: JQuery<HTMLElement>;
  let options: IOptions;
  let controller: IController;
  let scale: IScale;
  let track: ITrack;
  let handle: IHandle;
  let panel: IPanel | null;

  before(() => {
    $rootEl = $(document).find('.js-body__slider');
    options = {
      min: 0,
      max: 10,
      step: 1,
      from: 2,
      to: 8,
      range: true,
      vertical: false,
    };
  });

  beforeEach(() => {
    controller = new Controller($rootEl, options);
    scale = controller.view.scale;
    scale.$scale.css('width', '500px');
    scale.$scale.css('height', '500px');
    scale.$scale.css('left', '0px');
    scale.$scale.css('top', '0px');
    track = controller.view.track;
    track.$track.css('width', '500px');
    track.$track.css('height', '500px');
    track.$track.css('left', '0px');
    track.$track.css('top', '0px');
    $slider = controller.$slider;
    controller.correctSlider();
    controller.addPanel();
    handle = controller.view.handles;
    panel = controller.view.panel;
  });

  afterEach(() => {
    $rootEl.empty();
  });

  it('устанавливает опции', () => {
    expect(controller.options).to.deep.equal(options);
  });

  it('устанавливает корневой элемент', () => {
    expect(controller.$root).to.deep.equal($rootEl);
  });

  it('устанавливает stepsArr', () => {
    const stepsArr = controller.model.getStepsArr();
    const expectedStepsArr = [
      { value: 0, position: 0 },
      { value: 1, position: 50 },
      { value: 2, position: 100 },
      { value: 3, position: 150 },
      { value: 4, position: 200 },
      { value: 5, position: 250 },
      { value: 6, position: 300 },
      { value: 7, position: 350 },
      { value: 8, position: 400 },
      { value: 9, position: 450 },
      { value: 10, position: 500 },
    ];
    expect(stepsArr).to.deep.equal(expectedStepsArr);
  });

  it('устанавливает parameters', () => {
    const parameters = controller.model.getParameters();
    const expectedParameters = [{ value: 2, position: 100 }, { value: 8, position: 400 }];
    expect(parameters).to.deep.equal(expectedParameters);
  });

  it('проверяет позиции handles', () => {
    const handles = handle.getHandles();
    expect($(handles[0]).css('left')).to.deep.equal('90px');
    expect($(handles[1]).css('left')).to.deep.equal('390px');
  });

  it('проверяет change input from', () => {
    const from = panel?.takeInputFromArr('from');
    from?.observer.notify('setting', { from: 3 });
    const handles = handle.getHandles();
    const expectParameters = [{ value: 3, position: 150 }, { value: 8, position: 400 }];
    expect(controller.model.getParameters()).to.deep.equal(expectParameters);
    expect($(handles[0]).css('left')).to.deep.equal('140px');
    expect($(handles[1]).css('left')).to.deep.equal('390px');
  });

  it('проверяет change input step', () => {
    const step = panel?.takeInputFromArr('step');
    step?.observer.notify('setting', { step: 2 });
    const expectedStepsArr = [
      { value: 0, position: 0 },
      { value: 2, position: 100 },
      { value: 4, position: 200 },
      { value: 6, position: 300 },
      { value: 8, position: 400 },
      { value: 10, position: 500 },
    ];
    const stepsArr = controller.model.getStepsArr();
    const scaleItemsCount = scale.$scale.find('.js-meta-slider__scale-item').length;
    expect(stepsArr).to.deep.equal(expectedStepsArr);
    expect(scaleItemsCount).to.deep.equal(6);
  });

  it('проверяет change input range', () => {
    const range = panel?.takeInputFromArr('range');
    range?.observer.notify('setting', { range: false });
    const handles = handle.getHandles();
    expect(controller.model.getParameters()).to.deep.equal([{ value: 2, position: 100 }]);
    expect(handles.length).to.deep.equal(1);
    expect($(handles[0]).css('left')).to.deep.equal('90px');
  });

  it('проверяет change input tip', () => {
    const tip = panel?.takeInputFromArr('tip');
    tip?.observer.notify('setting', { tip: false });
    const tipsLength = controller.$slider.find('.js-meta-slider__tip').length;
    expect(tipsLength).to.deep.equal(0);
  });

  it('проверяет change input vertical', () => {
    const vertical = panel?.takeInputFromArr('vertical');
    vertical?.observer.notify('setting', { vertical: true });
    expect($slider.hasClass('meta-slider_vertical')).to.deep.equal(true);
  });

  it('проверяет click scale', () => {
    controller.view.scale.observer.notify('scaleClick', 6);
    const expectParameters = [{ value: 2, position: 100 }, { value: 6, position: 300 }];
    expect(controller.model.getParameters()).to.deep.equal(expectParameters);
  });

  it('проверяет click track', () => {
    controller.view.track.observer.notify('trackClick', 160);
    const expectParameters = [{ value: 3, position: 150 }, { value: 8, position: 400 }];
    expect(controller.model.getParameters()).to.deep.equal(expectParameters);
  });

  it('проверяет move handle', () => {
    const newOptions = { eventPosition: 200, index: 0 };
    handle.observer.notify('mouseMove', newOptions);
    const expectParameters = [{ value: 4, position: 200 }, { value: 8, position: 400 }];
    expect(controller.model.getParameters()).to.deep.equal(expectParameters);
  });

  it('проверяет moveEnd handle', () => {
    const newOptions = { eventPosition: 10, index: 1 };
    handle.observer.notify('mouseMove', newOptions);
    handle.observer.notify('moveEnd', 0);
    const correctConfig = controller.model.getConfig();
    expect(correctConfig.from).to.deep.equal(0);
    expect(correctConfig.to).to.deep.equal(2);
  });

  it('проверяет event scale click', () => {
    const e = jQuery.Event('click', { target: { dataset: { value: 3 } } });
    controller.view.scale.$scale.triggerHandler(e);
    const expectParameters = [{ value: 3, position: 150 }, { value: 8, position: 400 }];
    expect(controller.model.getParameters()).to.deep.equal(expectParameters);
  });

  it('проверяет setValue checked input', () => {
    const vertical = panel?.takeInputFromArr('vertical');
    vertical?.setValue(false);
    expect(vertical?.getValue()).to.deep.equal(false);
  });
});

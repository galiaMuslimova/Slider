import { expect } from 'chai';
import { IOptions } from '../interfaces/interfaces';

import Controller from './Controller';
import IController from './interface';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<head></head>
<body>
  <div class='body__slider js-body__slider'></div>  
</body>`);
global.window = dom.window;
const { document } = dom.window;
global.document = document;

describe('Controller', () => {
  let $rootEl: JQuery<HTMLElement>;
  let $slider: JQuery<HTMLElement> | null;
  let options: IOptions;
  let controller: IController | null;
  let $scale: JQuery<HTMLElement> | null;
  let $track: JQuery<HTMLElement> | null;
  let $handle: JQuery<HTMLElement> | null;
  let $panel: JQuery<HTMLElement> | null;

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
    controller.addPanel();
    const { trackStart, trackWidth } = controller?.view.getTrackParameters();
    controller?.model.setTrackParameters(trackStart, trackWidth);
    controller?.model.init();
    controller?.view.initData(controller?.model.getData());
    $slider = $rootEl.find('.js-meta-slider');
    $track = $rootEl.find('.js-meta-slider__track');
    $scale = $rootEl.find('.js-meta-slider__scale');
    $handle = $rootEl.find('.js-meta-slider__handle');
    $panel = $rootEl.find('.js-panel');
  });

  afterEach(() => {
    controller = null;
    $rootEl.empty();
  });

  it('устанавливает опции', () => {
    expect(controller?.options).to.deep.equal(options);
  });

  it('устанавливает корневой элемент', () => {
    expect(controller?.$root).to.deep.equal($rootEl);
  });

  it('устанавливает slider', () => {
    expect($slider?.length).to.equal(1);
  });

  it('устанавливает track', () => {
    expect($track?.length).to.equal(1);
  });

  it('устанавливает handle', () => {
    expect($handle?.length).to.equal(2);
  });

  it('устанавливает panel', () => {
    expect($panel?.length).to.equal(1);
  });

  it('устанавливает stepsArr', () => {
    controller?.model.init();
    const stepsArr = controller?.model.getData().stepsArr;
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

  it('проверяет change input min', () => {
    const e = jQuery.Event('change', { target: { value: 5 } });
    $panel?.find('input[name="min"]').triggerHandler(e);
    const stepsArr = controller?.model.getData().stepsArr;
    const expectedStepsArr = [
      { value: 5, position: 0 },
      { value: 6, position: 100 },
      { value: 7, position: 200 },
      { value: 8, position: 300 },
      { value: 9, position: 400 },
      { value: 10, position: 500 },
    ];
    expect(stepsArr).to.deep.equal(expectedStepsArr);
  });

  it('проверяет change input max', () => {
    const e = jQuery.Event('change', { target: { value: 5 } });
    $panel?.find('input[name="max"]').triggerHandler(e);
    const stepsArr = controller?.model.getData().stepsArr;
    const expectedStepsArr = [
      { value: 0, position: 0 },
      { value: 1, position: 100 },
      { value: 2, position: 200 },
      { value: 3, position: 300 },
      { value: 4, position: 400 },
      { value: 5, position: 500 },
    ];
    expect(stepsArr).to.deep.equal(expectedStepsArr);
  });

  it('проверяет change input step', () => {
    const e = jQuery.Event('change', { target: { value: 2 } });
    $panel?.find('input[name="step"]').triggerHandler(e);
    const stepsArr = controller?.model.getData().stepsArr;
    const expectedStepsArr = [
      { value: 0, position: 0 },
      { value: 2, position: 100 },
      { value: 4, position: 200 },
      { value: 6, position: 300 },
      { value: 8, position: 400 },
      { value: 10, position: 500 },
    ];
    expect(stepsArr).to.deep.equal(expectedStepsArr);
  });

  it('проверяет change input from', () => {
    const e = jQuery.Event('change', { target: { value: 3 } });
    $panel?.find('input[name="from"]').triggerHandler(e);
    const exceptParameters = [{ value: 3, position: 150 }, { value: 8, position: 400 }];
    expect(controller?.model.getData().parameters).to.deep.equal(exceptParameters);
  });

  it('проверяет change input vertical', () => {
    const e = jQuery.Event('change', { target: { checked: true } });
    $panel?.find('input[name="vertical"]').triggerHandler(e);
    const handle1 = $slider?.find('.js-meta-slider__handle')[0];
    const handle2 = $slider?.find('.js-meta-slider__handle')[1];

    if (handle1) {
      expect($(handle1).css('top')).to.equal('90px');
      expect($(handle1).css('left')).to.equal('-5px');
    }
    if (handle2) {
      expect($(handle2).css('top')).to.equal('390px');
      expect($(handle2).css('left')).to.equal('-5px');
    }
  });

  it('проверяет change and correct handles position', () => {
    controller?.model.changeParameter({ position: 30 }, 1);
    const parameters = controller?.model.getData().parameters;
    const exceptParameters = [{ value: 2, position: 100 }, { value: 1, position: 50 }];
    expect(parameters).to.deep.equal(exceptParameters);
    const eStart = jQuery.Event('mousedown');
    const eEnd = jQuery.Event('mouseup');
    const handle1 = $slider?.find('.js-meta-slider__handle')[0];
    if (handle1) {
      $(handle1).triggerHandler(eStart);
      $(document).triggerHandler(eEnd);
    }
    const correctParameters = [{ value: 1, position: 50 }, { value: 2, position: 100 }];
    expect(controller?.model.getData().parameters).to.deep.equal(correctParameters);
  });

  it('проверяет change handle 1', () => {
    const eStart = jQuery.Event('mousedown');
    const eMove = jQuery.Event('mousemove', { pageY: 210, pageX: 210 });
    const handle1 = $slider?.find('.js-meta-slider__handle')[0];
    if (handle1) {
      $(handle1).triggerHandler(eStart);
      $(document).triggerHandler(eMove);
    }
    const exceptParameters = [{ value: 4, position: 200 }, { value: 8, position: 400 }];
    expect(controller?.model.getData().parameters).to.deep.equal(exceptParameters);
  });

  it('проверяет change handle 2', () => {
    const eStart = jQuery.Event('mousedown');
    const eMove = jQuery.Event('mousemove', { pageY: 190, pageX: 190 });
    const handle2 = $slider?.find('.js-meta-slider__handle')[1];
    if (handle2) {
      $(handle2).triggerHandler(eStart);
      $(document).triggerHandler(eMove);
    }
    const exceptParameters = [{ value: 2, position: 100 }, { value: 4, position: 200 }];
    expect(controller?.model.getData().parameters).to.deep.equal(exceptParameters);
  });
});

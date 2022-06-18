import { expect } from 'chai';
import { testOptions, testPositions } from '../defaults';

import Controller from './Controller';
import IController from './interface';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(
  `<!DOCTYPE html>
<head></head>
<body>
  <div class='body__slider js-body__slider'></div>  
</body>`,
);
global.window = dom.window;
const { document } = dom.window;
global.document = document;

describe('Controller', () => {
  let $rootEl: JQuery<HTMLElement>;
  let $slider: JQuery<HTMLElement> | null;
  let controller: IController | null;
  let $scale: JQuery<HTMLElement> | null;
  let $track: JQuery<HTMLElement> | null;
  let $handle: JQuery<HTMLElement> | null;

  before(() => {
    $rootEl = $(document).find('.js-body__slider');
  });

  beforeEach(() => {
    controller = new Controller($rootEl, {
      min: 0,
      max: 10,
      step: 1,
      from: 2,
      to: 8,
      isVertical: false,
      hasTip: true,
      withRange: true,
    });
    controller.model.init(testPositions);
    $slider = $rootEl.find('.js-meta-slider');
    $track = $rootEl.find('.js-meta-slider__track');
    $scale = $rootEl.find('.js-meta-slider__scale');
    $handle = $rootEl.find('.js-meta-slider__handle');
  });

  afterEach(() => {
    controller = null;
    $rootEl.empty();
  });

  it('устанавливает slider', () => {
    expect($slider?.length).to.equal(1);
  });

  it('устанавливает track', () => {
    expect($track?.length).to.equal(1);
  });

  it('проверяет change handle', () => {
    const eStart = jQuery.Event('mousedown');
    const eMove = jQuery.Event('mousemove', { pageY: 215, pageX: 215 });
    const eEnd = jQuery.Event('mouseup');
    const handle2 = $slider?.find('.js-meta-slider__handle')[1];
    if (handle2) {
      $(handle2).triggerHandler(eStart);
      $(document).triggerHandler(eMove);
      $(document).triggerHandler(eEnd);
      expect($(handle2).css('left')).to.deep.equal('215px');
    }
  });

  it('проверяет click scale', () => {
    const eClick = jQuery.Event('click', { target: { dataset: { value: 3 } } });
    $scale?.triggerHandler(eClick);
    const expectedConfig = {
      min: 0,
      max: 10,
      step: 1,
      from: 3,
      to: 8,
      isVertical: false,
      hasTip: true,
      withRange: true,
      fromPosition: 150,
      toPosition: 400,
    };
    expect(controller?.model.getConfig()).to.deep.equal(expectedConfig);
  });

  it('проверяет опции', () => {
    controller?.setOptions({
      min: -10,
      max: 15,
      step: 2,
      to: 12,
    });
    const expectedOptions = {
      min: -10,
      max: 15,
      step: 2,
      from: 2,
      to: 12,
      withRange: true,
      hasTip: true,
      isVertical: false,
    };
    expect(controller?.getOptions()).to.deep.equal(expectedOptions);
  });

  it('changeParameters', () => {
    controller?.view.observer.notify('moveHandle', {
      key: 'from',
      position: 57,
    });
    const expectedConfig = {
      min: 0,
      max: 10,
      step: 1,
      from: 1,
      to: 8,
      isVertical: false,
      hasTip: true,
      withRange: true,
      fromPosition: 50,
      toPosition: 400,
    };
    expect(controller?.model.getConfig()).to.deep.equal(expectedConfig);
  });
});

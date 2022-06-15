import { expect } from 'chai';
import { testConfig, testPositions } from '../defaults';
import { IPositions, IOptions } from '../interfaces/interfaces';

import Controller from './Controller';
import IController from './interface';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<head></head>
<body>
  <div class='body__slider js-body__slider'></div>  
</body>`, { url: 'http://localhost' });
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
  let expectedpositions: IPositions[];

  before(() => {
    $rootEl = $(document).find('.js-body__slider');
    $rootEl.css('width', '500');
    $rootEl.css('height', '400');
    $rootEl.css('top', '0');
    $rootEl.css('left', '0');
    options = testConfig;
    expectedpositions = testPositions;
  });

  beforeEach(() => {
    controller = new Controller($rootEl, options);
    $slider = $rootEl.find('.js-meta-slider');
    $track = $rootEl.find('.js-meta-slider__track');
    $scale = $rootEl.find('.js-meta-slider__scale');
    $handle = $rootEl.find('.js-meta-slider__handle');
    $track.css('width', '500');
    controller.view.changeConfig(controller.model.getConfig());
    controller.model.init(expectedpositions);
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

  it('проверяет change and correct handles position', () => {
    controller?.model.changeParameter({
      key: 1,
      position: 30,
    });
    const config = controller?.model.getConfig();
    expect(config?.from).to.equal(2);
    expect(config?.fromPosition).to.equal(100);
    expect(config?.to).to.equal(1);
    expect(config?.toPosition).to.equal(50);
    const eStart = jQuery.Event('mousedown');
    const eEnd = jQuery.Event('mouseup');
    const handle1 = $slider?.find('.js-meta-slider__handle')[0];
    if (handle1) {
      $(handle1).triggerHandler(eStart);
      $(document).triggerHandler(eEnd);
    }
    const correctConfig = controller?.model.getConfig();
    expect(correctConfig?.from).to.equal(1);
    expect(correctConfig?.fromPosition).to.equal(50);
    expect(correctConfig?.to).to.equal(2);
    expect(correctConfig?.toPosition).to.equal(100);
  });

  it('проверяет change handle 1', () => {
    const eStart = jQuery.Event('mousedown');
    const eMove = jQuery.Event('mousemove', { pageY: 210, pageX: 210 });
    const handle1 = $slider?.find('.js-meta-slider__handle')[0];
    if (handle1) {
      $(handle1).triggerHandler(eStart);
      $(document).triggerHandler(eMove);
      expect($(handle1).css('left')).to.deep.equal('190px');
    }
  });

  it('проверяет change handle 2', () => {
    const eStart = jQuery.Event('mousedown');
    const eMove = jQuery.Event('mousemove', { pageY: 190, pageX: 190 });
    const handle2 = $slider?.find('.js-meta-slider__handle')[1];
    if (handle2) {
      $(handle2).triggerHandler(eStart);
      $(document).triggerHandler(eMove);
      expect($(handle2).css('left')).to.deep.equal('190px');
    }
  });

  it('проверяет опции', () => {
    controller?.setOptions({
      min: -10, max: 15, step: 2, to: 12,
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
});

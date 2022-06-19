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

  it('check setOptions', () => {
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

  it('check changeParameters', () => {
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

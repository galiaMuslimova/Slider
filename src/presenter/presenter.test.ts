import { expect } from 'chai';
import sinon from 'sinon';
import { testOptions, testPositions } from '../defaults';
import IView from '../view/interface';

import Presenter from './Presenter';
import IPresenter from './interface';

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

describe('Presenter', () => {
  let $rootEl: JQuery<HTMLElement>;
  let $slider: JQuery<HTMLElement> | null;
  let presenter: IPresenter | null;
  let $scale: JQuery<HTMLElement> | null;
  let $track: JQuery<HTMLElement> | null;
  let $handle: JQuery<HTMLElement> | null;
  let stub: sinon.SinonStub;

  before(() => {
    $rootEl = $(document).find('.js-body__slider');
  });

  beforeEach(() => {
    presenter = new Presenter($rootEl, {
      min: 0,
      max: 10,
      step: 1,
      from: 2,
      to: 8,
      isVertical: false,
      hasTip: true,
      withRange: true,
    });
    stub = sinon.stub(presenter?.view as IView, 'initTrackParameters');
    presenter.model.init(testPositions);
    $slider = $rootEl.find('.js-meta-slider');
    $track = $rootEl.find('.js-meta-slider__track');
    $scale = $rootEl.find('.js-meta-slider__scale');
    $handle = $rootEl.find('.js-meta-slider__handle');
  });

  afterEach(() => {
    presenter = null;
    $rootEl.empty();
  });

  it('check setOptions', () => {
    presenter?.setOptions({
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
    expect(presenter?.getOptions()).to.deep.equal(expectedOptions);
  });

  it('check changeParameters', () => {
    presenter?.view.observer.notify('moveHandle', {
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
    expect(presenter?.model.getConfig()).to.deep.equal(expectedConfig);
  });

  it('check correctParameters', () => {
    presenter?.model.changeParameter({ key: 'from', position: 300 });
    presenter?.model.changeParameter({ key: 'to', position: 200 });
    const expectedConfig = {
      min: 0,
      max: 10,
      step: 1,
      from: 6,
      to: 4,
      isVertical: false,
      hasTip: true,
      withRange: true,
      fromPosition: 300,
      toPosition: 200,
    };
    expect(presenter?.model.getConfig()).to.deep.equal(expectedConfig);
    presenter?.view.observer.notify('moveEnd', 0);
    const correctedConfig = {
      min: 0,
      max: 10,
      step: 1,
      from: 4,
      to: 6,
      isVertical: false,
      hasTip: true,
      withRange: true,
      fromPosition: 200,
      toPosition: 300,
    };
    expect(presenter?.model.getConfig()).to.deep.equal(correctedConfig);
  });
});

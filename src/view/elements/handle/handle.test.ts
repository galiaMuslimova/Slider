import { expect } from 'chai';
import sinon from 'sinon';
import { testConfig } from '../../../defaults';

import Handle from './Handle';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='meta-slider js-meta-slider'></div>
</body>`);
global.window = dom.window;

const { document } = dom.window;
global.document = document;

describe('Handle', () => {
  let $slider: JQuery<HTMLElement>;
  let $track: JQuery<HTMLElement>;
  let handleClass: Handle | null;
  let $handle: JQuery<HTMLElement>;
  let spy: sinon.SinonSpy;

  before(() => {
    $slider = $(document).find('.js-meta-slider');
    $track = jQuery('<div>', {
      class: 'meta-slider__track js-meta-slider__track',
    });
    $track.appendTo($slider);
  });

  beforeEach(() => {
    handleClass = new Handle($track, testConfig);
    handleClass.setTrackParameters({ trackStart: 10, trackWidth: 1000 });
    $handle = $track.find('.js-meta-slider__handle');
    spy = sinon.spy(handleClass.observer, 'notify');
  });

  afterEach(() => {
    handleClass = null;
    $handle.remove();
  });

  it('check creating handle element', () => {
    expect($handle.length).to.equal(1);
  });

  it('check moveHandle', () => {
    handleClass?.moveHandle(10, 100);
    expect(handleClass?.getElement().css('left')).to.equal('90px');
  });

  it('check changing isVertical (false)', () => {
    handleClass?.setVertical(true);
    handleClass?.moveHandle(10, 100);
    expect(handleClass?.getElement().css('top')).to.equal('90px');
  });

  it('check changing isVertical (true)', () => {
    handleClass?.setVertical(false);
    handleClass?.moveHandle(10, 150);
    expect(handleClass?.getElement().css('left')).to.equal('140px');
  });

  it('check removing tip', () => {
    handleClass?.toggleTip(false);
    const $tip = handleClass?.getElement().find('.js-meta-slider__tip');
    expect($tip?.length).to.equal(0);
  });

  it('check adding tip', () => {
    handleClass?.toggleTip(true);
    const $tip = handleClass?.getElement().find('.js-meta-slider__tip');
    expect($tip?.length).to.equal(1);
  });

  it('check handleDragStart', () => {
    expect(Handle.handleDragStart()).to.equal(false);
  });

  it('check handle mouse move by event', () => {
    const eStart = $.Event('mousedown');
    const eMove = $.Event('mousemove', { pageY: 215, pageX: 215 });
    const eEnd = $.Event('mouseup');
    $handle.triggerHandler(eStart);
    $(document).triggerHandler(eMove);
    expect(spy.calledOnce).to.equal(true);

    $(document).triggerHandler(eEnd);
    sinon.assert.called(spy);
    expect(spy.calledTwice).to.equal(true);
  });
});

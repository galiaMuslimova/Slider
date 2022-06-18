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
  let handleClass: Handle;
  let $handle: JQuery<HTMLElement>;
  let buttonClickSuccessSpy: sinon.SinonSpy;

  before(() => {
    $slider = $(document).find('.js-meta-slider');
    $track = jQuery('<div>', {
      class: 'meta-slider__track js-meta-slider__track',
    });
    $track.appendTo($slider);
    handleClass = new Handle($track, testConfig);
    handleClass.setTrackParameters({ trackStart: 10, trackWidth: 1000 });
    $handle = $track.find('.js-meta-slider__handle');
  });

  beforeEach(() => {
    buttonClickSuccessSpy = sinon.spy();
    $(document).on('buttonClickSucess', buttonClickSuccessSpy);
  });

  it('проверить создание элемента handle', () => {
    expect($handle.length).to.equal(1);
  });

  it('проверить установку позиции', () => {
    handleClass.moveHandle(10, 100);
    expect(handleClass.getElement().css('left')).to.equal('90px');
  });

  it('проверить изменение isVertical', () => {
    handleClass.setVertical(true);
    handleClass.moveHandle(10, 100);
    expect(handleClass.getElement().css('top')).to.equal('90px');
  });

  it('проверить удаление элемента hasTip', () => {
    handleClass.toggleTip(false);
    const $hasTip = handleClass.getElement().find('.js-meta-slider__tip');
    expect($hasTip.length).to.equal(0);
  });

  it('проверить создание элемента hasTip', () => {
    handleClass.toggleTip(true);
    const $hasTip = handleClass.getElement().find('.js-meta-slider__tip');
    expect($hasTip.length).to.equal(1);
  });

  it('проверить handleDragStart', () => {
    expect(Handle.handleDragStart()).to.equal(false);
  });

  it('check handle move', () => {
    const eStart = $.Event('mousedown');
    const eMove = $.Event('mousemove', { pageY: 215, pageX: 215 });
    const eEnd = $.Event('mouseup');
    const spy = sinon.spy(handleClass.observer, 'notify');
    $handle.triggerHandler(eStart);
    $(document).triggerHandler(eMove);
    expect(spy.calledOnce).to.equal(true);
    $(document).triggerHandler(eEnd);
    sinon.assert.called(spy);
    expect(spy.calledTwice).to.equal(true);
  });
});

import { expect } from 'chai';

import Handle from './Handle';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='meta-slider js-meta-slider'></div>
</body>`);
global.window = dom.window;

const { document } = dom.window;

describe('Handle', () => {
  let $slider: JQuery<HTMLElement>;
  let $track: JQuery<HTMLElement>;
  let handleClass: Handle;

  before(() => {
    $slider = $(document).find('.js-meta-slider');
    $track = jQuery('<div>', {
      class: 'meta-slider__track js-meta-slider__track',
    });
    $track.appendTo($slider);
    handleClass = new Handle($track);
    handleClass.setTrackParameters({ trackStart: 0, trackWidth: 300 });
  });

  it('проверить создание элемента handle', () => {
    const $handle = $track.find('.js-meta-slider__handle');
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
});

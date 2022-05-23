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
    $track = jQuery('<div>', { class: 'meta-slider__track js-meta-slider__track' });
    $track.appendTo($slider);
    handleClass = new Handle();
    handleClass.init($track);
  });

  it('проверить создание элемента handle', () => {
    const $handle = $track.find('.js-meta-slider__handle');
    expect($handle.length).to.equal(1);
  });

  it('проверить установку vertical', () => {
    handleClass.setVertical(true);
    expect(handleClass.getVertical()).to.equal(true);
    handleClass.setVertical(false);
    expect(handleClass.getVertical()).to.equal(false);
  });

  it('проверить установку позиции', () => {
    handleClass.moveHandle({ value: 10, position: 100 });
    expect(handleClass.getElement().css('left')).to.equal('90px');
  });

  it('проверить удаление элемента tip', () => {
    handleClass.toggleTip(false);
    const $tip = handleClass.getElement().find('.js-meta-slider__tip');
    expect($tip.length).to.equal(0);
  });

  it('проверить создание элемента tip', () => {
    handleClass.toggleTip(true);
    const $tip = handleClass.getElement().find('.js-meta-slider__tip');
    expect($tip.length).to.equal(1);
  });

  it('проверить handleDragStart', () => {
    expect(Handle.handleDragStart()).to.equal(false);
  });
});

import { expect } from 'chai';

import Handle from './Handle';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='testSlider'>
    <div class='meta-slider'></div>
  </div>
</body>`);
global.window = dom.window;

const { document } = dom.window;

describe('Handle', () => {
  let $slider: JQuery<HTMLElement>;
  let $track: JQuery<HTMLElement>;
  let handleClass: Handle;

  before(() => {
    $slider = $(document).find('.meta-slider');
    $track = jQuery('<div>', {
      class: 'meta-slider__track',
    });
  });

  beforeEach(() => {
    $track = jQuery('<div>', {
      class: 'meta-slider__track',
    });
    $track.appendTo($slider);
  });

  afterEach(() => {
    $track.remove();
  });

  it('проверить позицию при handle = 1 при vertical=false', () => {
    handleClass = new Handle($slider);
    handleClass.init(false, false);
    handleClass.correctHandlesByRange(false);
    handleClass.moveHandles([{ value: 10, position: 100 }]);
    const $handle = $slider.find('.meta-slider__handle');
    $handle.each((index, element) => {
      expect($(element).css('left')).to.equal('90px');
    });
  });

  it('проверить позицию при handle = 1 при vertical=true', () => {
    handleClass = new Handle($slider);
    handleClass.init(true, false);
    handleClass.correctHandlesByRange(false);
    handleClass.moveHandles([{ value: 15, position: 150 }]);
    const $handle = $slider.find('.meta-slider__handle');
    $handle.each((index, element) => {
      expect($(element).css('top')).to.equal('140px');
    });
  });

  it('проверить позицию при handle = 2 при vertical=false', () => {
    handleClass = new Handle($slider);
    handleClass.init(false, true);
    handleClass.correctHandlesByRange(true);
    const parameters = [{ value: 1, position: 10 }, { value: 2, position: 20 }];
    handleClass.moveHandles(parameters);
    const $handle = $slider.find('.meta-slider__handle');
    $handle.each((index, element) => {
      expect($(element).css('left')).to.equal(`${parameters[index].position - 10}px`);
    });
  });

  it('проверить позицию при handle = 2 при vertical=true', () => {
    handleClass = new Handle($slider);
    handleClass.init(true, true);
    handleClass.correctHandlesByRange(true);
    const parameters = [{ value: 5, position: 50 }, { value: 20, position: 200 }];
    handleClass.moveHandles(parameters);
    const $handle = $slider.find('.meta-slider__handle');
    $handle.each((index, element) => {
      expect($(element).css('top')).to.equal(`${parameters[index].position - 10}px`);
    });
  });

  it('проверить изменение количества handles', () => {
    handleClass = new Handle($slider);
    handleClass.init(true, false);
    const $handle = $slider.find('.meta-slider__handle');
    expect($handle.length).to.equal(1);
  });

  it('проверить handleDragStart', () => {
    handleClass = new Handle($slider);
    handleClass.init(true, false);
    Handle.handleDragStart();
    expect(Handle.handleDragStart()).to.equal(false);
  });

  it('проверить изменение vertical', () => {
    handleClass = new Handle($slider);
    handleClass.init(false, true);
    handleClass.setVertical(false);
    expect(handleClass.getVertical()).to.equal(false);
  });

  it('проверить изменение handles', () => {
    handleClass = new Handle($slider);
    handleClass.init(true, false);
    handleClass.correctHandlesByRange(false);
    expect(handleClass.getHandles().length).to.equal(1);
  });

  it('проверить изменение handles', () => {
    handleClass = new Handle($slider);
    handleClass.init(true, false);
    handleClass.correctHandlesByRange(true);
    expect(handleClass.getHandles().length).to.equal(2);
  });
});

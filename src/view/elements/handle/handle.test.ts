import { expect } from 'chai';

import Handle from './Handle';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body><div class=\'testSlider\'><div class=\'meta-slider\'></div></div></body>');
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
    handleClass = new Handle($slider, false);
    handleClass.correctHandlesByRange(false);
    handleClass.moveHandles([100]);
    const $handle = $slider.find('.meta-slider__handle');
    $handle.each((index, element) => {
      expect($(element).css('left')).to.equal('90px');
    });
  });

  it('проверить позицию при handle = 1 при vertical=true', () => {
    handleClass = new Handle($slider, true);
    handleClass.correctHandlesByRange(false);
    handleClass.moveHandles([150]);
    const $handle = $slider.find('.meta-slider__handle');
    $handle.each((index, element) => {
      expect($(element).css('top')).to.equal('140px');
    });
  });

  it('проверить позицию при handle = 2 при vertical=false', () => {
    handleClass = new Handle($slider, false);
    handleClass.correctHandlesByRange(true);
    const positions = [-10, 10];
    handleClass.moveHandles(positions);
    const $handle = $slider.find('.meta-slider__handle');
    $handle.each((index, element) => {
      expect($(element).css('left')).to.equal(`${positions[index] - 10}px`);
    });
  });

  it('проверить позицию при handle = 2 при vertical=true', () => {
    handleClass = new Handle($slider, true);
    handleClass.correctHandlesByRange(true);
    const positions = [50, 200];
    handleClass.moveHandles(positions);
    const $handle = $slider.find('.meta-slider__handle');
    $handle.each((index, element) => {
      expect($(element).css('top')).to.equal(`${positions[index] - 10}px`);
    });
  });
});

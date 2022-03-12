import { expect } from 'chai';

import Track from './track';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body><div class=\'testSlider\'><div class=\'meta-slider\'><div class=\'meta-slider__slider\'></div></div></body>');
global.window = dom.window;

const { document } = dom.window;

describe('Track', () => {
  let $slider: JQuery<HTMLElement>;
  let trackClass: Track;

  before(() => {
    $slider = $(document).find('.meta-slider__slider');
    $slider.css('width', '500');
    $slider.css('left', '10');
  });

  it('проверяет параметры', () => {
    trackClass = new Track($slider, false);
    expect(trackClass.position.top).to.deep.equal(0);
  });
});

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
  });

  it('проверяет параметры', () => {
    $slider.css('width', '500');
    trackClass = new Track($slider, false);
    const { $track } = trackClass;
    expect(trackClass.getTrackParameters()).to.deep.equal({ trackStart: 50, trackWidth: 500 });
  });

  it('проверяет параметры', () => {
    $slider.css('width', '600');
    trackClass = new Track($slider, false);
    const { $track } = trackClass;
    expect(trackClass.getTrackParameters()).to.deep.equal({ trackStart: 30, trackWidth: 600 });
  });
});

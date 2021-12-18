import { expect } from 'chai';
import Track from './track';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body><div class=\'testSlider\'><div class=\'meta-slider\'><div class=\'meta-slider__slider\'></div></div></body>');
global.window = dom.window;
global.$ = require('jquery');
global.jQuery = require('jquery');

const { document } = dom.window;

describe('Track', () => {
  let $slider: JQuery<HTMLElement>;
  let trackClass: Track;

  before(() => {
    $slider = $(document).find('.meta-slider__slider');
    trackClass = new Track($slider);
    const { $track } = trackClass;
    trackClass.position = { top: 30, left: 50 };
    $track.css('height', '600');
    $track.css('width', '500');
  });

  it('проверяет параметры', () => {
    expect(trackClass.getTrackParameters(false)).to.deep.equal({ trackStart: 50, trackWidth: 500 });
  });

  it('проверяет параметры', () => {
    expect(trackClass.getTrackParameters(true)).to.deep.equal({ trackStart: 30, trackWidth: 600 });
  });
});

import { expect } from 'chai';
import Track from './track';

const JSDOM = require('jsdom').JSDOM;
const dom = new JSDOM(`<!DOCTYPE html><body><div class='testSlider'><div class='meta-slider'><div class='meta-slider__slider'></div></div></body>`);
global.window = dom.window;
global.$ = global.jQuery = require('jquery');
const document = dom.window.document;

describe('Track', () => {
  let slider: JQuery<HTMLElement>;
  let trackClass: Track;
  let track: JQuery<HTMLElement>;

  before(function () {
    slider = $(document).find('.meta-slider__slider');
    trackClass = new Track(slider);
    track = trackClass.track;
  })

  it('проверяет создание трека', () => {
    expect(track).to.exist;
  });
})
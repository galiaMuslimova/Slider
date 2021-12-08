import { expect } from 'chai';
import Track from './track';

const JSDOM = require('jsdom').JSDOM;
const dom = new JSDOM(`<!DOCTYPE html><body><div class='testSlider'><div class='meta-slider'></div></div></body>`);
global.window = dom.window;
global.$ = global.jQuery = require('jquery');
const document = dom.window.document;

describe('Track', () => {
  let slider: JQuery<HTMLElement>;

  beforeEach(function () {
    slider = $(document).find('.meta-slider');
  })

  it('проверяет создание трека', () => {
    let trackClass = new Track(slider);
    let track = trackClass.track;
    expect(track).to.exist;
  });
})
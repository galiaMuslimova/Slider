import { expect } from 'chai';

import Track from './track';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='testSlider'>
    <div class='meta-slider'></div>
  </div>
</body>`);
global.window = dom.window;

const { document } = dom.window;

describe('Track', () => {
  let $slider: JQuery<HTMLElement>;
  let trackClass: Track;
  let $track: JQuery<HTMLElement>;

  before(() => {
    $slider = $(document).find('.meta-slider');
    trackClass = new Track($slider, false);
    $track = trackClass.$track;
    $track.css('width', '500');
    $track.css('height', '400');
    trackClass.position.top = 20;
    trackClass.position.left = 10;
  });

  it('устанавливает корневой элемент', () => {
    expect(trackClass.$slider).to.deep.equal($slider);
  });

  it('проверяет ширину трэка для вертикального', () => {
    trackClass.setVertical(true);
    const trackParameters = trackClass.getTrackParameters();
    expect(trackParameters.trackWidth).to.equal(400);
  });

  it('проверяет ширину трэка для горизонтального', () => {
    trackClass.setVertical(false);
    const trackParameters = trackClass.getTrackParameters();
    expect(trackParameters.trackWidth).to.equal(500);
  });

  it('проверяет начало трэка для вертикального', () => {
    trackClass.setVertical(true);
    const trackParameters = trackClass.getTrackParameters();
    expect(trackParameters.trackStart).to.equal(20);
  });

  it('проверяет начало трэка для горизонтального', () => {
    trackClass.setVertical(false);
    expect(trackClass.getTrackParameters().trackStart).to.equal(10);
  });
});

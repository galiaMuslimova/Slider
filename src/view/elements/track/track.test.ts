import { expect } from 'chai';

import Track from './track';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='meta-slider js-meta-slider'></div>
</body>`);
global.window = dom.window;

const { document } = dom.window;

describe('Track', () => {
  let $slider: JQuery<HTMLElement>;
  let trackClass: Track;
  let $track: JQuery<HTMLElement>;

  before(() => {
    $slider = $(document).find('.js-meta-slider');
    trackClass = new Track();
    trackClass.init($slider);
    $track = $slider.find('.js-meta-slider__track');
    $track.css('width', '500');
    $track.css('height', '400');
    $track.css('top', '20');
    $track.css('left', '10');
  });

  it('проверяет создание элемента track', () => {
    expect($track.length).to.equal(1);
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
});

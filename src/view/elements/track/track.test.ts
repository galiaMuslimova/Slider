import { expect } from 'chai';
import { testConfig } from '../../../defaults';

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
    trackClass = new Track($slider, testConfig);
    $track = trackClass.getElement();
  });

  it('проверяет создание элемента track', () => {
    expect($track.length).to.equal(1);
  });
});

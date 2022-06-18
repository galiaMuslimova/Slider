import { expect } from 'chai';
import sinon from 'sinon';
import { testConfig } from '../../../defaults';

import Track from './Track';

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

  it('check track click', () => {
    const eClick = $.Event('click', { pageY: 215, pageX: 215 });
    const spy = sinon.spy(trackClass.observer, 'notify');
    $track.triggerHandler(eClick);
    expect(spy.calledOnce).to.equal(true);
  });
});

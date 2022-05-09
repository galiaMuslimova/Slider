import { expect } from 'chai';

import Interval from './Interval';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='meta-slider js-meta-slider'></div>
</body>`);
global.window = dom.window;

const { document } = dom.window;

describe('Interval', () => {
  let $slider: JQuery<HTMLElement>;
  let $track: JQuery<HTMLElement>;
  let intervalClass: Interval;
  let $interval: JQuery<HTMLElement>;

  before(() => {
    $slider = $(document).find('.js-meta-slider');
    $track = jQuery('<div>', { class: 'meta-slider__track js-meta-slider__track' });
    $track.appendTo($slider);
    intervalClass = new Interval();
    intervalClass.init($track);
    $interval = $track.find('.js-meta-slider__interval');
  });

  it('проверить создание элемента interval', () => {
    expect($interval.length).to.equal(1);
  });

  it('проверяет создание интервала при range=true, vertical=false', () => {
    intervalClass.moveInterval([{ value: 100, position: 100 }, { value: 200, position: 200 }]);
    expect($interval.css('width')).to.eq('78px');
    expect($interval.css('left')).to.eq('110px');
  });

  it('проверяет создание интервала при range=false, vertical=false', () => {
    intervalClass.moveInterval([{ value: 10, position: 100 }]);
    expect($interval.css('width')).to.eq('88px');
    expect($interval.css('left')).to.eq('0px');
  });

  it('проверяет создание интервала при range=false, vertical=false', () => {
    intervalClass.moveInterval([{ value: 120, position: 120 }]);
    expect($interval.css('width')).to.eq('108px');
    expect($interval.css('left')).to.eq('0px');
  });

  it('проверяет создание интервала при range=true, vertical=true', () => {
    intervalClass.setVertical(true);
    $interval = $track.find('.js-meta-slider__interval');
    intervalClass.moveInterval([{ value: 120, position: 120 }, { value: 230, position: 230 }]);
    expect($interval.css('height')).to.eq('88px');
    expect($interval.css('top')).to.eq('130px');
  });

  it('проверяет создание интервала при range=false, vertical=true', () => {
    intervalClass.moveInterval([{ value: 155, position: 155 }]);
    expect($interval.css('height')).to.eq('143px');
    expect($interval.css('top')).to.eq('0px');
  });
});

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
    intervalClass = new Interval($track);
    $interval = $slider.find('.js-meta-slider__interval');
  });

  it('проверить создание элемента interval', () => {
    expect($interval.length).to.equal(1);
  });

  it('проверяет создание интервала при withRange=true, isVertical=false', () => {
    intervalClass.moveInterval(100, 200);
    expect($interval.css('width')).to.eq('78px');
    expect($interval.css('left')).to.eq('110px');
  });

  it('проверяет создание интервала при withRange=false, isVertical=false', () => {
    intervalClass.setRange(false);
    intervalClass.moveInterval(100, 200);
    expect($interval.css('width')).to.eq('88px');
    expect($interval.css('left')).to.eq('0px');
  });

  it('проверяет создание интервала при withRange=false, isVertical=false', () => {
    intervalClass.setRange(false);
    intervalClass.setVertical(false);
    intervalClass.moveInterval(120, 200);
    expect($interval.css('width')).to.eq('108px');
    expect($interval.css('left')).to.eq('0px');
  });

  it('проверяет создание интервала при withRange=true, isVertical=true', () => {
    intervalClass.setVertical(true);
    intervalClass.setRange(true);
    $interval = $track.find('.js-meta-slider__interval');
    intervalClass.moveInterval(120, 230);
    expect($interval.css('height')).to.eq('88px');
    expect($interval.css('top')).to.eq('130px');
  });

  it('проверяет создание интервала при withRange=false, isVertical=true', () => {
    intervalClass.setRange(false);
    intervalClass.moveInterval(155, 200);
    expect($interval.css('height')).to.eq('143px');
    expect($interval.css('top')).to.eq('0px');
  });
});

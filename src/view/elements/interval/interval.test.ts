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
    intervalClass = new Interval($slider);
    $interval = $slider.find('.js-meta-slider__interval');
  });

  it('проверить создание элемента interval', () => {
    expect($interval.length).to.equal(1);
  });

  it('проверяет создание интервала при range=true, vertical=false', () => {
    const parameters = { from: { value: 100, position: 100 }, to: { value: 200, position: 200 } };
    intervalClass.moveInterval(parameters);
    expect($interval.css('width')).to.eq('78px');
    expect($interval.css('left')).to.eq('110px');
  });

  it('проверяет создание интервала при range=false, vertical=false', () => {
    intervalClass.setRange(false);
    intervalClass.moveInterval({ from: { value: 10, position: 100 } });
    expect($interval.css('width')).to.eq('88px');
    expect($interval.css('left')).to.eq('0px');
  });

  it('проверяет создание интервала при range=false, vertical=false', () => {
    intervalClass.setRange(false);
    intervalClass.setVertical(false);
    intervalClass.moveInterval({ from: { value: 120, position: 120 } });
    expect($interval.css('width')).to.eq('108px');
    expect($interval.css('left')).to.eq('0px');
  });

  it('проверяет создание интервала при range=true, vertical=true', () => {
    intervalClass.setVertical(true);
    intervalClass.setRange(true);
    $interval = $track.find('.js-meta-slider__interval');
    const parameters = { from: { value: 120, position: 120 }, to: { value: 230, position: 230 } };
    intervalClass.moveInterval(parameters);
    expect($interval.css('height')).to.eq('88px');
    expect($interval.css('top')).to.eq('130px');
  });

  it('проверяет создание интервала при range=false, vertical=true', () => {
    intervalClass.setRange(false);
    intervalClass.moveInterval({ from: { value: 155, position: 155 } });
    expect($interval.css('height')).to.eq('143px');
    expect($interval.css('top')).to.eq('0px');
  });
});

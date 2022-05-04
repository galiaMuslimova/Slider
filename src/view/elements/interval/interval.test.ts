import { expect } from 'chai';

import Interval from './Interval';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='testSlider'>
    <div class='meta-slider js-meta-slider'></div>
  </div>
</body>`);
global.window = dom.window;

const { document } = dom.window;

describe('Interval', () => {
  let $slider: JQuery<HTMLElement>;
  let intervalClass: Interval;
  let $interval: JQuery<HTMLElement>;

  before(() => {
    $slider = $(document).find('.js-meta-slider');
    jQuery('<div>', {
      class: 'meta-slider__track js-meta-slider__track',
    }).appendTo($slider);
    intervalClass = new Interval($slider);
    $interval = intervalClass.$interval;
    intervalClass.correctInterval();
  });

  it('проверяет создание интервала при range=true, vertical=false', () => {
    intervalClass.changeVertical(false);
    intervalClass.moveInterval([{ value: 100, position: 100 }, { value: 200, position: 200 }]);
    expect($interval.css('width')).to.eq('78px');
    expect($interval.css('left')).to.eq('110px');
  });

  it('проверяет создание интервала при range=false, vertical=false', () => {
    intervalClass.changeVertical(false);
    intervalClass.moveInterval([{ value: 10, position: 100 }]);
    expect($interval.css('width')).to.eq('88px');
    expect($interval.css('left')).to.eq('0px');
  });

  it('проверяет создание интервала при range=false, vertical=false', () => {
    intervalClass.changeVertical(false);
    intervalClass.moveInterval([{ value: 120, position: 120 }]);
    expect($interval.css('width')).to.eq('108px');
    expect($interval.css('left')).to.eq('0px');
  });

  it('проверяет создание интервала при range=true, vertical=true', () => {
    intervalClass.changeVertical(true);
    intervalClass.moveInterval([{ value: 120, position: 120 }, { value: 230, position: 230 }]);
    expect($interval.css('height')).to.eq('88px');
    expect($interval.css('top')).to.eq('130px');
  });

  it('проверяет создание интервала при range=false, vertical=true', () => {
    intervalClass.changeVertical(true);
    intervalClass.moveInterval([{ value: 155, position: 155 }]);
    expect($interval.css('height')).to.eq('143px');
    expect($interval.css('top')).to.eq('0px');
  });
});

import { expect } from 'chai';
import Interval from './interval';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body><div class=\'testSlider\'><div class=\'meta-slider\'><div class=\'meta-slider__slider\'></div></div></body>');
global.window = dom.window;
global.$ = require('jquery');
global.jQuery = require('jquery');

const { document } = dom.window;

describe('Interval', () => {
  let $slider: JQuery<HTMLElement>;
  let intervalClass: Interval;
  let $interval: JQuery<HTMLElement>;

  before(() => {
    $slider = $(document).find('.meta-slider__slider');
    jQuery('<div>', {
      class: 'meta-slider__track',
    }).appendTo($slider);
    intervalClass = new Interval($slider);
    $interval = intervalClass.$interval;
  });

  it('проверяет создание интервала при range=true, vertical=false', () => {
    intervalClass.moveInterval([100, 200], false);
    expect($interval.css('width')).to.eq('78px');
    expect($interval.css('left')).to.eq('110px');
  });

  it('проверяет создание интервала при range=false, vertical=false маленькое значение handlex', () => {
    intervalClass.moveInterval([10], false);
    expect($interval.css('width')).to.eq('0px');
    expect($interval.css('left')).to.eq('0px');
  });

  it('проверяет создание интервала при range=false, vertical=false', () => {
    intervalClass.moveInterval([120], false);
    expect($interval.css('width')).to.eq('108px');
    expect($interval.css('left')).to.eq('0px');
  });

  it('проверяет создание интервала при range=true, vertical=true', () => {
    intervalClass.moveInterval([120, 230], true);
    expect($interval.css('height')).to.eq('88px');
    expect($interval.css('top')).to.eq('130px');
  });

  it('проверяет создание интервала при range=false, vertical=true', () => {
    intervalClass.moveInterval([155], true);
    expect($interval.css('height')).to.eq('143px');
    expect($interval.css('top')).to.eq('0px');
  });
});

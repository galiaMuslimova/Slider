import { expect } from 'chai';

import Handle from '../handle/Handle';
import Tip from './Tip';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body><div class=\'testSlider\'><div class=\'meta-slider\'><div class=\'meta-slider__slider\'></div></div></body>');
global.window = dom.window;

const { document } = dom.window;

describe('Tip', () => {
  let $slider: JQuery<HTMLElement>;
  let tipClass: Tip;
  let handleClass: Handle;

  before(() => {
    $slider = $(document).find('.meta-slider__slider');
    jQuery('<div>', {
      class: 'meta-slider__track',
    }).appendTo($slider);
    handleClass = new Handle($slider, false);
    handleClass.correctHandlesByRange(true);
    tipClass = new Tip($slider);
  });

  it('проверяет создание подсказок tips = 2 при handle=2', () => {
    tipClass.initTips(true);// tips true
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(2);
  });

  it('проверяет отсутствие подсказок tips = 0', () => {
    tipClass.initTips(false);// tips false
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(0);
  });

  it('проверяет отсутствие подсказок tips=0 при handle=1', () => {
    tipClass.initTips(false);// tips false
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(0);
  });

  it('меняет значения подсказок tips при tips=2', () => {
    tipClass.initTips(true);// tips true
    const values = [10, 50];
    tipClass.changeTips(values);
    const $tips = $slider.find('.meta-slider__tip');
    $tips.each((index, element) => {
      expect($(element).text()).to.eq(`${values[index]}`);
    });
  });

  it('меняет значения подсказок tips при tips=1', () => {
    tipClass.initTips(true);// tips true
    const values = [-50];
    tipClass.changeTips(values);
    const $tips = $slider.find('.meta-slider__tip');
    $tips.each((index, element) => {
      expect($(element).text()).to.eq(`${values[index]}`);
    });
  });

  it('не добавляет значения подсказок tips при tips=false', () => {
    tipClass.initTips(false);// tips false
    const values = [-50, -8];
    tipClass.changeTips(values);
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(0);
  });
});

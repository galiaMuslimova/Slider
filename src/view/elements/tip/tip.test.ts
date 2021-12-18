import { expect } from 'chai';
import Tip from './tip';
import Handle from '../handle/handle';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body><div class=\'testSlider\'><div class=\'meta-slider\'><div class=\'meta-slider__slider\'></div></div></body>');
global.window = dom.window;
global.$ = require('jquery');
global.jQuery = require('jquery');

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
    handleClass = new Handle($slider);
    tipClass = new Tip($slider);
  });

  it('проверяет создание подсказок tips = 2 при handle=2', () => {
    handleClass.initHandles(true);// range true
    tipClass.initTips(true);// tips true
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(2);
  });

  it('проверяет отсутствие подсказок tips = 0', () => {
    handleClass.initHandles(true);// range true
    tipClass.initTips(false);// tips false
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(0);
  });

  it('проверяет создание одной подсказки tips=1 при handle=1', () => {
    handleClass.initHandles(false);// range false
    tipClass.initTips(true);// tips true
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(1);
  });

  it('проверяет отсутствие подсказок tips=0 при handle=1', () => {
    handleClass.initHandles(false);// range false
    tipClass.initTips(false);// tips false
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(0);
  });

  it('меняет значения подсказок tips при tips=2', () => {
    handleClass.initHandles(true);// range true
    tipClass.initTips(true);// tips true
    const values = [10, 50];
    tipClass.changeTips(values);
    const $tips = $slider.find('.meta-slider__tip');
    $tips.each((index, element) => {
      expect($(element).text()).to.eq(`${values[index]}`);
    });
  });

  it('меняет значения подсказок tips при tips=1', () => {
    handleClass.initHandles(false);// range false
    tipClass.initTips(true);// tips true
    const values = [-50];
    tipClass.changeTips(values);
    const $tips = $slider.find('.meta-slider__tip');
    $tips.each((index, element) => {
      expect($(element).text()).to.eq(`${values[index]}`);
    });
  });

  it('не добавляет значения подсказок tips при tips=false', () => {
    handleClass.initHandles(true);// range true
    tipClass.initTips(false);// tips false
    const values = [-50, -8];
    tipClass.changeTips(values);
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(0);
  });
});

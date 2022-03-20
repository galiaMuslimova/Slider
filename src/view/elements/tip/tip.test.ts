import { expect } from 'chai';

import Handle from '../handle/Handle';
import Tip from './Tip';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='testSlider'>
    <div class='meta-slider'></div>
  </div>
</body>`);
global.window = dom.window;

const { document } = dom.window;

describe('Tip', () => {
  let $slider: JQuery<HTMLElement>;
  let tipClass: Tip;
  let handleClass: Handle;

  before(() => {
    $slider = $(document).find('.meta-slider');
    jQuery('<div>', {
      class: 'meta-slider__track',
    }).appendTo($slider);
    handleClass = new Handle($slider);
    handleClass.correctHandlesByRange(true);
    tipClass = new Tip($slider);
  });

  it('проверяет создание подсказок tips = 2 при handle=2', () => {
    tipClass.init(true);// tips true
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(2);
  });

  it('проверяет отсутствие подсказок tips = 0', () => {
    tipClass.init(false);// tips false
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(0);
  });

  it('проверяет отсутствие подсказок tips=0 при handle=1', () => {
    tipClass.init(false);// tips false
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(0);
  });

  it('меняет значения подсказок tips при tips=2', () => {
    tipClass.init(true);// tips true
    const parameters = [{ value: 10, position: 100 }, { value: 50, position: 500 }];
    tipClass.changeTips(parameters);
    const $tips = $slider.find('.meta-slider__tip');
    $tips.each((index, element) => {
      expect($(element).text()).to.eq(`${parameters[index].value}`);
    });
  });

  it('меняет значения подсказок tips при tips=1', () => {
    handleClass.correctHandlesByRange(false);
    tipClass.init(true);// tips true
    const parameters = [{ value: -50, position: 100 }];
    tipClass.changeTips(parameters);
    const $tips = $slider.find('.meta-slider__tip');
    $tips.each((index, element) => {
      expect($(element).text()).to.eq(`${parameters[index].value}`);
    });
  });

  it('не добавляет значения подсказок tips при tips=false', () => {
    tipClass.init(false);// tips false
    const parameters = [{ value: -50, position: 100 }, { value: -8, position: 150 }];
    tipClass.changeTips(parameters);
    const $tips = $slider.find('.meta-slider__tip');
    expect($tips.length).to.eq(0);
  });
});

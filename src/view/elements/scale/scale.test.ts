import { expect } from 'chai';

import Scale from './Scale';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body><div class=\'testSlider\'><div class=\'meta-slider\'></div></div></body>');
global.window = dom.window;

const { document } = dom.window;

describe('Scale', () => {
  let $slider: JQuery<HTMLElement>;
  let scaleClass: Scale;

  before(() => {
    $slider = $(document).find('.meta-slider');
    scaleClass = new Scale($slider);
  });

  it('проверить соответствие значений шкалы массиву', () => {
    const stepsArr = [
      { value: 0, x: 0 },
      { value: 2, x: 100 },
      { value: 4, x: 200 },
      { value: 8, x: 300 }];
    scaleClass.initScale(stepsArr);
    const $scale = $slider.find('.meta-slider__scale');
    const $values = $scale.find('.meta-slider__value');
    $values.each((index, element) => {
      expect($(element).text()).to.equal(`${stepsArr[index].value}`);
    });
  });

  it('проверить соответствие позиций массиву для вертикального', () => {
    const stepsArr = [
      { value: 0, x: 0 },
      { value: 2, x: 100 },
      { value: 4, x: 200 },
      { value: 8, x: 300 }];
    scaleClass.initScale(stepsArr, true);
    const $scale = $slider.find('.meta-slider__scale');
    const $values = $scale.find('.meta-slider__value');
    $values.each((index, element) => {
      expect($(element).css('top')).to.equal(`${stepsArr[index].x - 10}px`);
    });
  });

  it('проверить соответствие позиций массиву для горизонтального', () => {
    const stepsArr = [
      { value: 0, x: 0 },
      { value: 2, x: 100 },
      { value: 4, x: 200 },
      { value: 8, x: 300 }];
    scaleClass.initScale(stepsArr, false);
    const $scale = $slider.find('.meta-slider__scale');
    const $values = $scale.find('.meta-slider__value');
    $values.each((index, element) => {
      expect($(element).css('left')).to.equal(`${stepsArr[index].x - 10}px`);
    });
  });
});

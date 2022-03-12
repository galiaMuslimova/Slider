import { expect } from 'chai';

import Scale from './Scale';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='testSlider'>
    <div class='meta-slider'></div>
  </div>
</body>`);
global.window = dom.window;

const { document } = dom.window;

describe('Scale', () => {
  let $slider: JQuery<HTMLElement>;
  let scaleClass: Scale;

  before(() => {
    $slider = $(document).find('.meta-slider');
    scaleClass = new Scale($slider, false);
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
    const $lines = $scale.find('.meta-slider__line');
    $lines.each((index, element) => {
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
    const $lines = $scale.find('.meta-slider__line');
    $lines.each((index, element) => {
      expect($(element).css('left')).to.equal(`${stepsArr[index].x - 10}px`);
    });
  });

  it('проверить получение массива чисел', () => {
    const stepsArr = [
      { value: 0, x: 0 },
      { value: 2, x: 100 },
      { value: 4, x: 200 },
      { value: 8, x: 300 }];
    const scaleArr = [
      { index: 0, item: { value: 0, x: 0 } },
      { index: 1, item: { value: 2, x: 100 } },
      { index: 2, item: { value: 4, x: 200 } },
      { index: 3, item: { value: 8, x: 300 } },
    ];
    const resultArr = Scale.takeValues(stepsArr);
    expect(resultArr).to.deep.equal(scaleArr);
  });

  it('проверить получение массива чисел при больших stepsArr (больше 10 меньше 15)', () => {
    const stepsArr = [
      { value: 0, x: 0 },
      { value: 1, x: 10 },
      { value: 2, x: 20 },
      { value: 3, x: 30 },
      { value: 4, x: 40 },
      { value: 5, x: 50 },
      { value: 6, x: 60 },
      { value: 7, x: 70 },
      { value: 8, x: 80 },
      { value: 9, x: 90 },
      { value: 10, x: 100 },
      { value: 11, x: 110 }];
    const scaleArr = [
      { index: 0, item: { value: 0, x: 0 } },
      { index: 1, item: { value: 1, x: 10 } },
      { index: 2, item: { value: 2, x: 20 } },
      { index: 3, item: { value: 3, x: 30 } },
      { index: 4, item: { value: 4, x: 40 } },
      { index: 5, item: { value: 5, x: 50 } },
      { index: 6, item: { value: 6, x: 60 } },
      { index: 7, item: { value: 7, x: 70 } },
      { index: 8, item: { value: 8, x: 80 } },
      { index: 9, item: { value: 9, x: 90 } },
      { index: 10, item: { value: 10, x: 100 } },
      { index: 11, item: { value: 11, x: 110 } },
    ];
    const resultArr = Scale.takeValues(stepsArr);
    expect(resultArr).to.deep.equal(scaleArr);
  });

  it('проверить получение массива чисел при больших stepsArr (больше 15)', () => {
    const stepsArr = [
      { value: 0, x: 0 },
      { value: 1, x: 10 },
      { value: 2, x: 20 },
      { value: 3, x: 30 },
      { value: 4, x: 40 },
      { value: 5, x: 50 },
      { value: 6, x: 60 },
      { value: 7, x: 70 },
      { value: 8, x: 80 },
      { value: 9, x: 90 },
      { value: 10, x: 100 },
      { value: 11, x: 110 },
      { value: 12, x: 120 },
      { value: 13, x: 130 },
      { value: 14, x: 140 },
      { value: 15, x: 150 },
      { value: 16, x: 160 }];
    const scaleArr = [
      { index: 0, item: { value: 0, x: 0 } },
      { index: 2, item: { value: 2, x: 20 } },
      { index: 4, item: { value: 4, x: 40 } },
      { index: 6, item: { value: 6, x: 60 } },
      { index: 8, item: { value: 8, x: 80 } },
      { index: 10, item: { value: 10, x: 100 } },
      { index: 12, item: { value: 12, x: 120 } },
      { index: 14, item: { value: 14, x: 140 } },
      { index: 16, item: { value: 16, x: 160 } },
    ];
    const resultArr = Scale.takeValues(stepsArr);
    expect(resultArr).to.deep.equal(scaleArr);
  });
});

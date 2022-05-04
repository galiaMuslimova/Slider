import { expect } from 'chai';
import { IParameters } from '../../../interfaces/interfaces';

import Scale from './Scale';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='testSlider'>
    <div class='meta-slider js-meta-slider'></div>
  </div>
</body>`);
global.window = dom.window;

const { document } = dom.window;

describe('reduceArray', () => {
  let array: IParameters[];

  before(() => {
    array = [
      { value: 1, position: 10 },
      { value: 2, position: 20 },
      { value: 3, position: 30 },
      { value: 4, position: 40 },
      { value: 5, position: 50 },
      { value: 6, position: 60 },
      { value: 7, position: 70 },
      { value: 8, position: 80 },
      { value: 9, position: 90 },
      { value: 10, position: 100 }];
  });

  it('проверить уменьшение массива', () => {
    const correctedArray = Scale.reduceArray(array, 4);
    expect(correctedArray).to.deep.equal([
      { value: 1, position: 10 },
      { value: 4, position: 40 },
      { value: 7, position: 70 },
      { value: 10, position: 100 }]);
  });

  it('проверить уменьшение массива', () => {
    const correctedArray = Scale.reduceArray(array, 5);
    expect(correctedArray).to.deep.equal([
      { value: 1, position: 10 },
      { value: 3, position: 30 },
      { value: 5, position: 50 },
      { value: 7, position: 70 },
      { value: 9, position: 90 },
      { value: 10, position: 100 }]);
  });

  it('оставить массив без изменений', () => {
    const correctedArray = Scale.reduceArray(array, 12);
    expect(correctedArray).to.deep.equal(array);
  });
});

describe('correctLastItems', () => {
  let array: IParameters[];

  before(() => {
    array = [
      { value: 1, position: 10 },
      { value: 2, position: 20 },
      { value: 3, position: 30 },
      { value: 4, position: 40 },
      { value: 5, position: 45 }];
  });

  it('удалить предпоследнее значение', () => {
    const correctedArray = Scale.correctLastItems(array, 7);
    expect(correctedArray).to.deep.equal([
      { value: 1, position: 10 },
      { value: 2, position: 20 },
      { value: 3, position: 30 },
      { value: 5, position: 45 }]);
  });

  it('не удалять предпоследнее значение', () => {
    const correctedArray = Scale.correctLastItems(array, 4);
    expect(correctedArray).to.deep.equal([
      { value: 1, position: 10 },
      { value: 2, position: 20 },
      { value: 3, position: 30 },
      { value: 4, position: 40 },
      { value: 5, position: 45 }]);
  });
});

describe('create slider', () => {
  let $slider: JQuery<HTMLElement>;
  let scaleClass: Scale;
  let $scale: JQuery<HTMLElement>;
  let stepsArr: IParameters[];

  before(() => {
    $slider = $(document).find('.js-meta-slider');
    scaleClass = new Scale($slider);
    $scale = scaleClass.$scale;
    $scale.css('width', '300px');
    $scale.css('height', '300px');
    stepsArr = [
      { value: 0, position: 0 },
      { value: 2, position: 100 },
      { value: 4, position: 200 },
      { value: 8, position: 300 }];
  });

  it('проверить создание слайдера', () => {
    scaleClass.correctScale(stepsArr, false);
    const scaleItems = $scale.find('.js-meta-slider__scale-item');
    const scaleValues = $scale.find('.js-meta-slider__value');
    scaleValues.each(function (index) {
      expect(Number($(this).text())).to.eq(stepsArr[index].value);
    });
    expect(scaleItems.length).to.eq(4);
  });
});

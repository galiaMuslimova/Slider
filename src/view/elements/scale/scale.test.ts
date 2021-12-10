import { expect } from 'chai';
import Scale from './scale';

const JSDOM = require('jsdom').JSDOM;
const dom = new JSDOM(`<!DOCTYPE html><body><div class='testSlider'><div class='meta-slider'></div></div></body>`);
global.window = dom.window;
global.$ = global.jQuery = require('jquery');
const document = dom.window.document;

describe('Scale', () => {
  let slider: JQuery<HTMLElement>;
  let scaleClass: Scale;

  before(function () {
    slider = $(document).find('.meta-slider');
    scaleClass = new Scale(slider);
  })

  it('проверяет создание шкалы', () => {
    let scale = $(slider).find('.meta-slider__scale');
    expect(scale).to.exist;
  });

  it('проверить соответствие значений шкалы массиву', () => {
    const stepsArr = [{ value: 0, x: 0 }, { value: 2, x: 100 }, { value: 4, x: 200 }, { value: 8, x: 300 }];
    scaleClass.initScale(stepsArr);
    let scale = $(slider).find('.meta-slider__scale');
    scale.find('.meta-slider__value').each(function (index) {
      expect($(this).text()).to.equal(`${stepsArr[index].value}`);
    })
  });

  it('проверить соответствие позиций массиву для вертикального', () => {
    const stepsArr = [{ value: 0, x: 0 }, { value: 2, x: 100 }, { value: 4, x: 200 }, { value: 8, x: 300 }];
    scaleClass.initScale(stepsArr, true);
    let scale = $(slider).find('.meta-slider__scale');
    scale.find('.meta-slider__value').each(function (index) {
      expect($(this).css('top')).to.equal(`${stepsArr[index].x - 10}px`);
    })
  });

  it('проверить соответствие позиций массиву для горизонтального', () => {
    const stepsArr = [{ value: 0, x: 0 }, { value: 2, x: 100 }, { value: 4, x: 200 }, { value: 8, x: 300 }];
    scaleClass.initScale(stepsArr, false);
    let scale = $(slider).find('.meta-slider__scale');
    scale.find('.meta-slider__value').each(function (index) {
      expect($(this).css('left')).to.equal(`${stepsArr[index].x - 10}px`);
    })
  });
})
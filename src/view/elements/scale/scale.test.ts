import { expect } from 'chai';
import { IParameters } from '../../../interfaces/interfaces';

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
  let $scale: JQuery<HTMLElement>;
  let stepsArr: IParameters[];

  before(() => {
    $slider = $(document).find('.meta-slider');
    scaleClass = new Scale($slider, false);
    scaleClass.$scale.css('width', '300px');
    scaleClass.$scale.css('height', '300px');
    $scale = scaleClass.$scale;
    stepsArr = [
      { value: 0, x: 0 },
      { value: 2, x: 100 },
      { value: 4, x: 200 },
      { value: 8, x: 300 }];
  });

  it('проверить соответствие значений шкалы массиву', () => {
    scaleClass.initScale(stepsArr, false);
    const $values = $scale.find('.meta-slider__value');
    $values.each((index, element) => {
      expect($(element).text()).to.equal(`${stepsArr[index].value}`);
    });
  });

  it('проверить соответствие позиций массиву для вертикального', () => {
    scaleClass.initScale(stepsArr, true);
    const $items = $scale.find('.meta-slider__scale-item');
    $items.each((index, element) => {
      expect($(element).css('top')).to.equal(`${stepsArr[index].x}px`);
    });
  });

  it('проверить соответствие позиций массиву для горизонтального', () => {
    scaleClass.initScale(stepsArr, false);
    const $items = $scale.find('.meta-slider__scale-item');
    $items.each((index, element) => {
      expect($(element).css('left')).to.equal(`${stepsArr[index].x}px`);
    });
  });
});

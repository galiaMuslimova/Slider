import { expect } from 'chai';
import { testConfig } from '../../../defaults';

import Handle from '../handle/Handle';
import Tip from './Tip';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='meta-slider js-meta-slider'></div>
</body>`);
global.window = dom.window;

const { document } = dom.window;

describe('Tip', () => {
  let $slider: JQuery<HTMLElement>;
  let $track: JQuery<HTMLElement>;
  let $handle: JQuery<HTMLElement>;
  let $tip: JQuery<HTMLElement>;
  let tipClass: Tip;
  let handleClass: Handle;

  before(() => {
    $slider = $(document).find('.js-meta-slider');
    $track = jQuery('<div>', {
      class: 'meta-slider__track js-meta-slider__track',
    });
    $track.appendTo($slider);
    handleClass = new Handle($track, testConfig);
    $handle = handleClass.getElement();
    tipClass = new Tip($handle);
    $tip = tipClass.getElement();
  });

  it('проверяет создание элемента tip', () => {
    expect($tip.length).to.eq(1);
  });

  it('проверяет отсутствие подсказок tips = 0', () => {
    tipClass.changeTip(10);
    expect($tip.html()).to.eq('10');
  });
});

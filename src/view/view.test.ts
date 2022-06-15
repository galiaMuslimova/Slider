import { expect } from 'chai';
import { testConfig } from '../defaults';
import { IConfig } from '../interfaces/interfaces';
import IView from './interface';

import View from './View';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='body__slider js-body__slider'></div>
</body>`);
global.window = dom.window;

(global as any).$ = require('jquery');
(global as any).jQuery = require('jquery');

const { document } = dom.window;

describe('View', () => {
  const $root: JQuery<HTMLElement> = $(document).find('.js-body__slider');
  let $slider: JQuery<HTMLElement>;
  let view: IView;

  before(() => {
    view = new View($root, testConfig);
    $slider = $root.find('.js-meta-slider');
  });

  it('проверяет создание элемента slider', () => {
    expect($slider.length).to.equal(1);
  });

  it('проверяет установку isVertical false', () => {
    expect($slider.hasClass('meta-slider_vertical')).to.equal(false);
    expect($slider.hasClass('meta-slider_horizontal')).to.equal(true);
  });

  it('проверяет установку withRange true', () => {
    expect($slider.find('.js-meta-slider__handle').length).to.equal(2);
  });
});

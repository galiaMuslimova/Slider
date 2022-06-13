import { expect } from 'chai';
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
  const config: IConfig = {
    min: 0,
    max: 10,
    step: 1,
    from: 2,
    fromPosition: 100,
    to: 8,
    toPosition: 400,
    withRange: true,
    isVertical: true,
    hasTip: true,
  };

  before(() => {
    view = new View($root);
    $slider = $root.find('.js-meta-slider');
    $slider.find('.js-meta-slider__track').css('width', '500');
    $slider.find('.js-meta-slider__track').css('height', '500');
    view.initConfig(config);
  });

  it('проверяет создание элемента slider', () => {
    expect($slider.length).to.equal(1);
  });

  it('проверяет установку isVertical true', () => {
    expect($slider.hasClass('meta-slider_vertical')).to.equal(true);
    expect($slider.hasClass('meta-slider_horizontal')).to.equal(false);
  });

  it('проверяет установку isVertical false', () => {
    view.initConfig($.extend({}, config, { isVertical: false }));
    expect($slider.hasClass('meta-slider_isVertical')).to.equal(false);
    expect($slider.hasClass('meta-slider_horizontal')).to.equal(true);
  });

  it('проверяет установку withRange true', () => {
    expect($slider.find('.js-meta-slider__handle').length).to.equal(2);
  });

  it('проверяет установку withRange false', () => {
    view.initConfig($.extend({}, config, { withRange: false }));
    expect($slider.find('.js-meta-slider__handle').length).to.equal(1);
  });
});

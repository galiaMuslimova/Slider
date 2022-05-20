import { expect } from 'chai';
import { IConfig } from '../interfaces/interfaces';
import IView from './interface';

import View from './View';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='testSlider'></div>
</body>`);
global.window = dom.window;

(global as any).$ = require('jquery');
(global as any).jQuery = require('jquery');

const { document } = dom.window;

describe('View', () => {
  let $root: JQuery<HTMLElement>;
  let $slider: JQuery<HTMLElement>;
  let view: IView;

  before(() => {
    $root = $(document).find('.testSlider');
    $root.css('width', '450px');
    $root.css('height', '350px');
    view = new View();
    view.initSlider($root, () => {});
    $slider = $root.find('.js-meta-slider');
  });

  it('проверяет создание элемента slider', () => {
    expect($slider.length).to.equal(1);
  });

  it('проверяет установку vertical true', () => {
    view.initConfig({ vertical: true });
    expect($slider.hasClass('meta-slider_vertical')).to.equal(true);
    expect($slider.hasClass('meta-slider_horizontal')).to.equal(false);
  });

  it('проверяет установку vertical false', () => {
    view.initConfig({ vertical: false });
    expect($slider.hasClass('meta-slider_vertical')).to.equal(false);
    expect($slider.hasClass('meta-slider_horizontal')).to.equal(true);
  });

  it('проверяет установку range true', () => {
    view.initConfig({ range: true });
    expect($slider.find('.js-meta-slider__handle').length).to.equal(2);
  });

  it('проверяет установку range false', () => {
    view.initConfig({ range: false });
    expect($slider.find('.js-meta-slider__handle').length).to.equal(1);
  });
});

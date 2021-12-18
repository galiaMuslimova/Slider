import { expect } from 'chai';
import View from './view';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body><div class=\'testSlider\'></div></body>');
global.window = dom.window;
global.$ = require('jquery');
global.jQuery = require('jquery');

const { document } = dom.window;

describe('View', () => {
  let $root: JQuery<HTMLElement>;

  before(() => {
    $root = $(document).find('.testSlider');
  });

  it('проверяет класс вертикальный', () => {
    const view = new View($root, true);
    const { $container } = view;
    expect($container.hasClass('meta-slider_vertical')).to.equal(true);
  });

  it('проверяет класс горизонтальный', () => {
    const view = new View($root, false);
    const { $container } = view;
    expect($container.hasClass('meta-slider_horizontal')).to.equal(true);
  });

  it('проверяет класс не вертикальный', () => {
    const view = new View($root, false);
    const { $container } = view;
    expect($container.hasClass('meta-slider_vertical')).to.equal(false);
  });

  it('проверяет класс не горизонтальный', () => {
    const view = new View($root, true);
    const { $container } = view;
    expect($container.hasClass('meta-slider_horizontal')).to.equal(false);
  });
});

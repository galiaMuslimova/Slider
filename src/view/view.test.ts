import { expect } from 'chai';

import View from './View';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body><div class=\'testSlider\'></div></body>');
global.window = dom.window;

(global as any).$ = require('jquery');
(global as any).jQuery = require('jquery');

const { document } = dom.window;

describe('View', () => {
  let $slider: JQuery<HTMLElement>;
  let $body: JQuery<HTMLElement>;
  let $root: JQuery<HTMLElement>;

  before(() => {
    $slider = $(document).find('.testSlider');
  });

  beforeEach(() => {
    $body = jQuery('<div>', { class: 'js-body__container' }).appendTo($slider);
    $root = jQuery('<div>').appendTo($body);
  });

  afterEach(() => {
    $body.remove();
  });

  it('проверяет класс вертикальный', () => {
    const view = new View($root, true);
    const { $container } = view;
    expect($container.hasClass('body__container_vertical')).to.equal(true);
  });

  it('проверяет класс горизонтальный', () => {
    const view = new View($root, false);
    const { $container } = view;
    expect($container.hasClass('body__container_horizontal')).to.equal(true);
  });

  it('проверяет класс не вертикальный', () => {
    const view = new View($root, false);
    const { $container } = view;
    expect($container.hasClass('body__container_vertical')).to.equal(false);
  });

  it('проверяет класс не горизонтальный', () => {
    const view = new View($root, true);
    const { $container } = view;
    expect($container.hasClass('body__container_horizontal')).to.equal(false);
  });
});

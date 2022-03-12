import { expect } from 'chai';
import { IConfig } from '../interfaces/interfaces';

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
  let $panel: JQuery<HTMLElement>;
  let $form: JQuery<HTMLElement>;
  let config: IConfig;
  let $min: JQuery<HTMLElement>;
  let $max: JQuery<HTMLElement>;
  let $step: JQuery<HTMLElement>;
  let $from: JQuery<HTMLElement>;
  let $to: JQuery<HTMLElement>;
  let $vertical: JQuery<HTMLElement>;
  let $range: JQuery<HTMLElement>;
  let $tip: JQuery<HTMLElement>;

  before(() => {
    $slider = $(document).find('.testSlider');
    $body = jQuery('<div>', { class: 'body__container js-body__container' }).appendTo($slider);
    $root = jQuery('<div>', { class: 'body__slider js-body__slider' }).appendTo($body);
    $panel = jQuery('<div>', { class: 'js-panel' }).appendTo($body);
    $form = jQuery('<form>', { class: 'js-panel__form' }).appendTo($panel);
    $min = jQuery('<input>', { class: 'js-input__field', type: 'number', name: 'min' }).appendTo($form);
    $max = jQuery('<input>', { class: 'js-input__field', type: 'number', name: 'max' }).appendTo($form);
    $step = jQuery('<input>', { class: 'js-input__field', type: 'number', name: 'step' }).appendTo($form);
    $from = jQuery('<input>', { class: 'js-input__field', type: 'number', name: 'from' }).appendTo($form);
    $to = jQuery('<input>', { class: 'js-input__field', type: 'number', name: 'to' }).appendTo($form);
    $vertical = jQuery('<input>', { class: 'js-input__field', type: 'checkbox', name: 'vertical' }).appendTo($form);
    $range = jQuery('<input>', { class: 'js-input__field', type: 'checkbox', name: 'range' }).appendTo($form);
    $tip = jQuery('<input>', { class: 'js-input__field', type: 'checkbox', name: 'tip' }).appendTo($form);
    config = {
      max: 50,
      min: 0,
      step: 5,
      from: 5,
      to: 40,
      vertical: false,
      tip: true,
      range: true,
    };
  });

  it('проверяет параметры трэка', () => {
    const view = new View($root, true);
    const trackParameters = view.getTrackParameters();
    expect(trackParameters).to.deep.equal({ trackStart: 0, trackWidth: 0 });
  });

  it('проверяет изменился на горизонтальный', () => {
    const view = new View($root, true);
    view.changeDirection(false);
    expect(view.$container.hasClass('body__container_horizontal')).to.equal(true);
  });
});

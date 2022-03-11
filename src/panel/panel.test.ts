import { expect, assert } from 'chai';

import { IConfig } from '../interfaces/interfaces';
import Panel from './Panel';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body><div class=\'testSlider\'></div></body>');
global.window = dom.window;
const { document } = dom.window;

describe('Panel', () => {
  let $root: JQuery<HTMLElement>;
  let panelClass: Panel;
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
    $root = $(document).find('.testSlider');
    $panel = jQuery('<div>', { class: 'js-panel' }).appendTo($root);
    $form = jQuery('<form>', { class: 'js-panel__form' }).appendTo($panel);
    $min = jQuery('<input>', { class: 'js-input__field', type: 'number', name: 'min' }).appendTo($form);
    $max = jQuery('<input>', { class: 'js-input__field', type: 'number', name: 'max' }).appendTo($form);
    $step = jQuery('<input>', { class: 'js-input__field', type: 'number', name: 'step' }).appendTo($form);
    $from = jQuery('<input>', { class: 'js-input__field', type: 'number', name: 'from' }).appendTo($form);
    $to = jQuery('<input>', { class: 'js-input__field', type: 'number', name: 'to' }).appendTo($form);
    $vertical = jQuery('<input>', { class: 'js-input__field', type: 'checkbox', name: 'vertical' }).appendTo($form);
    $range = jQuery('<input>', { class: 'js-input__field', type: 'checkbox', name: 'range' }).appendTo($form);
    $tip = jQuery('<input>', { class: 'js-input__field', type: 'checkbox', name: 'tip' }).appendTo($form);
  });

  beforeEach(() => {
    panelClass = new Panel($root);
    config = {
      min: 5,
      max: 15,
      step: 1,
      from: 8,
      to: 10,
      vertical: false,
      tip: true,
      range: true,
    };
    panelClass.initPanel(config);
  });

  it('проверяет установку параметров', () => {
    const minInput = panelClass.inputs.get('min');
    expect(minInput?.getValue()).to.equal(5);
  });

  it('проверяет установку значений from, to', () => {
    panelClass.initValues([5, 10]);
    const fromInput = panelClass.inputs.get('from');
    expect(fromInput?.getValue()).to.equal(5);
    const toInput = panelClass.inputs.get('to');
    expect(toInput?.getValue()).to.equal(10);
  });

  it('проверяет установку значений', () => {
    panelClass.setValue({ step: 2 });
    const stepInput = panelClass.inputs.get('step');
    expect(stepInput?.getValue()).to.equal(2);
  });
});

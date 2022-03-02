import { expect } from 'chai';

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
    $min = jQuery('<input>', { type: 'number', name: 'min' }).appendTo($panel);
    $max = jQuery('<input>', { type: 'number', name: 'max' }).appendTo($panel);
    $step = jQuery('<input>', { type: 'number', name: 'step' }).appendTo($panel);
    $from = jQuery('<input>', { type: 'number', name: 'from' }).appendTo($panel);
    $to = jQuery('<input>', { type: 'number', name: 'to' }).appendTo($panel);
    $vertical = jQuery('<input>', { type: 'checkbox', name: 'vertical' }).appendTo($panel);
    $range = jQuery('<input>', { type: 'checkbox', name: 'range' }).appendTo($panel);
    $tip = jQuery('<input>', { type: 'checkbox', name: 'tip' }).appendTo($panel);
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

  it('проверяет инициализацию настроек из config', () => {
    expect(Number(panelClass.$min.val())).to.equal(5);
    expect(Number(panelClass.$max.val())).to.equal(15);
    expect(Number(panelClass.$step.val())).to.equal(1);
    expect(Number(panelClass.$from.val())).to.equal(8);
    expect(Number(panelClass.$to.val())).to.equal(10);
    expect(panelClass.$vertical.prop('checked')).to.equal(false);
    expect(panelClass.$tip.prop('checked')).to.equal(true);
    expect(panelClass.$range.prop('checked')).to.equal(true);
  });

  it('проверяет установку границ при инициализации', () => {
    expect(Number($min.prop('max'))).to.equal(15);
  });

  it('проверяет установку минимальной границы значений', () => {
    const setting = { min: 10 };
    panelClass.changeBounds(setting);
    expect(Number($max.prop('min'))).to.equal(10);
    expect(Number($from.prop('min'))).to.equal(10);
  });

  it('проверяет установку максимальной границы значений', () => {
    const setting = { max: 18 };
    panelClass.changeBounds(setting);
    expect(Number($min.prop('max'))).to.equal(18);
    expect(Number($to.prop('max'))).to.equal(18);
  });

  it('проверяет установку минимальной границы значений для to', () => {
    const setting = { from: 13 };
    panelClass.changeBounds(setting);
    expect(Number($to.prop('min'))).to.equal(13);
  });

  it('проверяет установку максмиальной границы значений для from', () => {
    const setting = { to: 14 };
    panelClass.changeBounds(setting);
    expect(Number($from.prop('max'))).to.equal(14);
  });

  it('проверяет установку максимального и минимального значений from при range=false', () => {
    const setting = { range: false };
    panelClass.changeBounds(setting);
    expect(Number($from.prop('max'))).to.equal(15);
  });

  it('проверяет установку максимального и минимального значений from при range=true', () => {
    const setting = { range: true };
    panelClass.changeBounds(setting);
    expect(Number($from.prop('max'))).to.equal(10);
  });

  it('проверяет установку to=disabled при range=false', () => {
    const setting = { range: false };
    panelClass.changeBounds(setting);
    expect($to.prop('disabled')).to.equal(true);
  });

  it('проверяет установку to!=disabled при range=true', () => {
    const setting = { range: true };
    panelClass.changeBounds(setting);
    expect($to.prop('disabled')).to.equal(false);
  });

  it('проверяет изменение значений from to', () => {
    panelClass.initValues([10, 12]);
    expect(Number($from.val())).to.equal(10);
    expect(Number($to.val())).to.equal(12);
    expect(Number($from.prop('max'))).to.equal(12);
    expect(Number($from.prop('min'))).to.equal(5);
    expect(Number($to.prop('min'))).to.equal(10);
    expect(Number($to.prop('max'))).to.equal(15);
  });

  it('проверяет изменение значений from', () => {
    panelClass.initValues([9]);
    expect(Number($from.val())).to.equal(9);
    expect(Number($from.prop('max'))).to.equal(15);
    expect(Number($from.prop('min'))).to.equal(5);
  });
});

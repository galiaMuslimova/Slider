import { expect } from 'chai';

import { IConfig } from '../interfaces/interfaces';
import Panel from './panel';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body><div class=\'testSlider\'></div></body>');
global.window = dom.window;
global.$ = require('jquery');
global.jQuery = require('jquery');

const { document } = dom.window;

describe('Settings', () => {
  let $root: JQuery<HTMLElement>;
  let settingsClass: Panel;
  let $settings: JQuery<HTMLElement>;
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
  });

  beforeEach(() => {
    settingsClass = new Settings($root);
    $settings = $root.find('.meta-slider__settings');
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
    settingsClass.initSettings(config);
    $min = $settings.find("input[name='min']");
    $max = $settings.find("input[name='max']");
    $step = $settings.find("input[name='step']");
    $from = $settings.find("input[name='from']");
    $to = $settings.find("input[name='to']");
    $vertical = $settings.find("input[name='vertical']");
    $range = $settings.find("input[name='range']");
    $tip = $settings.find("input[name='tip']");
  });

  afterEach(() => {
    $settings.remove();
  });

  it('проверяет инициализацию настроек из config', () => {
    expect(Number($min.val())).to.equal(5);
    expect(Number($max.val())).to.equal(15);
    expect(Number($step.val())).to.equal(1);
    expect(Number($from.val())).to.equal(8);
    expect(Number($to.val())).to.equal(10);
    expect($vertical.prop('checked')).to.equal(false);
    expect($tip.prop('checked')).to.equal(true);
    expect($range.prop('checked')).to.equal(true);
  });

  it('проверяет установку границ при инициализации', () => {
    expect(Number($min.prop('max'))).to.equal(15);
  });

  it('проверяет установку минимальной границы значений', () => {
    const setting = { min: 10 };
    settingsClass.changeBounds(setting);
    expect(Number($max.prop('min'))).to.equal(10);
    expect(Number($from.prop('min'))).to.equal(10);
    expect(Number($step.prop('min'))).to.equal(0);
  });

  it('проверяет установку максимальной границы значений', () => {
    const setting = { max: 18 };
    settingsClass.changeBounds(setting);
    expect(Number($min.prop('max'))).to.equal(18);
    expect(Number($to.prop('max'))).to.equal(18);
    expect(Number($step.prop('max'))).to.equal(13);
  });

  it('проверяет установку минимальной границы значений для to', () => {
    const setting = { from: 13 };
    settingsClass.changeBounds(setting);
    expect(Number($to.prop('min'))).to.equal(13);
  });

  it('проверяет установку максмиальной границы значений для from', () => {
    const setting = { to: 14 };
    settingsClass.changeBounds(setting);
    expect(Number($from.prop('max'))).to.equal(14);
  });

  it('проверяет установку максимального и минимального значений from при range=false', () => {
    const setting = { range: false };
    settingsClass.changeBounds(setting);
    expect(Number($from.prop('max'))).to.equal(15);
  });

  it('проверяет установку максимального и минимального значений from при range=true', () => {
    const setting = { range: true };
    settingsClass.changeBounds(setting);
    expect(Number($from.prop('max'))).to.equal(10);
  });

  it('проверяет установку to=disabled при range=false', () => {
    const setting = { range: false };
    settingsClass.changeBounds(setting);
    expect($to.prop('disabled')).to.equal(true);
  });

  it('проверяет установку to!=disabled при range=true', () => {
    const setting = { range: true };
    settingsClass.changeBounds(setting);
    expect($to.prop('disabled')).to.equal(false);
  });

  it('проверяет изменение значений from to', () => {
    settingsClass.initValues([10, 12]);
    expect(Number($from.val())).to.equal(10);
    expect(Number($to.val())).to.equal(12);
    expect(Number($from.prop('max'))).to.equal(12);
    expect(Number($from.prop('min'))).to.equal(5);
    expect(Number($to.prop('min'))).to.equal(10);
    expect(Number($to.prop('max'))).to.equal(15);
  });

  it('проверяет изменение значений from', () => {
    settingsClass.initValues([9]);
    expect(Number($from.val())).to.equal(9);
    expect(Number($from.prop('max'))).to.equal(15);
    expect(Number($from.prop('min'))).to.equal(5);
  });
});

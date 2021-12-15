import { expect } from 'chai';
import Settings from './settings';
import { IConfig } from "../../interfaces";

const JSDOM = require('jsdom').JSDOM;
const dom = new JSDOM(`<!DOCTYPE html><body><div class='testSlider'></div></body>`);
global.window = dom.window;
global.$ = global.jQuery = require('jquery');
const document = dom.window.document;

describe('Settings', () => {
  let root: JQuery<HTMLElement>;
  let settingsClass: Settings;
  let settings: JQuery<HTMLElement>;
  let config: IConfig;

  before(function () {
    root = $(document).find('.testSlider');
  })

  beforeEach(function () {
    settingsClass = new Settings(root);
    settings = root.find('.meta-slider__settings');
    config = {
      min: 5,
      max: 15,
      step: 1,
      from: 8,
      to: 10,
      vertical: false,
      tip: true,
      range: true
    }
    settingsClass.initSettings(config)
  })

  afterEach(function(){
    settings.remove();
  })

  it('проверяет инициализацию настроек из config', () => {
    expect(Number(settings.find("input[name='min']").val())).to.equal(5)
    expect(Number(settings.find("input[name='max']").val())).to.equal(15)
    expect(Number(settings.find("input[name='step']").val())).to.equal(1)
    expect(Number(settings.find("input[name='from']").val())).to.equal(8)
    expect(Number(settings.find("input[name='to']").val())).to.equal(10)
    expect(settings.find("input[name='vertical']").prop('checked')).to.equal(false)
    expect(settings.find("input[name='tip']").prop('checked')).to.equal(true)
    expect(settings.find("input[name='range']").prop('checked')).to.equal(true)    
  }); 
  
  it('проверяет установку границ при инициализации', () => {
    expect(Number(settings.find("input[name='min']").prop('max'))).to.equal(15) 
  });  

  it('проверяет установку минимальной границы значений', () => {
    let setting = {min: 10};
    settingsClass.changeBounds(setting)
    expect(Number(settings.find("input[name='max']").prop('min'))).to.equal(10)
    expect(Number(settings.find("input[name='from']").prop('min'))).to.equal(10)
    expect(Number(settings.find("input[name='step']").prop('min'))).to.equal(0)
  });

  it('проверяет установку максимальной границы значений', () => {
    let setting = {max: 18}
    settingsClass.changeBounds(setting)
    expect(Number(settings.find("input[name='min']").prop('max'))).to.equal(18)
    expect(Number(settings.find("input[name='to']").prop('max'))).to.equal(18)
    expect(Number(settings.find("input[name='step']").prop('max'))).to.equal(13)
  });

  it('проверяет установку минимальной границы значений для to', () => {
    let setting = {from: 13}
    settingsClass.changeBounds(setting)
    expect(Number(settings.find("input[name='to']").prop('min'))).to.equal(13)
  });

  it('проверяет установку максмиальной границы значений для from', () => {
    let setting = {to: 14}
    settingsClass.changeBounds(setting)
    expect(Number(settings.find("input[name='from']").prop('max'))).to.equal(14)
  });

  it('проверяет установку максимального и минимального значений from при range=false', () => {
    let setting = {range: false}
    settingsClass.changeBounds(setting)
    expect(Number(settings.find("input[name='from']").prop('max'))).to.equal(15)
  });

  it('проверяет установку максимального и минимального значений from при range=true', () => {
    let setting = {range: true}
    settingsClass.changeBounds(setting)
    expect(Number(settings.find("input[name='from']").prop('max'))).to.equal(10)
  });

  it('проверяет установку to=disabled при range=false', () => {
    let setting = {range: false}
    settingsClass.changeBounds(setting)
    expect(settings.find("input[name='to']").prop('disabled')).to.equal(true)
  });

  it('проверяет установку to!=disabled при range=true', () => {
    let setting = {range: true}
    settingsClass.changeBounds(setting)
    expect(settings.find("input[name='to']").prop('disabled')).to.equal(false)
  });

  it('проверяет изменение значений from to', () => {
    settingsClass.initValues([10,12])
    expect(Number(settings.find("input[name='from']").val())).to.equal(10)
    expect(Number(settings.find("input[name='to']").val())).to.equal(12)
    expect(Number(settings.find("input[name='from']").prop('max'))).to.equal(12)
    expect(Number(settings.find("input[name='from']").prop('min'))).to.equal(5)
    expect(Number(settings.find("input[name='to']").prop('min'))).to.equal(10)
    expect(Number(settings.find("input[name='to']").prop('max'))).to.equal(15)
  });

  it('проверяет изменение значений from', () => {
    settingsClass.initValues([9])
    expect(Number(settings.find("input[name='from']").val())).to.equal(9)
    expect(Number(settings.find("input[name='from']").prop('max'))).to.equal(15)
    expect(Number(settings.find("input[name='from']").prop('min'))).to.equal(5)
  });
  
})
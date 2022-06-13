import { expect } from 'chai';
import IModel from './interface';

import Model from './Model';

describe('Model', () => {
  const data = [
    { value: 1, position: 0 },
    { value: 2, position: 100 },
    { value: 3, position: 200 },
    { value: 4, position: 300 },
    { value: 5, position: 400 },
    { value: 6, position: 500 },
  ];
  let model: IModel;

  beforeEach(() => {
    model = new Model({
      min: 1,
      max: 6,
      step: 1,
      from: 2,
      to: 4,
    });
    model.init(data);
  });

  it('устанавливает значения в конфиг', () => {
    model = new Model({
      min: 15,
      max: 25,
      step: 1,
      from: 18,
      to: 20,
      isVertical: false,
      hasTip: true,
      withRange: true,
    });
    expect(model.getConfig().min).to.equal(15);
    expect(model.getConfig().max).to.equal(25);
    expect(model.getConfig().step).to.equal(1);
    expect(model.getConfig().from).to.equal(18);
    expect(model.getConfig().to).to.equal(20);
    expect(model.getConfig().isVertical).to.equal(false);
    expect(model.getConfig().hasTip).to.equal(true);
    expect(model.getConfig().withRange).to.equal(true);
  });

  it('установлены дефолтные значения в случае отсутствия опций', () => {
    model = new Model({
      max: 50,
      step: 10,
      from: 10,
      to: 20,
    });
    expect(model.getConfig().min).to.equal(10);
    expect(model.getConfig().max).to.equal(50);
    expect(model.getConfig().step).to.equal(10);
    expect(model.getConfig().from).to.equal(10);
    expect(model.getConfig().to).to.equal(20);
    expect(model.getConfig().isVertical).to.equal(false);
    expect(model.getConfig().hasTip).to.equal(true);
    expect(model.getConfig().withRange).to.equal(true);
  });

  it('скорректирован min и max', () => {
    model = new Model({
      min: 35,
      max: 25,
    });
    model.init(data);
    expect(model.getConfig().min).to.equal(25);
    expect(model.getConfig().max).to.equal(35);
  });

  it('инициализировать параметры', () => {
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(2);
    expect(config?.fromPosition).to.deep.equal(100);
    expect(config?.to).to.deep.equal(4);
    expect(config?.toPosition).to.deep.equal(300);
  });

  it('инициализировать параметры с неправильными from и  to', () => {
    model = new Model({
      min: 1,
      max: 6,
      step: 1,
      from: -8,
      to: 19,
    });
    model.init(data);
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(1);
    expect(config?.fromPosition).to.deep.equal(0);
    expect(config?.to).to.deep.equal(6);
    expect(config?.toPosition).to.deep.equal(500);
  });

  it('получить параметры при движении handle 1', () => {
    const options = { key: 0, position: 165 };
    model.changeParameter(options);
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(3);
    expect(config?.fromPosition).to.deep.equal(200);
    expect(config?.to).to.deep.equal(4);
    expect(config?.toPosition).to.deep.equal(300);
  });

  it('получить параметры при движении handle 2', () => {
    const options = { key: 1, position: 230 };
    model.changeParameter(options);
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(2);
    expect(config?.fromPosition).to.deep.equal(100);
    expect(config?.to).to.deep.equal(3);
    expect(config?.toPosition).to.deep.equal(200);
  });

  it('получить параметры при клике на шкалу, меняется handle 2', () => {
    model.changeParameter({ value: 5 });
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(2);
    expect(config?.fromPosition).to.deep.equal(100);
    expect(config?.to).to.deep.equal(5);
    expect(config?.toPosition).to.deep.equal(400);
  });

  it('получить параметры при клике на шкалу, меняется handle 1', () => {
    model.changeParameter({ value: 1 });
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(1);
    expect(config?.fromPosition).to.deep.equal(0);
    expect(config?.to).to.deep.equal(4);
    expect(config?.toPosition).to.deep.equal(300);
  });

  it('получить параметры при клике на трэк, при withRange=true', () => {
    model.changeParameter({ position: 370 });
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(2);
    expect(config?.fromPosition).to.deep.equal(100);
    expect(config?.to).to.deep.equal(5);
    expect(config?.toPosition).to.deep.equal(400);
  });

  it('получить параметры', () => {
    const config = {
      min: 0,
      max: 50,
      step: 5,
      from: 10,
      to: 40,
      withRange: true,
      isVertical: false,
      hasTip: false,
    };
    model = new Model(config);
    const expectedConfig = $.extend({}, config, { fromPosition: 0, toPosition: 0 });
    expect(model.getConfig()).to.deep.equal(expectedConfig);
  });
});

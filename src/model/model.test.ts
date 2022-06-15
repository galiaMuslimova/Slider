import { expect } from 'chai';
import { testConfig, testOptions, testPositions } from '../defaults';
import IModel from './interface';

import Model from './Model';

describe('Model', () => {
  let model: IModel;

  beforeEach(() => {
    model = new Model(testOptions);
    model.init(testPositions);
  });

  it('устанавливает значения в конфиг', () => {
    model = new Model(testOptions);
    expect(model.getConfig().min).to.equal(0);
    expect(model.getConfig().max).to.equal(10);
    expect(model.getConfig().step).to.equal(1);
    expect(model.getConfig().from).to.equal(2);
    expect(model.getConfig().to).to.equal(8);
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
    expect(model.getConfig().min).to.equal(25);
    expect(model.getConfig().max).to.equal(35);
  });

  it('инициализировать параметры', () => {
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(2);
    expect(config?.fromPosition).to.deep.equal(100);
    expect(config?.to).to.deep.equal(8);
    expect(config?.toPosition).to.deep.equal(400);
  });

  it('инициализировать параметры с неправильными from и  to', () => {
    model = new Model(
      $.extend({}, testOptions, {
        from: -8,
        to: 19,
      }),
    );
    model.init(testPositions);
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(0);
    expect(config?.fromPosition).to.deep.equal(0);
    expect(config?.to).to.deep.equal(10);
    expect(config?.toPosition).to.deep.equal(500);
  });

  it('получить параметры при движении handle 1', () => {
    const options = { key: 0, position: 165 };
    model.changeParameter(options);
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(3);
    expect(config?.fromPosition).to.deep.equal(150);
    expect(config?.to).to.deep.equal(8);
    expect(config?.toPosition).to.deep.equal(400);
  });

  it('получить параметры при движении handle 2', () => {
    const options = { key: 1, position: 230 };
    model.changeParameter(options);
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(2);
    expect(config?.fromPosition).to.deep.equal(100);
    expect(config?.to).to.deep.equal(5);
    expect(config?.toPosition).to.deep.equal(250);
  });

  it('получить параметры при клике на шкалу, меняется handle 2', () => {
    model.changeParameter({ value: 6 });
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(2);
    expect(config?.fromPosition).to.deep.equal(100);
    expect(config?.to).to.deep.equal(6);
    expect(config?.toPosition).to.deep.equal(300);
  });

  it('получить параметры при клике на шкалу, меняется handle 1', () => {
    model.changeParameter({ value: 1 });
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(1);
    expect(config?.fromPosition).to.deep.equal(50);
    expect(config?.to).to.deep.equal(8);
    expect(config?.toPosition).to.deep.equal(400);
  });

  it('получить параметры при клике на трэк, при withRange=true', () => {
    model.changeParameter({ position: 340 });
    const config = model.getConfig();
    expect(config?.from).to.deep.equal(2);
    expect(config?.fromPosition).to.deep.equal(100);
    expect(config?.to).to.deep.equal(7);
    expect(config?.toPosition).to.deep.equal(350);
  });
});

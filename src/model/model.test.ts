import { expect } from 'chai';
import { testOptions, testPositions } from '../defaults';
import { ICoordinates } from '../interfaces/interfaces';
import IModel from './interface';

import Model from './Model';

describe('Model', () => {
  let model: IModel | null;

  beforeEach(() => {
    model = new Model({
      min: 0,
      max: 10,
      step: 1,
      from: 2,
      to: 8,
      isVertical: false,
      hasTip: true,
      withRange: true,
    });
    model.init(testPositions);
  });

  afterEach(() => {
    model = null;
  });

  it('устанавливает значения в конфиг', () => {
    expect(model?.getConfig().min).to.equal(0);
    expect(model?.getConfig().max).to.equal(10);
    expect(model?.getConfig().step).to.equal(1);
    expect(model?.getConfig().from).to.equal(2);
    expect(model?.getConfig().to).to.equal(8);
    expect(model?.getConfig().isVertical).to.equal(false);
    expect(model?.getConfig().hasTip).to.equal(true);
    expect(model?.getConfig().withRange).to.equal(true);
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
    const config = model?.getConfig();
    expect(config?.from).to.equal(2);
    expect(config?.fromPosition).to.equal(100);
    expect(config?.to).to.equal(8);
    expect(config?.toPosition).to.equal(400);
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
    const options:ICoordinates = { key: 'from', position: 165 };
    model?.changeParameter(options);
    const config = model?.getConfig();
    expect(config?.from).to.deep.equal(3);
    expect(config?.fromPosition).to.deep.equal(150);
    expect(config?.to).to.deep.equal(8);
    expect(config?.toPosition).to.deep.equal(400);
  });

  it('получить параметры при движении handle 2', () => {
    const options:ICoordinates = { key: 'to', position: 230 };
    model?.changeParameter(options);
    const config = model?.getConfig();
    expect(config?.from).to.deep.equal(2);
    expect(config?.fromPosition).to.deep.equal(100);
    expect(config?.to).to.deep.equal(5);
    expect(config?.toPosition).to.deep.equal(250);
  });

  it('получить параметры при клике на шкалу, меняется handle 2', () => {
    model?.changeParameter({ value: 6 });
    const config = model?.getConfig();
    expect(config?.from).to.deep.equal(2);
    expect(config?.fromPosition).to.deep.equal(100);
    expect(config?.to).to.deep.equal(6);
    expect(config?.toPosition).to.deep.equal(300);
  });

  it('получить параметры при клике на шкалу, меняется handle 1', () => {
    model?.changeParameter({ value: 1 });
    const config = model?.getConfig();
    expect(config?.from).to.deep.equal(1);
    expect(config?.fromPosition).to.deep.equal(50);
    expect(config?.to).to.deep.equal(8);
    expect(config?.toPosition).to.deep.equal(400);
  });

  it('получить параметры при клике на трэк, при withRange=true', () => {
    model?.changeParameter({ position: 340 });
    const config = model?.getConfig();
    expect(config?.from).to.deep.equal(2);
    expect(config?.fromPosition).to.deep.equal(100);
    expect(config?.to).to.deep.equal(7);
    expect(config?.toPosition).to.deep.equal(350);
  });
});

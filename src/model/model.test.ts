import { expect } from 'chai';

import Model from './Model';

describe('Model', () => {
  it('устанавливает значения в конфиг', () => {
    const model = new Model({
      min: 15,
      max: 25,
      step: 1,
      from: 18,
      to: 20,
      vertical: false,
      tip: true,
      range: true,
    });
    expect(model.config.min).to.equal(15);
    expect(model.config.max).to.equal(25);
    expect(model.config.step).to.equal(1);
    expect(model.config.from).to.equal(18);
    expect(model.config.to).to.equal(20);
    expect(model.config.vertical).to.equal(false);
    expect(model.config.tip).to.equal(true);
    expect(model.config.range).to.equal(true);
  });

  it('установлены дефолтные значения в случае отсутствия опций', () => {
    const model = new Model({
      max: 50,
      step: 10,
      from: 10,
      to: 20,
    });
    expect(model.config.min).to.equal(10);
    expect(model.config.max).to.equal(50);
    expect(model.config.step).to.equal(10);
    expect(model.config.from).to.equal(10);
    expect(model.config.to).to.equal(20);
    expect(model.config.vertical).to.equal(false);
    expect(model.config.tip).to.equal(true);
    expect(model.config.range).to.equal(true);
  });

  it('скорректирован min и max', () => {
    const model = new Model({
      min: 35,
      max: 25,
    });
    expect(model.config.min).to.equal(25);
    expect(model.config.max).to.equal(35);
  });

  it('скорректирован from', () => {
    const model = new Model({
      min: 10,
      max: 25,
      step: 5,
      from: 5,
    });
    expect(model.config.from).to.equal(10);
  });

  it('скорректирован to', () => {
    const model = new Model({
      min: 10,
      max: 25,
      step: 5,
      from: 1,
      to: 125,
    });
    expect(model.config.to).to.equal(25);
  });

  it('установить параметры трека', () => {
    const model = new Model({}, 100, 300);
    expect(model.trackStart).to.equal(100);
    expect(model.trackWidth).to.equal(300);
  });

  it('сделать массив шагов для шкалы', () => {
    const model = new Model({
      min: 1,
      max: 6,
      step: 1,
    });
    const stepsArr = [
      { value: 1, x: 0 },
      { value: 2, x: 100 },
      { value: 3, x: 200 },
      { value: 4, x: 300 },
      { value: 5, x: 400 },
      { value: 6, x: 500 }];
    expect(model.initStepsArr()).to.deep.equal(stepsArr);
  });

  it('инициализировать параметры', () => {
    const model = new Model({
      min: 0,
      max: 10,
      step: 1,
      from: 3,
      to: 10,
    });
    expect(model.initParameters()).to.deep.equal({ values: [3, 10], positions: [150, 500] });
  });

  it('инициализировать параметры с неправильными from и  to', () => {
    const model = new Model({
      min: 0,
      max: 10,
      step: 1,
      from: -8,
      to: 19,
    });
    model.changeConfig();
    expect(model.initParameters()).to.deep.equal({ values: [0, 10], positions: [0, 500] });
  });

  it('получить позицию x по значению value', () => {
    const model = new Model({
      min: 0,
      max: 10,
      step: 1,
    });
    expect(model.takeXByValue(5)).to.deep.equal(250);
  });

  it('получить параметры при движении handle 1', () => {
    const model = new Model({
      min: 0,
      max: 500,
      step: 50,
      from: 100,
      to: 400,
    });
    const pagePositions = { pageX: 130, pageY: 50 };
    const options = { eventPosition: pagePositions, index: 0 };
    const parameters = {
      values: [150, 400],
      positions: [150, 400],
    };
    expect(model.takeParamHandleMove(options)).to.deep.equal(parameters);
  });

  it('получить параметры при движении handle 2', () => {
    const model = new Model({
      min: 0,
      max: 50,
      step: 5,
      from: 10,
      to: 40,
    });
    const pagePositions = { pageX: 130, pageY: 50 };
    const options = { eventPosition: pagePositions, index: 1 };
    const parameters = {
      values: [10, 15],
      positions: [100, 150],
    };
    expect(model.takeParamHandleMove(options)).to.deep.equal(parameters);
  });

  it('получить параметры при клике на шкалу, меняется handle 2', () => {
    const model = new Model({
      min: 0,
      max: 50,
      step: 5,
      from: 10,
      to: 40,
    });
    const parameters = { values: [10, 45], positions: [100, 450] };
    expect(model.takeParamScaleClick(45)).to.deep.equal(parameters);
  });

  it('получить параметры при клике на шкалу, меняется handle 1', () => {
    const model = new Model({
      min: 0,
      max: 50,
      step: 5,
      from: 10,
      to: 40,
    });
    const parameters = { values: [15, 40], positions: [150, 400] };
    expect(model.takeParamScaleClick(15)).to.deep.equal(parameters);
  });

  it('получить параметры при клике на шкалу, при range=false', () => {
    const model = new Model({
      min: 0,
      max: 50,
      step: 5,
      from: 10,
      to: 40,
      range: false,
    });
    expect(model.takeParamScaleClick(5)).to.deep.equal({ values: [5], positions: [50] });
  });
});

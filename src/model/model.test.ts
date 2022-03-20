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
    expect(model.getConfig().min).to.equal(15);
    expect(model.getConfig().max).to.equal(25);
    expect(model.getConfig().step).to.equal(1);
    expect(model.getConfig().from).to.equal(18);
    expect(model.getConfig().to).to.equal(20);
    expect(model.getConfig().vertical).to.equal(false);
    expect(model.getConfig().tip).to.equal(true);
    expect(model.getConfig().range).to.equal(true);
  });

  it('установлены дефолтные значения в случае отсутствия опций', () => {
    const model = new Model({
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
    expect(model.getConfig().vertical).to.equal(false);
    expect(model.getConfig().tip).to.equal(true);
    expect(model.getConfig().range).to.equal(true);
  });

  it('скорректирован min и max', () => {
    const model = new Model({
      min: 35,
      max: 25,
    });
    model.correctMinMax();
    expect(model.getConfig().min).to.equal(25);
    expect(model.getConfig().max).to.equal(35);
  });

  it('скорректирован from', () => {
    const model = new Model({
      min: 10,
      max: 25,
      step: 5,
      from: 5,
    });
    model.setTrackParameters(0, 500);
    model.initStepsArr();
    model.correctFromTo();
    expect(model.getConfig().from).to.equal(10);
  });

  it('скорректирован to', () => {
    const model = new Model({
      min: 10,
      max: 25,
      step: 5,
      from: 1,
      to: 125,
    });
    model.setTrackParameters(0, 500);
    model.initStepsArr();
    model.correctFromTo();
    expect(model.getConfig().to).to.equal(25);
  });

  it('сделать массив шагов для шкалы', () => {
    const model = new Model({
      min: 1,
      max: 6,
      step: 1,
    });
    const stepsArr = [
      { value: 1, position: 0 },
      { value: 2, position: 100 },
      { value: 3, position: 200 },
      { value: 4, position: 300 },
      { value: 5, position: 400 },
      { value: 6, position: 500 }];
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
    model.setTrackParameters(0, 500);
    model.initStepsArr();
    const parameters = [{ value: 3, position: 150 }, { value: 10, position: 500 }];
    expect(model.initParameters()).to.deep.equal(parameters);
  });

  it('инициализировать параметры с неправильными from и  to', () => {
    const model = new Model({
      min: 0,
      max: 10,
      step: 1,
      from: -8,
      to: 19,
    });
    model.setTrackParameters(0, 500);
    model.initStepsArr();
    model.correctFromTo();
    const parameters = [{ value: 0, position: 0 }, { value: 10, position: 500 }];
    expect(model.initParameters()).to.deep.equal(parameters);
  });

  it('получить параметры при движении handle 1', () => {
    const model = new Model({
      min: 0,
      max: 500,
      step: 50,
      from: 100,
      to: 400,
    });
    const options = { eventPosition: 130, index: 0 };
    const parameters = [{ value: 150, position: 150 }, { value: 400, position: 400 }];
    model.setTrackParameters(0, 500);
    model.initStepsArr();
    model.initParameters();
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
    const options = { eventPosition: 130, index: 1 };
    const parameters = [{ value: 10, position: 100 }, { value: 15, position: 150 }];
    model.setTrackParameters(0, 500);
    model.initStepsArr();
    model.initParameters();
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
    const parameters = [{ value: 10, position: 100 }, { value: 45, position: 450 }];
    model.setTrackParameters(0, 500);
    model.initStepsArr();
    model.initParameters();
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
    const parameters = [{ value: 15, position: 150 }, { value: 40, position: 400 }];
    model.setTrackParameters(0, 500);
    model.initStepsArr();
    model.initParameters();
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
    const parameters = [{ value: 5, position: 50 }];
    model.setTrackParameters(0, 500);
    model.initStepsArr();
    model.initParameters();
    expect(model.takeParamScaleClick(5)).to.deep.equal(parameters);
  });

  it('получить параметры при клике на трэк, при range=false', () => {
    const model = new Model({
      min: 0,
      max: 50,
      step: 5,
      from: 10,
      to: 40,
      range: false,
    });
    const parameters = [{ value: 15, position: 150 }];
    model.setTrackParameters(0, 500);
    model.initStepsArr();
    model.initParameters();
    expect(model.takeParamTrackClick(150)).to.deep.equal(parameters);
  });

  it('получить параметры при клике на трэк, при range=true', () => {
    const model = new Model({
      min: 0,
      max: 50,
      step: 5,
      from: 5,
      to: 40,
      range: true,
    });
    const parameters = [{ value: 5, position: 50 }, { value: 35, position: 350 }];
    model.setTrackParameters(0, 500);
    model.initStepsArr();
    model.initParameters();
    expect(model.takeParamTrackClick(350)).to.deep.equal(parameters);
  });

  it('получить параметры', () => {
    const config = {
      min: 0,
      max: 50,
      step: 5,
      from: 10,
      to: 40,
      range: true,
      vertical: false,
      tip: false,
    };
    const model = new Model(config);

    expect(model.getConfig()).to.deep.equal(config);
  });

  it('установить параметры', () => {
    const config = {
      min: 10,
      max: 50,
      step: 15,
      from: 10,
      to: 40,
      range: false,
      vertical: false,
      tip: false,
    };
    const model = new Model({
      min: 0,
      max: 50,
      step: 5,
      from: 10,
      to: 40,
      range: true,
    });
    model.setConfig(config);
    expect(model.getConfig()).to.deep.equal(config);
  });
});

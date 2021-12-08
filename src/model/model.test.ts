import { assert, expect } from 'chai';
import Model from './model';

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
      range: true
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

  it('скорректирован step', () => {
    const model = new Model({
      min: 10,
      max: 50,
      step: 30,
    });
    expect(model.config.step).to.equal(4);
  });

  it('скорректирован step', () => {
    const model = new Model({
      min: 10,
      max: 25,
      step: 60,
    });
    expect(model.config.step).to.equal(2);
  });

  it('скорректирован from', () => {
    const model = new Model({
      min: 10,
      max: 25,
      step: 5,
      from: 5
    });
    expect(model.config.from).to.equal(15);
  });

  it('скорректирован to', () => {
    const model = new Model({
      min: 10,
      max: 25,
      step: 5,
      to: 5
    });
    expect(model.config.to).to.equal(20);
  });

  it('установить параметры трека', () => {
    const model = new Model({});
    model.setTrackParameters(10, 300)
    expect(model.trackStart).to.equal(10);
    expect(model.trackWidth).to.equal(300);
  });

  it('сделать массив шагов для шкалы', () => {
    const model = new Model({
      min: 1,
      max: 6,
      step: 1
    });    
    model.trackWidth = 460;
    expect(model.initStepsArr()).to.deep.equal([{ value: 1, x: 0 }, { value: 2, x: 92 }, { value: 3, x: 184 }, { value: 4, x: 276 }, { value: 5, x: 368 }, { value: 6, x: 460}]);
  });
})
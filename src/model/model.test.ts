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
    const model = new Model({}, 100, 300);
    expect(model.trackStart).to.equal(100);
    expect(model.trackWidth).to.equal(300);
  });

  it('сделать массив шагов для шкалы', () => {
    const model = new Model({
      min: 1,
      max: 6,
      step: 1
    });    
    expect(model.initStepsArr()).to.deep.equal([{ value: 1, x: 0 }, { value: 2, x: 100 }, { value: 3, x: 200 }, { value: 4, x: 300 }, { value: 5, x: 400 }, { value: 6, x: 500}]);
  });

  it('сделать массив всех позиций', () => {
    const model = new Model({
      min: 0,
      max: 10,
      step: 1
    });
    expect(model.initPositionsArr()).to.deep.equal([{ value: 0, x: 0 }, { value: 1, x: 50 }, { value: 2, x: 100 }, { value: 3, x: 150 }, { value: 4, x: 200 }, { value: 5, x: 250 }, { value: 6, x: 300 }, { value: 7, x: 350 }, { value: 8, x: 400 }, { value: 9, x: 450 }, { value: 10, x: 500 }]);
  });

  it('инициализировать параметры', () => {
    const model = new Model({
      min: 0,
      max: 10,
      step: 1,
      from: 3,
      to: 10
    });
    expect(model.initParameters()).to.deep.equal({ values: [3, 10], handleX: [150, 500] });
  });

  it('инициализировать параметры с неправильными from и  to', () => {
    const model = new Model({
      min: 0,
      max: 10,
      step: 1,
      from: 13,
      to: 19
    });
    expect(model.initParameters()).to.deep.equal({ values: [1, 9], handleX: [50, 450] });
  });

  it('получить позицию x по значению value', () => {
    const model = new Model({
      min: 0,
      max: 10,
      step: 1
    });
    expect(model.takeXByValue(5)).to.deep.equal(250);
  });

})
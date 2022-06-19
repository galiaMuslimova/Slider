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

  it('set config', () => {
    expect(model?.getConfig()).to.deep.equal({
      min: 0,
      max: 10,
      step: 1,
      from: 2,
      fromPosition: 100,
      to: 8,
      toPosition: 400,
      isVertical: false,
      hasTip: true,
      withRange: true,
    });
  });

  it('set defaults when miss options', () => {
    model = new Model({
      max: 50,
      step: 10,
      from: 10,
      to: 20,
    });
    expect(model?.getConfig()).to.deep.equal({
      min: 10,
      max: 50,
      step: 10,
      from: 10,
      fromPosition: 0,
      to: 20,
      toPosition: 0,
      isVertical: false,
      hasTip: true,
      withRange: true,
    });
  });

  it('correcting min and max', () => {
    model = new Model({
      min: 35,
      max: 25,
    });
    expect(model.getConfig().min).to.equal(25);
    expect(model.getConfig().max).to.equal(35);
  });

  it('init parameters', () => {
    const config = model?.getConfig();
    expect(model?.getConfig()).to.deep.equal({
      min: 0,
      max: 10,
      step: 1,
      from: 2,
      fromPosition: 100,
      to: 8,
      toPosition: 400,
      isVertical: false,
      hasTip: true,
      withRange: true,
    });
  });

  it('init parameters with wrong from and to', () => {
    model = new Model(
      $.extend({}, testOptions, {
        from: -8,
        to: 19,
      }),
    );
    model.init(testPositions);
    expect(model?.getConfig()).to.deep.equal({
      min: 0,
      max: 10,
      step: 1,
      from: 0,
      fromPosition: 0,
      to: 10,
      toPosition: 500,
      isVertical: false,
      hasTip: true,
      withRange: true,
    });
  });

  it('check changeParameter when key==from', () => {
    const options:ICoordinates = { key: 'from', position: 165 };
    model?.changeParameter(options);
    expect(model?.getConfig()).to.deep.equal({
      min: 0,
      max: 10,
      step: 1,
      from: 3,
      fromPosition: 150,
      to: 8,
      toPosition: 400,
      isVertical: false,
      hasTip: true,
      withRange: true,
    });
  });

  it('check changeParameter when key==to', () => {
    const options:ICoordinates = { key: 'to', position: 230 };
    model?.changeParameter(options);
    expect(model?.getConfig()).to.deep.equal({
      min: 0,
      max: 10,
      step: 1,
      from: 2,
      fromPosition: 100,
      to: 5,
      toPosition: 250,
      isVertical: false,
      hasTip: true,
      withRange: true,
    });
  });

  it('check changeParameter when change value', () => {
    model?.changeParameter({ value: 6 });
    const config = model?.getConfig();
    expect(model?.getConfig()).to.deep.equal({
      min: 0,
      max: 10,
      step: 1,
      from: 2,
      fromPosition: 100,
      to: 6,
      toPosition: 300,
      isVertical: false,
      hasTip: true,
      withRange: true,
    });
  });

  it('check changeParameter when change position', () => {
    model?.changeParameter({ position: 340 });
    expect(model?.getConfig()).to.deep.equal({
      min: 0,
      max: 10,
      step: 1,
      from: 2,
      fromPosition: 100,
      to: 7,
      toPosition: 350,
      isVertical: false,
      hasTip: true,
      withRange: true,
    });
  });
});

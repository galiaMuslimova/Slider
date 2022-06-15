import { IConfig, IDefaults } from './interfaces/interfaces';

const defaults: IDefaults = {
  min: 10,
  max: 40,
  step: 4,
  from: 8,
  to: 24,
  isVertical: false,
  hasTip: true,
  withRange: true,
};

const testOptions: IDefaults = {
  min: 0,
  max: 10,
  step: 1,
  from: 2,
  to: 8,
  isVertical: false,
  hasTip: true,
  withRange: true,
};

const testConfig: IConfig = {
  ...testOptions,
  fromPosition: 100,
  toPosition: 400,
};

const testPositions = [
  { value: 0, position: 0 },
  { value: 1, position: 50 },
  { value: 2, position: 100 },
  { value: 3, position: 150 },
  { value: 4, position: 200 },
  { value: 5, position: 250 },
  { value: 6, position: 300 },
  { value: 7, position: 350 },
  { value: 8, position: 400 },
  { value: 9, position: 450 },
  { value: 10, position: 500 },
];

export {
  defaults, testOptions, testConfig, testPositions,
};

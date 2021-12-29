import {
  IConfig, IOptions, IParameters, IPositions,
} from '../interfaces';

const defaults: IConfig = {
  min: 10,
  max: 40,
  step: 4,
  from: 8,
  to: 24,
  vertical: false,
  tip: true,
  range: true,
};

class Model {
  config: IConfig;

  options: IOptions;

  positionsArr: IPositions[];

  parameters: IParameters;

  trackStart: number;

  trackWidth: number;

  range: number;

  constructor(options: IOptions, trackStart: number = 0, trackWidth: number = 500) {
    this.options = this.correctOptions(options);
    this.config = this.correctConfig($.extend({}, defaults, this.options));
    this.trackStart = trackStart;
    this.trackWidth = trackWidth;
    this.range = this.config.max - this.config.min;
    this.positionsArr = this.initPositionsArr();
    this.parameters = this.initParameters();
  }

  correctOptions(options: IOptions = this.options) {
    const checkedNumConfig = { ...options };
    checkedNumConfig.max = Number.isInteger(options.max) ? options.max : defaults.max;
    checkedNumConfig.min = Number.isInteger(options.min) ? options.min : defaults.min;
    checkedNumConfig.step = Number.isInteger(options.step) ? options.step : defaults.step;
    checkedNumConfig.from = Number.isInteger(options.from) ? options.from : defaults.from;
    checkedNumConfig.to = Number.isInteger(options.to) ? options.to : defaults.to;
    return checkedNumConfig;
  }

  correctConfig(config: IConfig = this.config) {
    const checkedConfig = { ...config };
    checkedConfig.max = (config.max > config.min) ? config.max : config.min;
    checkedConfig.min = (config.max > config.min) ? config.min : config.max;
    checkedConfig.max = (config.max === config.min) ? checkedConfig.min + 10 : checkedConfig.max;
    checkedConfig.max = Math.round(checkedConfig.max);
    checkedConfig.min = Math.round(checkedConfig.min);
    const range = checkedConfig.max - checkedConfig.min;
    this.range = range;
    const isStepInRange = config.step * 2 < range && config.step * 20 > range;
    checkedConfig.step = isStepInRange ? Math.round(config.step) : Math.round(range / 10);
    const isFromInRange = config.from < checkedConfig.max && config.from >= checkedConfig.min;
    const from = isFromInRange ? Math.round(config.from) : (checkedConfig.min + checkedConfig.step);
    const isToInRange = config.to <= checkedConfig.max && config.to > checkedConfig.min;
    const to = isToInRange ? Math.round(config.to) : (checkedConfig.max - checkedConfig.step);
    checkedConfig.from = from < to ? from : to;
    checkedConfig.to = from < to ? to : from;
    return checkedConfig;
  }

  initStepsArr() {
    const stepLength = (this.trackWidth / this.range) * this.config.step;
    const stepsCount = Math.floor(this.range / this.config.step);
    const emptyArr = Array(stepsCount + 1);
    const valuesArr = Array.from(emptyArr, (_, i) => (this.config.min + this.config.step * i));
    const stepsArr: IPositions[] = [];
    valuesArr.map((el, index) => stepsArr.push({ value: el, x: Math.round(stepLength * index) }));
    return stepsArr;
  }

  initPositionsArr() {
    const valueLength = this.trackWidth / this.range;
    const valuesArr = Array.from(Array(this.range + 1), (_, i) => (this.config.min + i));
    const positionsArr: IPositions[] = [];
    valuesArr.map((el, i) => positionsArr.push({ value: el, x: Math.round(valueLength * i) }));
    return positionsArr;
  }

  initParameters() {
    const parameters: IParameters = { values: [], handleX: [] };
    const element = this;
    parameters.values[0] = this.config.from;
    if (this.config.range) {
      parameters.values[1] = this.config.to;
    }

    parameters.handleX = parameters.values.map((x) => element.takeXByValue(x));
    this.parameters = parameters;
    return parameters;
  }

  takeXByValue(val: number) {
    const position = this.positionsArr.find((el) => el.value === val);
    if (position) {
      return position.x;
    }

    throw new Error('position for this value is not consist');
  }

  takeParamHandleMove(options: { eventPosition: { pageX: number, pageY: number }, index: number }) {
    const { pageX } = options.eventPosition;
    const { pageY } = options.eventPosition;
    const { index } = options;
    const mousePosition = this.config.vertical ? pageY : pageX;
    const position = Math.round(mousePosition - this.trackStart);
    const isInScale = (position >= 0) && (position <= this.trackWidth);
    if (isInScale) {
      const positionParameters = this.positionsArr.find((el) => el.x === position);

      if (positionParameters) {
        this.parameters.values[index] = positionParameters.value;
        this.parameters.handleX[index] = positionParameters.x;
        const value = this.parameters.values[0];
        this.config.from = value;
        this.config.to = this.parameters.values[1] ? this.parameters.values[1] : this.config.to;
        return this.parameters;
      }

      return false;
    }

    return false;
  }

  takeParamScaleClick(value: number) {
    if (this.config.range) {
      const closest = this.parameters.values.reduce((prev, curr) => {
        const closestValue = Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
        return closestValue;
      });

      const index = this.parameters.values.indexOf(closest);
      this.parameters.values[index] = value;
      this.parameters.handleX[index] = this.takeXByValue(value);
      return this.parameters;
    }

    this.parameters.values = [value];
    this.parameters.handleX = [this.takeXByValue(value)];
    return this.parameters;
  }
}

export default Model;

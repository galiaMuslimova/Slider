import {
  IConfig, IOptions, IParameters, IPosition,
} from '../interfaces/interfaces';

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

  stepsArr: IPosition[];

  parameters: IParameters;

  trackStart: number;

  trackWidth: number;

  constructor(options: IOptions, trackStart: number = 0, trackWidth: number = 500) {
    this.trackStart = trackStart;
    this.trackWidth = trackWidth;
    this.options = this.correctOptionsType(options);
    this.config = $.extend({}, defaults, this.options);
    this.stepsArr = [];
    this.changeConfig();
    this.parameters = this.initParameters();
  }

  correctOptionsType(options: IOptions = this.options) {
    const correctConfig = { ...options };
    correctConfig.max = Number.isInteger(options.max) ? Math.round(options.max) : defaults.max;
    correctConfig.min = Number.isInteger(options.min) ? Math.round(options.min) : defaults.min;
    correctConfig.step = Number.isInteger(options.step) ? Math.round(options.step) : defaults.step;
    correctConfig.from = Number.isInteger(options.from) ? Math.round(options.from) : defaults.from;
    correctConfig.to = Number.isInteger(options.to) ? Math.round(options.to) : defaults.to;
    correctConfig.vertical = typeof options.vertical === 'boolean' ? options.vertical : defaults.vertical;
    correctConfig.tip = typeof options.tip === 'boolean' ? options.tip : defaults.tip;
    correctConfig.range = typeof options.range === 'boolean' ? options.range : defaults.range;
    return correctConfig;
  }

  changeConfig() {
    this.correctMinMaxStep();
    this.initStepsArr();
    this.correctFromTo();
  }

  correctMinMaxStep(config: IConfig = this.config) {
    const correctConfig = { ...config };
    correctConfig.max = (config.max > config.min) ? config.max : config.min;
    correctConfig.min = (config.max > config.min) ? config.min : config.max;
    correctConfig.max = (config.max === config.min) ? config.min + 10 : correctConfig.max;
    const range = correctConfig.max - correctConfig.min;
    const isStepInRange = config.step * 2 <= range && config.step * 20 >= range;
    correctConfig.step = isStepInRange ? config.step : Math.round(range / 10);
    this.config = correctConfig;
    return correctConfig;
  }

  initStepsArr() {
    const range = this.config.max - this.config.min;
    const stepLength = (this.trackWidth / range) * this.config.step;
    const stepsCount = Math.floor(range / this.config.step);
    const emptyArr = Array(stepsCount + 1);
    const valuesArr = Array.from(emptyArr, (_, i) => (this.config.min + this.config.step * i));
    const stepsArr: IPosition[] = [];
    valuesArr.map((el, index) => stepsArr.push({ value: el, x: Math.round(stepLength * index) }));
    if (valuesArr.indexOf(this.config.max) === -1) {
      valuesArr.push(this.config.max);
      stepsArr.push({ value: this.config.max, x: this.trackWidth });
    }
    this.stepsArr = stepsArr;
    return stepsArr;
  }

  correctFromTo(config: IConfig = this.config) {
    const correctConfig = { ...config };
    const from = Model.takeClosestNum(correctConfig.from, this.stepsArr, 'value');
    const to = Model.takeClosestNum(correctConfig.to, this.stepsArr, 'value');
    if (this.config.range) {
      correctConfig.from = from < to ? from : to;
      correctConfig.to = from < to ? to : from;
    } else {
      correctConfig.from = from;
    }
    this.config = correctConfig;
    return correctConfig;
  }

  static takeClosestNum(num: number, array: IPosition[], type: keyof IPosition) {
    const substractedArr = array.map((item) => Math.abs(item[type] - num));
    const indexOfClosestPosition = substractedArr.indexOf(Math.min(...substractedArr));
    const closestItem = array[indexOfClosestPosition];
    return closestItem[type];
  }

  initParameters() {
    const parameters: IParameters = { values: [], positions: [] };
    const element = this;
    parameters.values[0] = this.config.from;

    if (this.config.range) {
      parameters.values[1] = this.config.to;
    }

    parameters.positions = parameters.values.map((x) => element.takeXByValue(x));
    this.parameters = parameters;
    return parameters;
  }

  takeXByValue(val: number) {
    const position = this.stepsArr.find((el) => el.value === val);
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
      const substractedArr = this.stepsArr.map((item) => Math.abs(item.x - position));
      const indexOfClosestPosition = substractedArr.indexOf(Math.min(...substractedArr));
      const positionParameters = this.stepsArr[indexOfClosestPosition];
      this.parameters.values[index] = positionParameters.value;
      this.parameters.positions[index] = positionParameters.x;
      const value = this.parameters.values[0];
      this.config.from = value;
      this.config.to = this.parameters.values[1] ? this.parameters.values[1] : this.config.to;
      return this.parameters;
    }

    return false;
  }

  takeParamScaleClick(value: number) {
    if (this.config.range) {
      const index = Model.takeClosestIndex(this.parameters.values, value);
      this.parameters.values[index] = value;
      this.parameters.positions[index] = this.takeXByValue(value);
      return this.parameters;
    }

    this.parameters.values = [value];
    this.parameters.positions = [this.takeXByValue(value)];
    return this.parameters;
  }

  static takeClosestIndex(array: number[], value: number) {
    const closest = array.reduce((prev, curr) => {
      const closestValue = Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
      return closestValue;
    });
    const index = array.indexOf(closest);
    return index;
  }

  takeParamTrackClick(position: number) {
    const correctPosition = Model.takeClosestNum(position - this.trackStart, this.stepsArr, 'x');
    if (this.config.range) {
      const index = Model.takeClosestIndex(this.parameters.positions, correctPosition);
      this.parameters.positions[index] = correctPosition;
      this.parameters.values[index] = this.takeValueByX(correctPosition);
      return this.parameters;
    }

    this.parameters.values = [correctPosition];
    this.parameters.positions = [this.takeValueByX(correctPosition)];
    return this.parameters;
  }

  static takeClosestPosition(position: number, array: IPosition[]) {
    const substractedArr = array.map((item) => Math.abs(item.x - position));
    const indexOfClosestPosition = substractedArr.indexOf(Math.min(...substractedArr));
    return array[indexOfClosestPosition].x;
  }

  takeValueByX(x: number) {
    const item = this.stepsArr.find((el) => el.x === x);
    if (item) {
      return item.value;
    }

    throw new Error('value for this position is not consist');
  }
}

export default Model;

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
  private config: IConfig;

  readonly options: IOptions;

  private stepsArr: IPosition[];

  private parameters: IParameters;

  private trackStart: number;

  private trackWidth: number;

  constructor(options: IOptions, trackStart: number = 0, trackWidth: number = 500) {
    this.trackStart = trackStart;
    this.trackWidth = trackWidth;
    this.options = this.correctOptionsType(options);
    this.config = $.extend({}, defaults, this.options);
    this.correctMinMax();
    this.stepsArr = this.initStepsArr();
    this.correctFromTo();
    this.parameters = this.initParameters();
  }

  private correctOptionsType(options: IOptions = this.options) {
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

  public correctMinMax(config: IConfig = this.config) {
    const correctConfig = { ...config };
    correctConfig.max = (config.max > config.min) ? config.max : config.min;
    correctConfig.min = (config.max > config.min) ? config.min : config.max;
    correctConfig.max = (config.max === config.min) ? config.min + 10 : correctConfig.max;
    this.config = correctConfig;
    return correctConfig;
  }

  public initStepsArr() {
    const { min, max, step } = this.config;
    const range = max - min;
    const stepLength = (this.trackWidth / range) * step;
    const stepsCount = Math.floor(range / step);
    const emptyArr = Array(stepsCount + 1);
    const valuesArr = Array.from(emptyArr, (_, i) => (Model.round(min + Model.round(step * i))));
    const stepsArr: IPosition[] = [];
    valuesArr.map((el, index) => stepsArr.push({ value: el, x: Math.round(stepLength * index) }));
    if (valuesArr.indexOf(max) === -1) {
      valuesArr.push(max);
      stepsArr.push({ value: max, x: this.trackWidth });
    }

    this.stepsArr = stepsArr;
    return stepsArr;
  }

  static round(num: number) {
    return (Math.round(num * 10)) / 10;
  }

  public correctFromTo(config: IConfig = this.config) {
    const correctConfig = { ...config };
    const valuesArr = this.stepsArr.map((item) => item.value);
    const from = Model.takeClosestNum(correctConfig.from, valuesArr);
    const to = Model.takeClosestNum(correctConfig.to, valuesArr);
    if (this.config.range) {
      correctConfig.from = from < to ? from : to;
      correctConfig.to = from < to ? to : from;
    } else {
      correctConfig.from = from;
    }

    this.config = correctConfig;
    return correctConfig;
  }

  static takeClosestNum(num: number, array: number[]) {
    const indexOfClosest = Model.takeClosestIndex(num, array);
    return array[indexOfClosest];
  }

  static takeClosestIndex(num: number, array: number[]) {
    const closest = array.reduce((a, b) => (Math.abs(b - num) < Math.abs(a - num) ? b : a));
    return array.indexOf(closest);
  }

  public initParameters() {
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

  private takeXByValue(val: number) {
    const position = this.stepsArr.find((el) => el.value === val);
    if (position) {
      return position.x;
    }

    throw new Error('position for this value is not consist');
  }

  public takeParamHandleMove(options: { eventPosition: number, index: number }) {
    const { eventPosition } = options;
    const { index } = options;
    const position = Math.round(eventPosition - this.trackStart);
    const isInScale = (position >= 0) && (position <= this.trackWidth);
    if (isInScale) {
      const positionsArr = this.stepsArr.map((item) => item.x);
      const stepsArrClosestIndex = Model.takeClosestIndex(position, positionsArr);
      const stepsArrItem = this.stepsArr[stepsArrClosestIndex];
      this.parameters.values[index] = stepsArrItem.value;
      this.parameters.positions[index] = stepsArrItem.x;
      return this.parameters;
    }

    return false;
  }

  public correctFromToByParams() {
    this.parameters.values.sort();
    this.parameters.positions.sort();
    const value = this.parameters.values[0];
    this.config.from = value;
    this.config.to = this.parameters.values[1] ? this.parameters.values[1] : this.config.to;
  }

  public takeParamScaleClick(value: number) {
    if (this.config.range) {
      const index = Model.takeClosestIndex(value, this.parameters.values);
      this.parameters.values[index] = value;
      this.parameters.positions[index] = this.takeXByValue(value);
      return this.parameters;
    }

    this.parameters.values = [value];
    this.parameters.positions = [this.takeXByValue(value)];
    return this.parameters;
  }

  public takeParamTrackClick(position: number) {
    const positionsArr = this.stepsArr.map((item) => item.x);
    const closestPosition = Model.takeClosestNum(position, positionsArr);
    if (this.config.range) {
      const index = Model.takeClosestIndex(closestPosition, this.parameters.positions);
      this.parameters.positions[index] = closestPosition;
      this.parameters.values[index] = this.takeValueByX(closestPosition);
      return this.parameters;
    }

    this.parameters.positions = [closestPosition];
    this.parameters.values = [this.takeValueByX(closestPosition)];
    return this.parameters;
  }

  private takeValueByX(x: number) {
    const item = this.stepsArr.find((el) => el.x === x);
    if (item) {
      return item.value;
    }

    throw new Error('value for this position is not consist');
  }

  public getConfig() {
    return this.config;
  }

  public setConfig(config: IConfig) {
    this.config = config;
  }

  public getParameters() {
    return this.parameters;
  }

  public setTrackStart(trackStart: number = 0) {
    this.trackStart = trackStart;
  }

  public settrackWidth(trackWidth: number = 500) {
    this.trackWidth = trackWidth;
  }

  public getStepsArr() {
    return this.stepsArr;
  }
}

export default Model;

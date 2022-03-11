import {
  IOptions, IConfig, IParameters, IStepsArr, IEventPosition,
} from '../interfaces/interfaces';
import IModel from './interface';

const defaults = {
  min: 10,
  max: 40,
  step: 4,
  from: 8,
  to: 24,
  vertical: false,
  tip: true,
  range: true,
};

class Model implements IModel {
  readonly options: IOptions;

  private config: IConfig;

  private stepsArr: IStepsArr[];

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

  public correctMinMax(config: IConfig = this.config): IConfig {
    const correctConfig = { ...config };
    correctConfig.max = (config.max > config.min) ? config.max : config.min;
    correctConfig.min = (config.max > config.min) ? config.min : config.max;
    correctConfig.max = (config.max === config.min) ? config.min + 10 : correctConfig.max;
    this.config = correctConfig;
    return correctConfig;
  }

  public initStepsArr(): IStepsArr[] {
    const { min, max, step } = this.config;
    const range = max - min;
    const stepLength = (this.trackWidth / range) * step;
    const stepsCount = Math.floor(range / step);
    const emptyArr = Array(stepsCount + 1);
    const valuesArr = Array.from(emptyArr, (_, i) => (Model.round(min + Model.round(step * i))));
    const stepsArr: IStepsArr[] = [];
    valuesArr.map((el, index) => stepsArr.push({ value: el, x: Math.round(stepLength * index) }));
    if (valuesArr.indexOf(max) === -1) {
      valuesArr.push(max);
      stepsArr.push({ value: max, x: this.trackWidth });
    }

    this.stepsArr = stepsArr;
    return stepsArr;
  }

  public correctFromTo(config: IConfig = this.config): IConfig {
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

  public initParameters(): IParameters {
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

  public takeParamHandleMove(options: IEventPosition): IParameters | boolean {
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

  public correctFromToByParams(): void {
    this.parameters.values.sort();
    this.parameters.positions.sort();
    const value = this.parameters.values[0];
    this.config.from = value;
    this.config.to = this.parameters.values[1] ? this.parameters.values[1] : this.config.to;
  }

  public takeParamScaleClick(value: number): IParameters {
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

  public takeParamTrackClick(position: number): IParameters {
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

  public getConfig(): IConfig {
    return this.config;
  }

  public setConfig(config: IConfig): void {
    this.config = config;
  }

  public getParameters(): IParameters {
    return this.parameters;
  }

  public setTrackStart(trackStart: number = 0): void {
    this.trackStart = trackStart;
  }

  public settrackWidth(trackWidth: number | undefined): void {
    this.trackWidth = trackWidth === undefined ? 500 : trackWidth;
  }

  public getStepsArr(): IStepsArr[] {
    return this.stepsArr;
  }

  static takeClosestNum(num: number, array: number[]): number {
    const indexOfClosest = Model.takeClosestIndex(num, array);
    return array[indexOfClosest];
  }

  static takeClosestIndex(num: number, array: number[]): number {
    const closest = array.reduce((a, b) => (Math.abs(b - num) < Math.abs(a - num) ? b : a));
    return array.indexOf(closest);
  }

  static round(num: number): number {
    return (Math.round(num * 10)) / 10;
  }

  private correctOptionsType(options: IOptions = this.options):IOptions {
    const correctOptions = { ...options };
    correctOptions.max = Number.isInteger(options.max) ? Math.round(options.max) : defaults.max;
    correctOptions.min = Number.isInteger(options.min) ? Math.round(options.min) : defaults.min;
    correctOptions.step = Number.isInteger(options.step) ? Math.round(options.step) : defaults.step;
    correctOptions.from = Number.isInteger(options.from) ? Math.round(options.from) : defaults.from;
    correctOptions.to = Number.isInteger(options.to) ? Math.round(options.to) : defaults.to;
    correctOptions.vertical = typeof options.vertical === 'boolean' ? options.vertical : defaults.vertical;
    correctOptions.tip = typeof options.tip === 'boolean' ? options.tip : defaults.tip;
    correctOptions.range = typeof options.range === 'boolean' ? options.range : defaults.range;
    return correctOptions;
  }

  private takeXByValue(val: number): number {
    const position = this.stepsArr.find((el) => el.value === val);
    if (position) {
      return position.x;
    }

    throw new Error('position for this value is not consist');
  }

  private takeValueByX(x: number): number {
    const item = this.stepsArr.find((el) => el.x === x);
    if (item) {
      return item.value;
    }

    throw new Error('value for this position is not consist');
  }
}

export default Model;

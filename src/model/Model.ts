import {
  IOptions, IConfig, IParameters, IEventPosition, ISettings,
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

  private stepsArr: IParameters[];

  private parameters: IParameters[];

  private trackStart: number;

  private trackWidth: number;

  constructor(options: IOptions) {
    this.options = this.correctOptionsType(options);
    this.config = $.extend({}, defaults, this.options);
    this.trackStart = 0;
    this.trackWidth = 500;
    this.stepsArr = [];
    this.parameters = [];
  }

  public init() {
    this.config = this.correctMinMax();
    this.stepsArr = this.initStepsArr();
    this.config = this.correctFromTo();
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

  public initStepsArr(): IParameters[] {
    const { min, max, step } = this.config;
    const range = max - min;
    const stepLength = (this.trackWidth / range) * step;
    const arrStep = stepLength < 1 ? Math.floor(1 / stepLength) : 1;
    const stepsCount = Math.floor((range / step) / arrStep);
    const emptyArr = Array(stepsCount + 1);
    const multiplyStep = step * 10 * arrStep;
    const positionLength = stepLength * arrStep;
    let stepsArr: IParameters[] = [];
    const valuesArr = Array.from(emptyArr, (_, i) => (min + Math.round(multiplyStep * i) / 10));
    stepsArr = valuesArr.map((el, i) => {
      const value = Math.round(el * 10) / 10;
      const position = Math.round(positionLength * i);
      return { value, position };
    });
    if (valuesArr[valuesArr.length - 1] !== max) {
      stepsArr.push({ value: max, position: this.trackWidth });
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

  public initParameters(): IParameters[] {
    const parameters: IParameters[] = [];
    const item: IParameters = {
      value: this.config.from,
      position: 0,
    };
    const stepValues = this.stepsArr.map((el) => el.value);
    const firstIndex = Model.takeClosestIndex(item.value, stepValues);
    item.position = this.stepsArr[firstIndex].position;
    parameters.push(item);
    if (this.config.range) {
      const secondItem: IParameters = {
        value: this.config.to,
        position: 0,
      };
      const secondIndex = Model.takeClosestIndex(secondItem.value, stepValues);
      secondItem.position = this.stepsArr[secondIndex].position;
      parameters.push(secondItem);
    }

    this.parameters = parameters;
    return parameters;
  }

  public moveHandle(options: IEventPosition): IParameters[] | undefined {
    const { eventPosition } = options;
    const { index } = options;
    const position = Math.round(eventPosition - this.trackStart);
    const isInScale = (position >= 0) && (position <= this.trackWidth);
    if (isInScale) {
      const positionsArr = this.stepsArr.map((item) => item.position);
      const stepsArrClosestIndex = Model.takeClosestIndex(position, positionsArr);
      const stepsArrItem = this.stepsArr[stepsArrClosestIndex];
      this.parameters[index].value = stepsArrItem.value;
      this.parameters[index].position = stepsArrItem.position;
      return this.parameters;
    }
    return undefined;
  }

  public correctFromToByParams(): { from: number, to: number } {
    if (this.config.range) {
      this.config.from = Math.min(this.parameters[0].value, this.parameters[1].value);
      this.config.to = Math.max(this.parameters[0].value, this.parameters[1].value);
    } else {
      this.config.from = this.parameters[0].value;
    }
    return { from: this.config.from, to: this.config.to };
  }

  public takeParamScaleClick(value: number): IParameters[] {
    if (this.config.range) {
      const values = [this.parameters[0].value, this.parameters[1].value];
      const index = Model.takeClosestIndex(value, values);
      this.parameters[index].value = value;
      this.parameters[index].position = this.takeXByValue(value);
      this.correctFromToByParams();
      return this.parameters;
    }

    this.parameters[0].value = value;
    this.parameters[0].position = this.takeXByValue(value);
    this.correctFromToByParams();
    return this.parameters;
  }

  public takeParamTrackClick(position: number): IParameters[] {
    const positionsArr = this.stepsArr.map((item) => item.position);
    const closestPosition = Model.takeClosestNum(position, positionsArr);
    if (this.config.range) {
      const positions = [this.parameters[0].position, this.parameters[1].position];
      const index = Model.takeClosestIndex(closestPosition, positions);
      this.parameters[index].position = closestPosition;
      this.parameters[index].value = this.takeValueByX(closestPosition);
      this.correctFromToByParams();
      return this.parameters;
    }

    this.parameters[0].position = closestPosition;
    this.parameters[0].value = this.takeValueByX(closestPosition);
    this.correctFromToByParams();
    return this.parameters;
  }

  public getConfig(): IConfig {
    return this.config;
  }

  public setConfig(config: IConfig): void {
    this.config = config;
  }

  public setSetting(setting: ISettings): void {
    this.config = $.extend({}, this.config, setting);
  }

  public getParameters(): IParameters[] {
    return this.parameters;
  }

  public getVertical(): boolean {
    return this.config.vertical;
  }

  public setVertical(vertical: boolean): void {
    this.config.vertical = vertical;
  }

  public getRange(): boolean {
    return this.config.range;
  }

  public setTrackParameters(trackStart: number, trackWidth: number | undefined): void {
    this.trackStart = trackStart;
    this.trackWidth = trackWidth === undefined ? 500 : trackWidth;
  }

  public getStepsArr(): IParameters[] {
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
    const item = this.stepsArr.find((el) => el.value === val);
    if (item) {
      return item.position;
    }

    throw new Error('position for this value is not consist');
  }

  private takeValueByX(x: number): number {
    const item = this.stepsArr.find((el) => el.position === x);
    if (item) {
      return item.value;
    }

    throw new Error('value for this position is not consist');
  }
}

export default Model;

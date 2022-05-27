import {
  IOptions, IConfig, IParameters, ISettings, IData, ITrackPosition, ICoordinates,
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
  private options: IOptions;

  private data: IData;

  constructor(options: IOptions) {
    this.options = options;
    this.data = {
      config: this.correctConfig(this.options),
      trackParameters: { trackStart: 0, trackWidth: 500 },
      stepsArr: [],
      parameters: [],
    };
  }

  public init(trackParameters: ITrackPosition): IData {
    const { trackStart, trackWidth } = trackParameters;
    this.data.trackParameters.trackStart = trackStart;
    this.data.trackParameters.trackWidth = trackWidth === undefined ? 500 : trackWidth;
    this.data.config = this.correctMinMax();
    this.data.stepsArr = this.initStepsArr();
    this.data.config = this.correctFromTo();
    this.data.parameters = this.initParameters();
    this.correctFromToByParams();
    return this.data;
  }

  public changeParameter(parameter: ICoordinates): IParameters[] {
    const newParameter = this.takeClosestParameter(parameter);
    const parameterOrder = parameter.key || this.makeOrder(parameter);
    this.data.parameters[parameterOrder] = newParameter;
    const values = this.getValues();
    this.options.onChange?.call(this, values);
    return this.data.parameters;
  }

  public correctFromToByParams(): IData {
    const { config, parameters } = this.data;
    if (config.range) {
      const isFirstLower = parameters[0].value < parameters[1].value;
      const minParameter = isFirstLower ? parameters[0] : parameters[1];
      const maxParameter = isFirstLower ? parameters[1] : parameters[0];
      config.from = minParameter.value;
      config.to = maxParameter.value;
      parameters[1] = maxParameter;
      parameters[0] = minParameter;
    } else {
      config.from = parameters[0].value;
    }
    this.data.config = config;
    this.data.parameters = parameters;
    return this.data;
  }

  public setOptions(options: IOptions): void {
    this.options = $.extend(this.options, options);
    this.data.config = this.correctConfig(this.options);
  }

  public getData(): IData {
    return this.data;
  }

  public getConfig(): IConfig {
    return this.data.config;
  }

  public setSetting(setting: ISettings): void {
    this.data.config = $.extend({}, this.data.config, setting);
  }

  public getValues(): number[] {
    const { parameters } = this.data;
    const values: number[] = [parameters[0].value];
    if (this.data.config.range) {
      values.push(parameters[1].value);
    }
    return values;
  }

  static takeClosestNum(num: number, array: number[]): number {
    const indexOfClosest = Model.takeClosestIndex(num, array);
    return array[indexOfClosest];
  }

  static takeClosestIndex(num: number, array: number[]): number {
    const closest = array.reduce((a, b) => (Math.abs(b - num) < Math.abs(a - num) ? b : a));
    return array.indexOf(closest);
  }

  private correctConfig(options: IOptions = this.options): IConfig {
    const config = { ...defaults };
    config.max = Number.isFinite(Number(options.max)) ? Number(options.max) : defaults.max;
    config.min = Number.isFinite(Number(options.min)) ? Number(options.min) : defaults.min;
    config.step = Number.isFinite(Number(options.step)) ? Number(options.step) : defaults.step;
    config.from = Number.isFinite(Number(options.from)) ? Number(options.from) : defaults.from;
    config.to = Number.isFinite(Number(options.to)) ? Number(options.to) : defaults.to;
    config.vertical = typeof options.vertical === 'boolean' ? options.vertical : defaults.vertical;
    config.tip = typeof options.tip === 'boolean' ? options.tip : defaults.tip;
    config.range = typeof options.range === 'boolean' ? options.range : defaults.range;
    return config;
  }

  private correctMinMax(config: IConfig = this.data.config): IConfig {
    const correctConfig = { ...config };
    correctConfig.max = (config.max > config.min) ? config.max : config.min;
    correctConfig.min = (config.max > config.min) ? config.min : config.max;
    correctConfig.max = (config.max === config.min) ? config.min + 10 : correctConfig.max;
    correctConfig.from = (config.from < config.min) ? config.min : config.from;
    correctConfig.to = (config.to > config.max) ? config.max : config.to;
    return correctConfig;
  }

  private initStepsArr(): IParameters[] {
    const { min, max, step } = this.data.config;
    const { trackWidth } = this.data.trackParameters;
    const range = max - min;
    const stepLength = (trackWidth / range) * step;
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
      stepsArr.push({ value: max, position: trackWidth });
    }
    this.data.stepsArr = stepsArr;
    return stepsArr;
  }

  private correctFromTo(config: IConfig = this.data.config): IConfig {
    const correctConfig = { ...config };
    const valuesArr = this.data.stepsArr.map((item) => item.value);
    const from = Model.takeClosestNum(correctConfig.from, valuesArr);
    const to = Model.takeClosestNum(correctConfig.to, valuesArr);
    if (this.data.config.range) {
      correctConfig.from = from < to ? from : to;
      correctConfig.to = from < to ? to : from;
    } else {
      correctConfig.from = from;
    }

    this.data.config = correctConfig;
    return correctConfig;
  }

  private initParameters(): IParameters[] {
    const parameters: IParameters[] = [];
    const item: IParameters = {
      value: this.data.config.from,
      position: 0,
    };
    const stepValues = this.data.stepsArr.map((el) => el.value);
    const firstIndex = Model.takeClosestIndex(item.value, stepValues);
    item.position = this.data.stepsArr[firstIndex].position;
    parameters.push(item);
    if (this.data.config.range) {
      const secondItem: IParameters = {
        value: this.data.config.to,
        position: 0,
      };
      const secondIndex = Model.takeClosestIndex(secondItem.value, stepValues);
      secondItem.position = this.data.stepsArr[secondIndex].position;
      parameters.push(secondItem);
    }

    this.data.parameters = parameters;
    return parameters;
  }

  private makeOrder(parameter: ICoordinates): number {
    if (!this.data.config.range) {
      return 0;
    }
    const { value, position } = parameter;
    if (value && !position) {
      const values = [this.data.parameters[0].value, this.data.parameters[1].value];
      return Model.takeClosestIndex(value, values);
    }
    if (position && !value) {
      const positions = [this.data.parameters[0].position, this.data.parameters[1].position];
      return Model.takeClosestIndex(position, positions);
    }
    throw new Error('wrong parameter for order');
  }

  private takeClosestParameter(parameter: ICoordinates) {
    let index = null;
    if (parameter.position) {
      index = Model.takeClosestIndex(parameter.position, this.takeStepsArrPositions());
      return this.data.stepsArr[index];
    }

    if (parameter.value) {
      index = Model.takeClosestIndex(parameter.value, this.takeStepsArrValues());
      return this.data.stepsArr[index];
    }

    throw new Error('wrong parameters');
  }

  private takeStepsArrValues() {
    return this.data.stepsArr.map((item) => item.value);
  }

  private takeStepsArrPositions() {
    return this.data.stepsArr.map((item) => item.position);
  }
}

export default Model;

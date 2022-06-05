import {
  IOptions,
  IConfig,
  IParameters,
  ICoordinates,
} from '../interfaces/interfaces';
import IModel from './interface';
import defaults from '../defaults';

class Model implements IModel {
  private options: IOptions;

  private parameters: IParameters[];

  private config: IConfig;

  private data: IParameters[];

  constructor(options: IOptions) {
    this.options = options;
    this.parameters = [
      { value: 0, position: 0 },
      { value: 0, position: 0 },
    ];
    this.config = this.correctConfig(this.options);
    this.data = [];
  }

  public init(data: IParameters[]): void {
    this.data = data;
    this.correctConfigByArray();
    this.parameters = this.initParameters();
  }

  public correctParameters(): void {
    const isFromHigher = this.config.from > this.config.to;
    if (this.config.range && isFromHigher) {
      const firstParameter = this.parameters[0];
      const secondParameter = this.parameters[1];
      this.parameters[0] = secondParameter;
      this.parameters[1] = firstParameter;
      this.config.from = this.parameters[0].value;
      this.config.to = this.parameters[1].value;
      this.options.onChange?.call(this, this.config);
    }
  }

  public changeParameter(setting: ICoordinates): IParameters[] {
    const newParameter = this.takeClosestParameter(setting);
    const parameterOrder = setting.key || this.makeOrder(setting);
    this.parameters[parameterOrder] = newParameter;
    this.config.from = this.parameters[0].value;
    this.config.to = this.parameters[1].value;
    this.options.onChange?.call(this, this.config);
    return this.parameters;
  }

  public setOptions(options: IOptions): void {
    const newOptions = $.extend(this.options, this.config, options);
    this.options = $.extend(this.options, options);
    this.config = this.correctConfig(newOptions);
  }

  public getConfig(): IConfig {
    return this.config;
  }

  public getParameters(): IParameters[] {
    return this.parameters;
  }

  static takeClosestIndex(num: number, array: number[]): number {
    const closest = array.reduce((a, b) => (Math.abs(b - num) < Math.abs(a - num) ? b : a));
    return array.indexOf(closest);
  }

  private correctConfig(options: IOptions): IConfig {
    let newConfig = this.correctTypes(options);
    newConfig = this.correctMinMax(newConfig);
    return newConfig;
  }

  private correctTypes(options: IOptions = this.options): IConfig {
    const config = { ...defaults };
    config.max = Number.isFinite(Number(options.max))
      ? Number(options.max)
      : defaults.max;
    config.min = Number.isFinite(Number(options.min))
      ? Number(options.min)
      : defaults.min;
    config.step = Number.isFinite(Number(options.step))
      ? Number(options.step)
      : defaults.step;
    config.from = Number.isFinite(Number(options.from))
      ? Number(options.from)
      : defaults.from;
    config.to = Number.isFinite(Number(options.to))
      ? Number(options.to)
      : defaults.to;
    config.vertical = typeof options.vertical === 'boolean'
      ? options.vertical
      : defaults.vertical;
    config.tip = typeof options.tip === 'boolean' ? options.tip : defaults.tip;
    config.range = typeof options.range === 'boolean' ? options.range : defaults.range;
    return config;
  }

  private correctMinMax(config: IConfig = this.config): IConfig {
    const correctConfig = { ...config };
    correctConfig.max = config.max > config.min ? config.max : config.min;
    correctConfig.min = config.max > config.min ? config.min : config.max;
    correctConfig.max = config.max === config.min ? config.min + 10 : correctConfig.max;
    correctConfig.from = config.from < config.min ? config.min : config.from;
    correctConfig.to = config.to > config.max ? config.max : config.to;
    return correctConfig;
  }

  private correctConfigByArray(config: IConfig = this.config): IConfig {
    const correctConfig = { ...config };
    const valuesArr = this.data.map((item) => item.value);
    const firstIndex = Model.takeClosestIndex(config.from, valuesArr);
    correctConfig.from = this.data[firstIndex].value;
    const secondIndex = Model.takeClosestIndex(config.to, valuesArr);
    correctConfig.to = this.data[secondIndex].value;
    this.config = correctConfig;
    return correctConfig;
  }

  private initParameters(): IParameters[] {
    const { parameters } = this;
    const stepValues = this.data.map((el) => el.value);
    const firstIndex = Model.takeClosestIndex(this.config.from, stepValues);
    parameters[0].value = this.config.from;
    parameters[0].position = this.data[firstIndex].position;
    if (this.config.range) {
      const secondIndex = Model.takeClosestIndex(this.config.to, stepValues);
      parameters[1].value = this.config.to;
      parameters[1].position = this.data[secondIndex].position;
    }
    return parameters;
  }

  private makeOrder(parameter: ICoordinates): number {
    if (!this.config.range) {
      return 0;
    }
    const { value, position } = parameter;
    if (value && !position) {
      const values = [this.parameters[0].value, this.parameters[1].value];
      return Model.takeClosestIndex(value, values);
    }
    if (position && !value) {
      const positions = [
        this.parameters[0].position,
        this.parameters[1].position,
      ];
      return Model.takeClosestIndex(position, positions);
    }
    throw new Error('wrong parameter for order');
  }

  private takeClosestParameter(parameter: ICoordinates) {
    let index = null;
    if (parameter.position) {
      index = Model.takeClosestIndex(
        parameter.position,
        this.takeStepsArrPositions(),
      );
      return this.data[index];
    }

    if (parameter.value) {
      index = Model.takeClosestIndex(
        parameter.value,
        this.takeStepsArrValues(),
      );
      return this.data[index];
    }

    throw new Error('wrong parameters');
  }

  private takeStepsArrValues() {
    return this.data.map((item) => item.value);
  }

  private takeStepsArrPositions() {
    return this.data.map((item) => item.position);
  }
}

export default Model;

import {
  IOptions,
  IConfig,
  ICoordinates,
  IParameters,
  IPositions,
} from '../interfaces/interfaces';
import IModel from './interface';
import defaults from '../defaults';

class Model implements IModel {
  private options: IOptions;

  private parameters: IParameters;

  private config: IConfig;

  private positions: IPositions[];

  constructor(options: IOptions) {
    this.options = options;
    this.parameters = {
      from: { value: 0, position: 0 },
      to: { value: 0, position: 0 },
    };
    this.config = this.correctConfig(this.options);
    this.positions = [];
  }

  public init(positions: IPositions[]): void {
    this.positions = positions;
    this.correctConfigByArray();
    this.parameters = this.initParameters();
  }

  public correctParameters(): void {
    const isFromHigher = this.config.from > this.config.to;
    if (this.config.withRange && isFromHigher) {
      const firstParameter = this.parameters.from;
      const secondParameter = this.parameters.to;
      this.parameters.from = secondParameter || this.parameters.from;
      this.parameters.to = firstParameter;
      this.config.from = this.parameters.from.value;
      this.config.to = this.parameters.to.value;
      this.options.onChange?.call(this, this.config);
    }
  }

  public changeParameter(setting: ICoordinates): IParameters {
    const newParameter = this.takeClosestParameter(setting);
    const parameterOrder = setting.key || this.makeOrder(setting);
    const type = parameterOrder === 0 ? 'from' : 'to';
    this.parameters[type] = newParameter;
    this.config.from = this.parameters.from.value;
    this.config.to = this.parameters.to?.value || this.config.from;
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

  public getParameters(): IParameters {
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
    config.isVertical = typeof options.isVertical === 'boolean'
      ? options.isVertical
      : defaults.isVertical;
    config.hasTip = typeof options.hasTip === 'boolean' ? options.hasTip : defaults.hasTip;
    config.withRange = typeof options.withRange === 'boolean' ? options.withRange : defaults.withRange;
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
    const valuesArr = this.positions.map((item) => item.value);
    const firstIndex = Model.takeClosestIndex(config.from, valuesArr);
    correctConfig.from = this.positions[firstIndex].value;
    const secondIndex = Model.takeClosestIndex(config.to, valuesArr);
    correctConfig.to = this.positions[secondIndex].value;
    this.config = correctConfig;
    return correctConfig;
  }

  private initParameters(): IParameters {
    const { parameters } = this;
    const stepValues = this.positions.map((el) => el.value);
    const firstIndex = Model.takeClosestIndex(this.config.from, stepValues);
    parameters.from.value = this.config.from;
    parameters.from.position = this.positions[firstIndex].position;
    if (this.config.withRange && parameters.to) {
      const secondIndex = Model.takeClosestIndex(this.config.to, stepValues);
      parameters.to.value = this.config.to;
      parameters.to.position = this.positions[secondIndex].position;
    }
    return parameters;
  }

  private makeOrder(parameter: ICoordinates): number {
    if (!this.config.withRange) {
      return 0;
    }
    const { value, position } = parameter;
    if (value && !position) {
      const values = [
        this.parameters.from.value,
        this.parameters.to?.value || this.parameters.from.value,
      ];
      return Model.takeClosestIndex(value, values);
    }
    if (position && !value) {
      const positions = [
        this.parameters.from.position,
        this.parameters.to?.position || this.parameters.from.position,
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
        this.takepositionsPositions(),
      );
      return this.positions[index];
    }

    if (parameter.value) {
      index = Model.takeClosestIndex(
        parameter.value,
        this.takepositionsValues(),
      );
      return this.positions[index];
    }

    throw new Error('wrong parameters');
  }

  private takepositionsValues() {
    return this.positions.map((item) => item.value);
  }

  private takepositionsPositions() {
    return this.positions.map((item) => item.position);
  }
}

export default Model;

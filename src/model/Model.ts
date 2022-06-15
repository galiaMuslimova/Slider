import {
  IOptions,
  IConfig,
  ICoordinates,
  IPositions,
} from '../interfaces/interfaces';
import IModel from './interface';
import { defaults } from '../defaults';

class Model implements IModel {
  private options: IOptions;

  private config: IConfig;

  private positions: IPositions[];

  constructor(options: IOptions) {
    this.options = options;
    this.config = this.createConfig(this.options);
    this.positions = [];
  }

  public init(positions: IPositions[]): void {
    this.positions = positions;
    this.correctConfigByPositions();
  }

  public correctParameters(): void {
    const isFromHigher = this.config.from > this.config.to;
    if (this.config.withRange && isFromHigher) {
      const { from, fromPosition } = { ...this.config };
      this.config.from = this.config.to;
      this.config.fromPosition = this.config.toPosition;
      this.config.to = from;
      this.config.toPosition = fromPosition;
      this.options.onChange?.call(this, this.getOptions());
    }
  }

  public changeParameter(setting: ICoordinates): void {
    const newParameter = this.takeClosestParameter(setting);
    const parameterOrder = setting.key || this.makeOrder(setting);
    const type = parameterOrder === 0 ? 'from' : 'to';
    this.config[type] = newParameter.value;
    this.config[`${type}Position`] = newParameter.position;
    this.options.onChange?.call(this, this.getOptions());
  }

  public setOptions(options: IOptions): void {
    const newOptions = $.extend(this.options, this.config, options);
    this.options = $.extend(this.options, options);
    this.config = this.createConfig(newOptions);
  }

  public getConfig(): IConfig {
    return this.config;
  }

  public getOptions(): IOptions {
    const options = (({
      min,
      max,
      step,
      from,
      to,
      withRange,
      hasTip,
      isVertical,
    }) => ({
      min,
      max,
      step,
      from,
      to,
      withRange,
      hasTip,
      isVertical,
    }))(this.config);
    return options;
  }

  static takeClosestIndex(num: number, array: number[]): number {
    const closest = array.reduce((a, b) => (Math.abs(b - num) < Math.abs(a - num) ? b : a));
    return array.indexOf(closest);
  }

  private createConfig(options: IOptions): IConfig {
    let newOptions = this.correctTypes(options);
    newOptions = this.correctMinMax(newOptions);
    return newOptions;
  }

  private correctTypes(options: IOptions = this.options): IConfig {
    const newOptions: IConfig = $.extend({}, defaults, {
      fromPosition: 0,
      toPosition: 0,
    });
    newOptions.max = Number.isFinite(Number(options.max))
      ? Number(options.max)
      : defaults.max;
    newOptions.min = Number.isFinite(Number(options.min))
      ? Number(options.min)
      : defaults.min;
    newOptions.step = Number.isFinite(Number(options.step))
      ? Number(options.step)
      : defaults.step;
    newOptions.from = Number.isFinite(Number(options.from))
      ? Number(options.from)
      : defaults.from;
    newOptions.to = Number.isFinite(Number(options.to))
      ? Number(options.to)
      : defaults.to;
    newOptions.isVertical = typeof options.isVertical === 'boolean'
      ? options.isVertical
      : defaults.isVertical;
    newOptions.hasTip = typeof options.hasTip === 'boolean' ? options.hasTip : defaults.hasTip;
    newOptions.withRange = typeof options.withRange === 'boolean'
      ? options.withRange
      : defaults.withRange;
    return newOptions;
  }

  private correctMinMax(config: IConfig = this.config): IConfig {
    const correctConfig = { ...config };
    correctConfig.max = config.max > config.min ? config.max : config.min;
    correctConfig.min = config.max > config.min ? config.min : config.max;
    correctConfig.max = config.max === config.min ? config.min + 10 : correctConfig.max;
    correctConfig.from = config.from < config.min ? config.min : config.from;
    correctConfig.to = config.to && config.to > config.max ? config.max : config.to;
    return correctConfig;
  }

  private correctConfigByPositions(): void {
    ['from', 'to'].forEach((item) => {
      const correctItem = item as 'from' | 'to';
      const valuesArr = this.positions.map((el) => el.value);
      const index = Model.takeClosestIndex(this.config[correctItem], valuesArr);
      this.config[correctItem] = this.positions[index].value;
      this.config[`${correctItem}Position`] = this.positions[index].position;
    });
  }

  private makeOrder(parameter: ICoordinates): number {
    if (!this.config.withRange) {
      return 0;
    }
    const { value, position } = parameter;
    if (value && !position) {
      const values = [this.config.from, this.config.to];
      return Model.takeClosestIndex(value, values);
    }
    if (position && !value) {
      const positions = [this.config.fromPosition, this.config.toPosition];
      return Model.takeClosestIndex(position, positions);
    }
    throw new Error('wrong parameter for order');
  }

  private takeClosestParameter(parameter: ICoordinates) {
    let index = null;
    if (parameter.position) {
      index = Model.takeClosestIndex(
        parameter.position,
        this.positions.map((item) => item.position),
      );
      return this.positions[index];
    }

    if (parameter.value) {
      index = Model.takeClosestIndex(
        parameter.value,
        this.positions.map((item) => item.value),
      );
      return this.positions[index];
    }

    throw new Error('wrong parameters');
  }
}

export default Model;

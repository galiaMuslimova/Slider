import Observer from "../observer";
import { IConfig, IOptions, ISettings, IParameters, IPositions, IResult } from "../interfaces";

const defaults: IConfig = {
  min: 10,
  max: 40,
  step: 4,
  from: 8,
  to: 24,
  vertical: false,
  tip: true,
  range: true
}

export default class Model {
  config: IConfig;
  observer: Observer;
  positionsArr: IPositions[];
  parameters: IParameters;
  trackStart: number;
  trackWidth: number;
  range: number;

  constructor(options: IOptions, trackStart: number = 0, trackWidth: number = 500) {
    this.observer = new Observer();
    this.config = this.correctConfig($.extend({}, defaults, options));
    this.trackStart = trackStart;
    this.trackWidth = trackWidth;
    this.range = this.config.max - this.config.min;
    this.positionsArr = this.initPositionsArr();
    this.parameters = this.initParameters()
  }

  correctConfig(config: IConfig = this.config) {
    let checkedConfig = Object.assign({}, config);
    checkedConfig.max = (config.max > config.min) ? config.max : config.min;
    checkedConfig.min = (config.max > config.min) ? config.min : config.max;
    let range = this.range = checkedConfig.max - checkedConfig.min;
    checkedConfig.step = (config.step * 2 < range && config.step * 20 > range) ? config.step : Math.round(range / 10);
    let from = (config.from < checkedConfig.max && config.from >= checkedConfig.min) ? config.from : (checkedConfig.min + checkedConfig.step);
    let to = (config.to <= checkedConfig.max && config.to > checkedConfig.min) ? config.to : (checkedConfig.max - checkedConfig.step);
    checkedConfig.from = from < to ? from : to;    
    checkedConfig.to = from < to ? to : from;
    return checkedConfig;
  }

  initStepsArr() {
    let stepLength = this.trackWidth / this.range * this.config.step
    let stepsCount = Math.floor(this.range / this.config.step);
    let valuesArr = Array.from(Array(stepsCount + 1), (_, i) => (this.config.min + this.config.step * i));
    let stepsArr: IPositions[] = [];
    valuesArr.map((el, index) => stepsArr.push({ value: el, x: Math.round(stepLength * index) }));
    return stepsArr
  }

  initPositionsArr() {
    let valueLength = this.trackWidth / this.range
    let valuesArr = Array.from(Array(this.range + 1), (_, i) => (this.config.min + i));
    let positionsArr: IPositions[] = [];
    valuesArr.map((el, index) => positionsArr.push({ value: el, x: Math.round(valueLength * index) }));
    return positionsArr;
  }

  initParameters() {
    let parameters: IParameters = { values: [], handleX: [] }
    parameters.values[0] = this.config.from
    if (this.config.range) {
      parameters.values[1] = this.config.to
    }
    for (let i in parameters.values) {
      parameters.handleX[i] = this.takeXByValue(parameters.values[i])
    }
    this.parameters = parameters;
    return parameters
  }

  takeXByValue(val: number) {
    let result = this.positionsArr.find(el => el.value == val);
    if (result) {
      return result.x;
    } else {
      throw new Error('position for this value is not consist')
    }
  }

  takeParamByEvent(eventPosition: { pageX: number, pageY: number }, index: number) {
    let mousePosition = this.config.vertical ? eventPosition.pageY : eventPosition.pageX
    let position = Math.round(mousePosition - this.trackStart);
    let isInScale = position >= 0 && position <= this.trackWidth;
    if (isInScale) {
      let result = this.positionsArr.find(el => el.x == position)
      if (result) {
        this.parameters.values[index] = result.value;
        this.parameters.handleX[index] = result.x;
        this.config.from = this.parameters.values[0];
        this.config.to = this.parameters.values[1] ? this.parameters.values[1] : this.config.to;
        return this.parameters;
      }
    }
  }

  takeXByScale(value: number) {
    if (this.config.range) {
      let closest = this.parameters.values.reduce(function (prev, curr) {
        return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
      });
      let index = this.parameters.values.indexOf(closest);
      this.parameters.values[index] = value;
      this.parameters.handleX[index] = this.takeXByValue(value);
      return this.parameters
    } else {
      this.parameters.values = [value];
      this.parameters.handleX = [this.takeXByValue(value)];
      return this.parameters;
    }
  }
}
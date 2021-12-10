import Observer from "../observer";
import { IConfig, IOptions, ISettings, IParameters, IPositions } from "../interfaces";

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
  //stepsArr: IPositions[];
  //parameters: IParameters;
  trackStart: number;
  trackWidth: number;
  range: number;
  //handleWidth: number;

  constructor(options: IOptions,  trackStart: number = 0, trackWidth: number = 500 ) {
    this.config = $.extend({}, defaults, options);
    this.observer = new Observer();
    this.config = this.correctConfig(this.config);
    this.trackStart = trackStart;
    this.trackWidth = trackWidth;
    this.range = this.config.max - this.config.min;
    this.positionsArr = this.initPositionsArr()
  }

  correctConfig(config: IConfig = this.config) {
    let checkedConfig = Object.assign({}, config);
    let range = config.max - config.min;
    checkedConfig.max = (config.max > config.min) ? config.max : config.min;
    checkedConfig.min = (config.max > config.min) ? config.min : config.max;
    checkedConfig.step = (config.step * 2 < range && config.step * 20 > range) ? config.step : Math.round(range / 10);
    checkedConfig.from = (config.from < config.max && config.from >= config.min && config.from < config.to) ? config.from : (config.min + config.step);
    checkedConfig.to = (config.to <= config.max && config.to > config.min && config.from < config.to) ? config.to : (config.max - config.step);
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
    return parameters
  }

  takeXByValue(val: number) {
    let result = this.positionsArr.filter(el => el.value == val);
    return result[0].x;
  }


  /*
  changeSettings(settings: ISettings | null) {
    if (settings) {
      this.config = $.extend({}, this.config, settings)
      let key = Object.keys(settings)[0]
      if ($.inArray(key, ['min', 'max', 'step']) >= 0) {
        this.initScale()
        return { stepsArr: this.stepsArr }
      } else if ($.inArray(key, ['from', 'to', 'range', 'tip']) >= 0) {
        this.initParameters()
        return { parameters: this.parameters }
      } else {
        this.init()
        return { stepsArr: this.stepsArr, parameters: this.parameters }
      }
    } else {
      this.init()
      return { stepsArr: this.stepsArr, parameters: this.parameters }
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

  takeXByEvent(eventPosition: { pageX: number, pageY: number }, index: number) {
    if (this.trackWidth && this.trackStart) {
      let mousePosition = this.config.vertical ? eventPosition.pageY : eventPosition.pageX
      let position = Math.round(mousePosition - this.trackStart);
      let rightBound = position + this.trackWidth;
      let isInScale = position >= 0 && position <= rightBound;
      if (isInScale) {
        let result = this.positionsArr.filter(el => el.x == position)
        if (result.length > 0) {
          this.parameters.values[index] = result[0].value;
          this.parameters.handleX[index] = result[0].x;
          this.config.from = this.parameters.values[0];
          this.config.to = this.parameters.values[1] ? this.parameters.values[1] : this.config.to;
          return this.parameters;
        }
      }
    } else {
      throw new Error('wrong parameters of slider')
    }
  }*/
}
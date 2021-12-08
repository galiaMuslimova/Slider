import Observer from "../observer";
import { IConfig, ISettings, IParameters, IPositions } from "../interfaces";



export default class Model {
  config: IConfig;
  observer: Observer;
  positionsArr: IPositions[];
  stepsArr: IPositions[];
  parameters: IParameters;
  trackStart: number | undefined;
  trackWidth: number | undefined;
  handleWidth: number;

  constructor(config: IConfig, trackStart: number, trackWidth: number) {
    this.config = config;
    this.trackStart = trackStart;
    this.trackWidth = trackWidth;
    this.handleWidth = 20;

    this.observer = new Observer();    
    this.positionsArr = [];
    this.stepsArr = [];
    this.parameters = { values: [], handleX: [] };
    this.init();
  }

  init() {
    this.initScale()
    this.initParameters();
  }

  initScale() {
    if (this.config.min != undefined && this.config.max != undefined && this.config.step && this.trackWidth) {
      let min = this.config.min;
      let max = this.config.max;
      let step = this.config.step;
      let range = max - min;
      let width = this.trackWidth;

      this.positionsArr = this.initPositionsArr(min, range, width);
      this.stepsArr = this.initStepsArr(min, step, range, width);
    }
  }

  initPositionsArr(min: number, range: number, width: number) {
    let valueLength = width / range
    let valuesArr = Array.from(Array(range + 1), (_, i) => (min + i));
    let positionsArr: IPositions[] = [];
    valuesArr.map((el, index) => positionsArr.push({ value: el, x: Math.round(valueLength * index) }));
    return positionsArr;
  }

  initStepsArr(min: number, step: number, range: number, width: number) {
    let stepLength = width / range * step
    let stepsCount = Math.floor(range / step);
    let valuesArr = Array.from(Array(stepsCount + 1), (_, i) => (min + step * i));
    let stepsArr: IPositions[] = [];
    valuesArr.map((el, index) => stepsArr.push({ value: el, x: Math.round(stepLength * index) }));
    return stepsArr
  }

  initParameters() {
    if (this.config.min != undefined && this.config.max != undefined && this.config.from && this.config.to) {
      let min = this.config.min;
      let max = this.config.max;
      let range = max - min;
      let from = this.config.from;
      let to = this.config.to;
      let parameters: IParameters = { values: [], handleX: [] }

      parameters.values[0] = (from > min && from < max) ? from : (min + Math.round(range / 3))
      if (this.config.range) {
        parameters.values[1] = (to > min && to < max) ? to : (min + Math.round(range * 2 / 3))
      }

      for (let i in parameters.values) {
        parameters.handleX[i] = this.takeXByValue(parameters.values[i])
      }
      this.parameters = parameters
    }
  }

  takeXByValue(val: number) {
    let result = this.positionsArr.filter(el => el.value == val);
    return result[0].x;
  }

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
  }
}
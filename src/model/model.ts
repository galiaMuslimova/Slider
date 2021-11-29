import Observer from "../observer";
import { IConfig, ISettings, IParameters, IPositions } from "../interfaces";
import { param } from "jquery";

export default class Model {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  track: JQuery<HTMLElement>;
  observer: Observer;
  positionsArr: IPositions[];
  stepsArr: IPositions[];
  parameters: IParameters;
  trackStart: number | undefined;
  trackWidth: number | undefined;
  handleWidth: number;

  constructor(root: JQuery<HTMLElement>, config: IConfig) {
    this.config = config;
    this.slider = root.find('.slider');
    this.track = this.slider.find('.slider__track')
    this.observer = new Observer();

    this.positionsArr = [];
    this.stepsArr = [];
    this.parameters = { values: [], handleX: [] };

    this.trackStart = this.config.isVertical?Number(this.track.position().top):Number(this.track.position().left);
    this.trackWidth = this.config.isVertical?this.track.height():this.track.width();
    this.handleWidth = 20;
    this.init();
  }

  init() {
    if (this.config.start && this.config.end && this.config.step && this.trackWidth) {
      let start = this.config.start;
      let end = this.config.end;
      let range = end - start;
      let width = this.trackWidth;
      let step = this.config.step;

      this.positionsArr = this.initPositionsArr(start, range, width);
      this.stepsArr = this.initStepsArr(start, step, range, width);
      this.parameters = this.initParameters(start, range)
    }
  }

  initPositionsArr(start: number, range: number, width: number) {
    let valueLength = Math.round(width / range);
    let valuesArr = Array.from(Array(range + 1), (_, i) => (start + i));
    let positionsArr: IPositions[] = [];
    valuesArr.map((el, index) => positionsArr.push({ value: el, x: (valueLength * index - this.handleWidth / 2) }));
    return positionsArr;
  }

  initStepsArr(start: number, step: number, range: number, width: number) {
    let stepLength = width / range * step;
    let stepsCount = Math.floor(range / step);
    let valuesArr = Array.from(Array(stepsCount + 1), (_, i) => (start + step * i));
    let stepsArr: IPositions[] = [];
    valuesArr.map((el, index) => stepsArr.push({ value: el, x: (stepLength * index - this.handleWidth / 2) }));
    return stepsArr
  }

  initParameters(start: number, range: number) {
    let parameters: IParameters = {
      values: [],
      handleX: []
    }
    switch (this.config.handleCount) {
      case 1:
        let value = start + Math.round(range / 2)
        parameters.values = [value];
        parameters.handleX = [this.takeXByValue(value)]
        break;
      case 2:
        let value1 = this.stepsArr[1].value;
        let value2 = this.stepsArr[this.stepsArr.length - 1].value
        parameters.values = [value1, value2];
        parameters.handleX = [this.takeXByValue(value1), this.takeXByValue(value2)]
        break;
    }
    return parameters
  }

  takeXByValue(val: number) {
    let result = this.positionsArr.filter(el => el.value == val);
    return result[0].x;
  }

  changeSettings(settings: ISettings | null) {
    if (settings) {
      this.config = $.extend({}, this.config, settings)
    }
    this.init();
    return {
      parameters: this.parameters,
      stepsArr: this.stepsArr
    }
  }

  takeXByScale(value: number) {
    switch (this.config.handleCount) {
      case 1: {
        this.parameters.values = [value];
        this.parameters.handleX = [this.takeXByValue(value)];
        return this.parameters;
      }
      case 2: {
        let closest = this.parameters.values.reduce(function (prev, curr) {
          return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
        });
        let index = this.parameters.values.indexOf(closest);
        this.parameters.values[index] = value;
        this.parameters.handleX[index] = this.takeXByValue(value);
        return this.parameters        
      }
    }
  }

  takeXByEvent(event: MouseEvent, index: number) {
    if (this.trackWidth && this.trackStart) {
      let mousePosition = this.config.isVertical ? event.pageY : event.pageX
      let position = Math.round(mousePosition - this.trackStart);
      let rightBound = position + this.trackWidth;
      let isInScale = position >= 0 && position <= rightBound;
      if (isInScale) {
        let result = this.positionsArr.filter(el => el.x == position)
        if (result.length > 0) {
          this.parameters.values[index] = result[0].value;
          this.parameters.handleX[index] = result[0].x;
          return this.parameters;
        }
      }
    } else {
      throw new Error('wrong parameters of slider')
    }
  }
}
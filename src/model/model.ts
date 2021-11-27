import Observer from "../observer";
import { IConfig, ISettings, IParameters, IPositions } from "../interfaces";

export default class Model {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  track: JQuery<HTMLElement>;
  observer: Observer;
  positionsArr: IPositions[];
  stepsArr: IPositions[];
  parameters: IParameters;
  trackLeft: number | undefined;
  trackWidth: number | undefined;
  handleWidth: number;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.config = config;
    this.slider = slider;
    this.track = this.slider.find('.slider__track')
    this.observer = new Observer();

    this.positionsArr = [];
    this.stepsArr = [];
    this.parameters = { values: [], handleX: [] };

    this.trackLeft = Number(this.track.position().left);
    this.trackWidth = this.track.width();
    this.handleWidth = 20;
    this.init();
  }

  init() {
    if (this.config.min && this.config.max && this.config.step && this.trackWidth) {
      let start = this.config.min;
      let end = this.config.max;
      let range = end - start;
      let width = this.trackWidth;
      let step = this.config.step;

      let isTwoHandle = this.config.handleCount == 2;

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

  getPositionsArr() {
    return this.positionsArr
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

  takeXByEvent(event: MouseEvent, index: number) {
    if (this.trackWidth && this.trackLeft) {
      let position = Math.round(event.pageX - this.trackLeft);
      let rightBound = position + this.trackWidth;
      let isInScale = position >= 0 && position <= rightBound;
      if (isInScale) {
        let result = this.positionsArr.filter(el => el.x == position)
        if (result.length > 0) {
          let parameters:IParameters = this.parameters;
          parameters.values[index] = result[0].value;
          parameters.handleX[index] = result[0].x
          return parameters;
        }
      }
    } else {
      throw new Error('wrong parameters of slider')
    }
  }
}
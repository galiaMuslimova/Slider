import Observer from "../observer";
import { IConfig, ISettings, IParameters} from "../interfaces";
import { param } from "jquery";

export default class Model {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  track: JQuery<HTMLElement>;
  observer: Observer;
  positionsArr: { value: number, x: number }[];
  stepsArr: number[];
  parameters: IParameters;
  trackLeft: number | undefined;
  trackWidth: number | undefined;
  stepsCount: number | undefined;
  stepLength: number | undefined;
  handleWidth: number;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.config = config;
    this.slider = slider;
    this.track = this.slider.find('.slider__track')
    this.observer = new Observer();

    this.positionsArr = [];
    this.stepsArr = [];
    this.parameters = {values:[], handleX:[]};
    
    this.trackLeft = Number(this.track.position().left);
    this.trackWidth = this.track.width();
    this.stepsCount;
    this.stepLength;
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
      let stepsCount = Math.floor(range / step);
      let stepLength = width / range * step;
      let isTwoHandle = this.config.handleCount == 2;

      this.positionsArr = this.initPositionsArr(start, range, width);
      this.stepsArr = this.initStepsArr(start, step, stepsCount);
      this.parameters = this.initParameters(start, step, stepsCount)

      this.stepsCount = stepsCount;
      this.stepLength = stepLength;
    }
  }

  initPositionsArr(start: number, range: number, width: number) {
    let valueLength = Math.round(width / range);
    let valuesArr = Array.from(Array(range + 1), (_, i) => (start + i));
    let positionsArr: { value: number, x: number }[] = [];
    valuesArr.map((el, index) => positionsArr.push({ value: el, x: (valueLength * index - this.handleWidth / 2) }));
    return positionsArr;
  }

  initStepsArr(start: number, step: number, stepsCount: number) {
    let stepsArr = Array.from(Array(stepsCount + 1), (_, i) => (start + step * i));
    return stepsArr
  }

  initParameters(start: number, step: number, stepsCount: number) {
    let parameters: IParameters = {
      values: [],
      handleX: []
    }
    switch (this.config.handleCount) {
      case 1:
        let value = start + Math.round(stepsCount / 2) * step
        parameters.values = [value];
        parameters.handleX = [this.takeXByValue(value)]
        break;
      case 2:
        let value1 = this.stepsArr[1];
        let value2 = this.stepsArr[this.stepsArr.length - 1]
        parameters.values = [value1, value2 ];
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
      handleX: this.parameters.handleX,
      values: this.parameters.values,
      positionsArr: this.positionsArr
    }
  }

  takeXByEvent(event: MouseEvent) {
    if (this.stepsCount && this.trackLeft && this.stepLength) {
      //how many steps passed? ex. 0,1,2,3 e.t.c
      let passedSteps = Math.round((event.pageX - this.trackLeft) / this.stepLength);
      let isInScale = passedSteps >= 0 && passedSteps <= this.stepsCount;
      if (isInScale) {
        let x = this.positionsArr[passedSteps].x;
        return x;
      }
    } else {
      throw new Error('wrong parameters of slider')
    }
  }
}
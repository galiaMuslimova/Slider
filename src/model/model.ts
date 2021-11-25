import Observer from "../observer";
import { IConfig, ISettings } from "../interfaces";

export default class Model {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  observer: Observer;
  positionsArr: { value: number, x: number }[];
  isTwoHandle: boolean;
  handleX: number[];
  values: number[];
  sliderLeft: number | undefined;
  sliderWidth: number | undefined;
  stepsCount: number | undefined;
  stepLength: number | undefined;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.config = config;
    this.slider = slider;
    this.observer = new Observer();
    this.positionsArr = [];
    this.isTwoHandle = this.config.handleCount == 2;
    this.handleX = [];
    this.values = [];
    this.sliderLeft = Number(this.slider.position().left);
    this.sliderWidth = this.slider.width();
    this.stepsCount;
    this.stepLength;
    this.init();
  }

  init() {
    if (this.config.min && this.config.max && this.config.step && this.sliderWidth) {
      this.stepLength = this.sliderWidth / (this.config.max - this.config.min) * this.config.step;
    } else {
      throw new Error('wrong parameters')
    }
    this.initValues();
    this.initPositionsArr();
    this.initPosition();
  }

  initValues() {
    if (this.config.min && this.config.max && this.config.step) {
      this.stepsCount = Math.floor((this.config.max - this.config.min) / this.config.step);
      switch (this.config.handleCount) {
        case 1:
          this.values = [this.config.min + Math.round(this.stepsCount / 2) * this.config.step];
          break;
        case 2:
          this.values = [this.config.min + this.config.step, this.config.max - this.config.step];
          break;
      }
    } else {
      throw new Error('wrong parameters')
    }
  }

  initPositionsArr() {
    if (this.config.min && this.config.step && this.stepsCount && this.stepLength) {
      let start = this.config.min;
      let step = this.config.step;
      let stepLength = this.stepLength;
      let positionsArr: { value: number, x: number }[] = [];
      let valuesArr = Array.from(Array(this.stepsCount + 1), (_, i) => (start + step * i));      
      valuesArr.map((el, index) => positionsArr.push({ value: el, x: stepLength * index }));
      this.positionsArr = positionsArr;
    } else {
      throw new Error('wrong parameters')
    }
  }

  initPosition() {
    this.handleX = [];
    this.values.forEach(item => {
      this.handleX.push(this.takeXByValue(item));
    });
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
      handleX: this.handleX,
      values: this.values
    }
  }

  takeXByEvent(event: MouseEvent) {
    if (this.stepsCount && this.sliderLeft && this.stepLength) {
      //how many steps passed? ex. 0,1,2,3 e.t.c
      let passedSteps = Math.round((event.pageX - this.sliderLeft) / this.stepLength);
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
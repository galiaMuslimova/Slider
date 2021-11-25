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
  stepLength: number | undefined;;

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
    if (this.config.min && this.config.max && this.config.step) {
      this.stepsCount = Math.floor((this.config.max - this.config.min) / this.config.step);
    } else {
      throw new Error('wrong parameters')
    }
    this.init();
  }

  init() {
    this.initValues();
    this.initPositionsArr();
    this.initPosition();
  }

  initValues() {
    if (this.config.min && this.config.max && this.config.step && this.stepsCount) {
      switch (this.config.handleCount) {
        case 1:
          this.values = [this.config.min + Math.round(this.stepsCount / 2) * this.config.step];
          break;
        case 2:
          this.values = [this.config.min + this.config.step, this.config.max - this.config.step];
          break;
      }
      return this.values;
    } else {
      throw new Error('wrong parameters')
    }
  }

  initPositionsArr() {
    if (this.config.min && this.config.max && this.config.step && this.stepsCount) {
      let start = this.config.min;
      let step = this.config.step;
      let valuesArr = Array.from(Array(this.stepsCount + 1), (_, i) => (start + step * i));
      let positionsArr: { value: number, x: number }[] = [];
      valuesArr.map(el => positionsArr.push({ value: el, x: this.initPositionsforArray(el) }))
      this.positionsArr = positionsArr;
    } else {
      throw new Error('wrong parameters')
    }
  }

  /*function for create positions at positions array*/
  initPositionsforArray(value: number) {
    let valueElement = $(this.slider).find(`.slider__value[data_value='${value}']`);
    let x = valueElement.position().left;
    return x;
  }

  initPosition() {
    this.handleX = [];
    this.values.forEach(item => {
      this.handleX.push(this.takeXByValue(item));
    });
    return this.handleX;
  }

  takeXByValue(val: number) {
    let result = this.positionsArr.filter(el => el.value == val);
    return result[0].x;
  }

  changeSettings(settings: ISettings) {
    this.config = $.extend({}, this.config, settings)
    this.init();
  }

  takeXByEvent(event: MouseEvent) {
    if (this.stepsCount && this.sliderLeft) {
      //how many steps passed? ex. 0,1,2,3 e.t.c
      let stepLength = this.positionsArr[1].x - this.positionsArr[0].x;
      let passedSteps = Math.round((event.pageX - this.sliderLeft) / stepLength);
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
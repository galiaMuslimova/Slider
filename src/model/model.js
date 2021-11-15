import Observer from "@/observer.js";

export default class Model {
  constructor(slider, config) {
    this.config = config;
    this.slider = slider;
    this.observer = new Observer();
    this.positionsArr = [];
    this.isTwoHandle = this.config.handleCount == 2;
    this.handleX = [];
    this.values = [];
    this.sliderLeft = this.slider[0].getBoundingClientRect().left;
    this.sliderWidth = this.slider[0].getBoundingClientRect().width;
    this.stepsCount;
    this.stepLength = this.sliderWidth / this.stepsCount;
    this.init();
  }

  init() {
    this.initValues();
    this.initPositionsArr();
    this.initPosition();
  }

  initValues() {
    switch (this.config.handleCount) {
      case 1:
        this.values = [this.config.min + Math.round(this.stepsCount / 2) * this.config.step];
        break;
      case 2:
        this.values = [this.config.min + this.config.step, this.config.max - this.config.step];
        break;
    }
  }

  initPositionsArr() {
    let start = this.config.min;
    let step = this.config.step;
    this.stepsCount = Math.floor((this.config.max - this.config.min) / this.config.step);
    let valuesArr = Array.from(Array(this.stepsCount + 1), (_, i) => (start + step * i));
    let positionsArr = [];
    valuesArr.map(el => positionsArr.push({ value: el, x: this.initPositionsforArray(el) }))
    this.positionsArr = positionsArr;
  }

  /*function for create positions at positions array*/
  initPositionsforArray(value) {
    let valueElement = $(this.slider).find(`.slider__value[data_value='${value}']`);
    let valuePosition = valueElement[0].getBoundingClientRect().left;
    let x = valuePosition - this.sliderLeft;
    return x;
  }

  initPosition() {
    switch (this.config.handleCount) {
      case 1:
        this.handleX = [this.takeXByValue(this.values[0])];
        break;
      case 2:
        this.handleX = [this.positionsArr[1].x, this.positionsArr.at(-1).x];
        break;
    }
    return this.handleX;
  }

  takeXByValue(val) {
    let result = this.positionsArr.filter(el => el.value == val);
    return result[0].x;
  }

  changeSettings(settings) {
    this.config[settings.key] = +settings.value;
    this.init();
  }

  takeXByEvent(event) {
    //how many steps passed? ex. 0,1,2,3 e.t.c
    let passedSteps = Math.round((event.pageX - this.sliderLeft) / this.stepLength);
    let isInScale = passedSteps >= 0 && passedSteps <= this.stepsCount;

    if (isInScale) {
      let x = this.positionsArr[passedSteps].x;
      return x;
    }
  }
}
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
    this.stepsCount = (this.config.max - this.config.min) / this.config.step;
    this.stepLength = this.config.sliderWidth / this.config.stepsCount;
    this.init();
  }

  init() {
    this.initPositionsArr();
    this.changeValues();
    this.initPosition();
  }

  initPositionsArr() {
    let start = this.config.min;
    let step = this.config.step;
    let stepsCount = this.config.stepsCount;
    let valuesArr = Array.from(Array(stepsCount + 1), (_, i) => (start + step * i));
    let positionsArr = [];
    valuesArr.map(el => positionsArr.push({ value: el, x: this.initPositionsforArray(el) }))
    this.positionsArr = positionsArr;    
  }

  /*function for create positions at positions array*/
  initPositionsforArray(value) {
    let valueElement = $(this.slider).find(`.slider__value[data_value=${value}]`);
    let valuePosition = valueElement[0].getBoundingClientRect().left;
    let x = valuePosition - this.sliderLeft;
    return x;
  }

  initPosition() {
    this.handleX = [this.takeX(this.values[0])];
    if (this.isTwoHandle) {
      this.handleX = [this.takeX(this.values[0]), this.takeX(this.values[1])];
    }
    this.observer.notify('initPosition', this.handleX);
    return this.handleX;    
  }

  changeValues() {
    this.values = [this.config.min + Math.round(this.config.stepsCount / 2) * this.config.step];
    if (this.isTwoHandle) {
      this.values = [this.config.min + this.config.step, this.config.max - this.config.step];
    }
    //this.observer.notify('changeValues', this.values)
  }

  takeX(val) {
    let result = this.positionsArr.filter(el => el.value == val);
    return result[0].x;
  }

  takePositionByEvent(event, handleOrder) {
    let firstHandleX = this.handleX[0];
    let secondHandleX = this.handleX[1];

    //how many steps passed? ex. 0,1,2,3 e.t.c
    let passedSteps = Math.round((event.pageX - this.sliderLeft) / this.stepLength);
    let isInScale = passedSteps >= 0 && passedSteps <= this.stepsCount;

    if (isInScale) {
      let x = this.positionsArr[passedSteps].x;

      if (handleOrder == 1) {
        if (this.isTwoHandle) {
          if (x < secondHandleX) {
            return x
          }
        } else {
          return x
        }
      }
      else {
        if (x > firstHandleX) {
          return x
        }
      }
    }
  }

  takePositionByValue(currentValue) {
    let x = this.takeX(currentValue);
    if (this.isTwoHandle) {
      if (currentValue < this.values[1]) {
        return [1, x];
      } else {
        return [2, x];
      }
    } else {
      return [1, x];
    }
  }
}
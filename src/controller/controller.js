import { View } from "@/view/view.js";
import Handle from "@/view/handle.js";
import Interval from "@/view/interval.js";

const defaults = {
  text: "this is slider",
  handleCount: 2,
  min: 0,
  max: 50,
  step: 5,
  values: [20, 30],
  sliderLeft: 0,
  sliderWidth: 500,
  stepsCount: 10,
  stepLength: 50
}

export class Controller {
  constructor(slider, options) {
    this.config = $.extend({}, defaults, options);
    this.options = options;
    this.slider = slider;
    this.view = new View(this.slider, this.config);
    this.interval = new Interval(this.slider.find(".slider__interval")[0]);
    this.firstHandle;
    this.secondHandle;

    this.isTwoHandle = this.config.handleCount == 2;       
    this.positionsArr = []; //array ob objects with value and x of each scale number
    this.values = []; //values of handle
    this.handleX = []; //positions of handle
    this.init();
  }

  init() {
    this.initSlider();
    this.initHandle(); //set firstHandle, (secondHandle), config.values
    this.createPositionsArr();    

    this.moveByValue(this.firstHandle, this.config.values[0], 0);  //handle, value, index 0 or 1
    if (this.isTwoHandle) {
      this.moveByValue(this.secondHandle, this.config.values[1], 1);
    }

    this.moveByDrag();
    this.moveByClickOnValue();    
  }

  initSlider() {
    this.config.sliderLeft = this.slider[0].getBoundingClientRect().left;
    this.config.sliderWidth = this.slider[0].getBoundingClientRect().width;
    this.config.stepsCount = (this.config.max - this.config.min) / this.config.step;
    this.config.stepLength = this.config.sliderWidth / this.config.stepsCount;
  }

  initHandle() {
    this.firstHandle = new Handle(this.slider.find(".slider__handle_first")[0], this.config);
    this.config.values = [this.config.min + Math.round(this.config.stepsCount / 2) * this.config.step];
    if (this.isTwoHandle) {
      this.secondHandle = new Handle(this.slider.find(".slider__handle_second")[0], this.config);
      this.config.values = [this.config.min + this.config.step, this.config.max - this.config.step];
    }
  }

  createPositionsArr() {
    let start = this.config.min;
    let step = this.config.step;
    let stepsCount = this.config.stepsCount;
    let valuesArr = Array.from(Array(stepsCount + 1), (_, i) => (start + step * i));
    let positionsArr = [];
    valuesArr.map(el => positionsArr.push({ value: el, x: this.createPositionByValue(el)}))
    this.positionsArr = positionsArr;
  }

  createPositionByValue(value){
    let slider = this.slider;
    let valueElement = $(slider).find(`.slider__value[data_value=${value}]`);
    let valuePosition = valueElement[0].getBoundingClientRect().left;
    let x = valuePosition - this.config.sliderLeft;
    return x;
  }

  moveByX(handle, x, index) {
    this.handleX[index] = x;
    this.values[index] = this.takeValueByPosition(x)
    handle.moveByX(x);
    this.moveInterval()
  }

  moveByValue(handle, value, index) {
    let x = this.takePositionByValue(value);
    this.handleX[index] = x;
    this.values[index] = value;
    handle.moveByX(x);
    this.moveInterval()
  }

  takePositionByValue(val) {
    let result = this.positionsArr.filter(el => el.value == val)
    return result[0].x;
  }

  takeValueByPosition(position) {
    let result = this.positionsArr.filter(el => el.x == position)
    return result[0].value;
  }

  moveInterval(x1 = this.handleX[0], x2 = this.handleX[1]) {
    if (this.isTwoHandle) {
      this.interval.moveByX(x1, x2);
    } else {
      this.interval.moveByX(this.config.min, x1);
    }
  }

  moveByClickOnValue() {    
    let element = this;
    this.slider.on('click', '.slider__value', function (event) {
      let currentValue = +$(this).attr('data_value');
      
      if (element.isTwoHandle) {
        if (currentValue < element.values[1]) {
          element.moveByValue(element.firstHandle, currentValue, 0);
        } else {
          element.moveByValue(element.secondHandle, currentValue, 1);
        }
      } else {
        element.moveByValue(element.firstHandle, currentValue, 0);
      }
    })
  }

  moveHandleInPage(event, item) {
    let isFirst = $(item).hasClass('slider__handle_first');
    let handle = isFirst ? this.firstHandle : this.secondHandle;

    let firstHandleX = this.handleX[0];
    let secondHandleX = this.handleX[1];

    //how many steps passed? ex. 0,1,2,3 e.t.c
    let passedSteps = Math.round((event.pageX - this.config.sliderLeft) / this.config.stepLength);
    let isInScale = passedSteps >= 0 && passedSteps <= this.config.stepsCount;

    if (isInScale) {
      let x = this.positionsArr[passedSteps].x;

      if (isFirst) {
        if (this.isTwoHandle) {
          if (x < secondHandleX) {
            this.moveByX(handle, x, 0)
          }
        } else {
          this.moveByX(handle, x, 0)
        }
      }
      else {
        if (x > firstHandleX) {
          this.moveByX(handle, x, 1)
        }
      }
    }
  }

  moveByDrag() {
    let element = this;
    this.slider.on('mousedown', '.slider__handle', function () {
      let handle = this;

      document.onmousemove = function (event) {
        element.moveHandleInPage(event, handle);        
      };

      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };

      handle.ondragstart = function () {
        return false;
      };
    })
  }
}

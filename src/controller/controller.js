import { View } from "@/view/view.js";
import Handle from "@/view/handle.js";
import Interval from "@/view/interval.js";

const defaults = {
  text: "this is slider",
  handleCount: 2,
  min: 0,
  max: 50,
  step: 5,
  current: [10, 40],
  sliderLeft: 0,
  sliderWidth: 500,
  firstHandlePosition: 0,
  secondHandlePosition: 0,
  stepsCount: 10,
  stepLength: 50
}

export class Controller {
  constructor(slider, options) {
    this.config = $.extend({}, defaults, options);
    this.options = options;
    this.slider = slider;
    this.view;
    this.track;
    this.interval;
    this.firstHandle;
    this.secondHandle;

    this.init();
    this.setConfig();
    this.main();
  }

  init() {
    this.view = new View(this.slider, this.config);
    this.interval = new Interval(this.slider.find(".slider__interval")[0]);
    this.firstHandle = new Handle(this.slider.find(".slider__handle_first")[0], this.config);
    if(this.config.handleCount == 2) {
      this.secondHandle = new Handle(this.slider.find(".slider__handle_second")[0], this.config);      
    }    
  }

  setConfig() {    
    this.config.sliderLeft = this.slider[0].getBoundingClientRect().left;
    this.config.sliderWidth = this.slider[0].getBoundingClientRect().width;
    this.config.stepsCount = (this.config.max - this.config.min) / this.config.step;
    this.config.stepLength = this.config.sliderWidth / this.config.stepsCount;

    if (this.config.handleCount == 1) {
      this.config.current = [this.config.min + Math.round(this.config.stepsCount / 2) * this.config.step];
    } else if (this.config.handleCount == 2) {
      this.config.current = [this.config.min + this.config.step, this.config.max - this.config.step];
      this.config.secondHandlePosition = this.secondHandle.takePositionByValue(this.config.current[1]);
    }
    this.config.firstHandlePosition = this.firstHandle.takePositionByValue(this.config.current[0]);    
  }

  main() {
    this.firstHandle.moveByX(this.config.firstHandlePosition);
    if (this.config.handleCount == 2) {
      this.secondHandle.moveByX(this.config.secondHandlePosition);
    }
    this.moveInterval();

    this.moveHandle();
  }

  moveInterval() {
    if (this.config.handleCount == 1) {
      this.interval.moveByX(this.config.min, this.config.firstHandlePosition);
    } else if (this.config.handleCount == 2) {
      this.secondHandle.moveByX(this.config.rightHandlePosition);
      this.interval.moveByX(this.config.firstHandlePosition, this.config.secondHandlePosition);
    }
  }

  moveHandle() {
    let element = this; 
    
    this.slider.on('mousedown', '.slider__handle', function (event) {      
      let handle = new Handle(this, element.config);
      let isFirst = $(this).hasClass('slider__handle_first');

      document.onmousemove = function (event) {
        let position = handle.moveByMouse(event);
        isFirst ? element.config.firstHandlePosition = position : element.config.secondHandlePosition = position;
        element.moveInterval()
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

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
  leftHandlePosition: 0,
  rightHandlePosition: 0,
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
    this.leftHandle;
    this.rightHandle;

    this.init();
    this.setConfig();
    this.main();
  }

  init() {
    this.view = new View(this.slider, this.config);
    this.interval = new Interval(this.slider.find(".slider__interval")[0]);
    this.leftHandle = new Handle(this.slider.find(".slider__handle_left")[0], this.config);
    this.rightHandle = new Handle(this.slider.find(".slider__handle_right")[0], this.config);
  }

  setConfig() {
    this.config.current = [this.config.min + this.config.step, this.config.max - this.config.step]
    this.config.sliderLeft = this.slider[0].getBoundingClientRect().left;
    this.config.sliderWidth = this.slider[0].getBoundingClientRect().width;
    this.config.stepsCount = (this.config.max - this.config.min) / this.config.step;
    this.config.stepLength = this.config.sliderWidth / this.config.stepsCount;
    this.config.leftHandlePosition = this.leftHandle.takePositionByValue(this.config.current[0]);
    this.config.rightHandlePosition = this.rightHandle.takePositionByValue(this.config.current[1]);
  }

  main() {
    this.leftHandle.moveByX(this.config.leftHandlePosition);
    this.rightHandle.moveByX(this.config.rightHandlePosition);
    this.interval.moveByX(this.config.leftHandlePosition, this.config.rightHandlePosition);

    this.moveHandle();
  }

  moveInterval() {
    this.interval.moveByX(this.config.leftHandlePosition, this.config.rightHandlePosition)
  }

  moveHandle() {
    let element = this; 
    
    this.slider.on('mousedown', '.slider__handle', function (event) {      
      let handle = new Handle(this, element.config);
      let isLeft = $(this).hasClass('slider__handle_left');

      document.onmousemove = function (event) {
        let position = handle.moveByMouse(event);
        isLeft ? element.config.leftHandlePosition = position : element.config.rightHandlePosition = position;
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

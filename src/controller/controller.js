import {View} from "@/view/view.js";
import Handle from "@/view/handle.js";

const defaults = {
  text: "this is slider",
  handleCount: 2,
  min: 0,
  max: 50,
  step: 5,
  current: [10, 40],
  sliderLeft: 0,
  sliderWidth: 500,
  stepsCount: 10,
  stepLength: 50
}

export class Controller {
  constructor(element, options){
    this.config = $.extend({}, defaults, options);
    this.options = options;
    this.element = element;
    this.init();
  }
  
  init(){
    let config = this.config;
    let sliderPosition = this.element[0].getBoundingClientRect();

    this.config.current = [this.config.min + this.config.step, this.config.max - this.config.step]
    this.config.sliderLeft = sliderPosition.left;
    this.config.sliderWidth = sliderPosition.width;
    this.config.stepsCount = (this.config.max - this.config.min) / this.config.step;
    this.config.stepLength = this.config.sliderWidth / this.config.stepsCount;

    let view = new View(this.element, this.config);

    let handleLeft = new Handle(this.element.find(".slider__handle_left")[0], this.config);
    let handleRight = new Handle(this.element.find(".slider__handle_right")[0], this.config);

    handleLeft.moveByValue(this.config.current[0]);
    handleRight.moveByValue(this.config.current[1]);

    this.element.on('mousedown', '.slider__handle', function (event) {
      let handle = new Handle(this, config);

      document.onmousemove = function (event) {
        handle.moveByMouse(event)
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

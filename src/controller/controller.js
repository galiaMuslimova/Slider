import {View} from "@/view/view.js";
import Handle from "@/view/handle.js";

const defaults = {
  text: "this is slider",
  handleCount: 2,
  min: 0,
  max: 50,
  step: 5,
  current: [10, 40]
}

export function Controller(element, options) {
  this.config = $.extend({}, defaults, options);
  this.options = options;
  this.element = element;

  let view = new View(this.element, this.config);
  let handle = new Handle(this.element, this.config);
  handle.init();
  let handleLeft = new Handle(this.element.find(".slider__handle_left")[0]);
  let handleRight = new Handle(this.element.find(".slider__handle_right")[0]);

  //массив из двух элементов, указывающих на значения бегунков
  let currentValues = this.config.current;  

  let handleLeftX = handleLeft.changePosition(currentValues[0]);
  let handleRightX = handleRight.changePosition(currentValues[1]);
  handleLeft.move(handleLeftX);
  handleRight.move(handleRightX)

  this.element.on('mousedown', '.slider__handle', function (event) {
    let handle = new Handle(this);
    handle.moveHandle()
  })
}

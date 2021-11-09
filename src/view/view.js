import Handle from "@/view/handle.js";
import Track from "@/view/track.js";

const defaults = {
  text: "this is slider",
  handleCount: 2,
  min: 0,
  max: 50,
  step: 5
}

export class View {
  constructor(element, options) {
    this.config = $.extend({}, defaults, options);
    this.element = element;
    this.init();
  }
}

View.prototype.init = function () {
  let title = $('<div/>', {
    text: this.config.text
  }).appendTo(this.element);

  let track = $('<div/>', {
    class: "slider__track"
  }).appendTo(this.element);

  let scale = $('<div/>', {
    class: "slider__scale"
  }).appendTo(this.element);

  for(let i = this.config.min; i <= this.config.max; i += this.config.step) {
    $('<input/>', {
      class: 'slider__input',
      value: i
    }).appendTo(scale)
  }

  if (this.config.handleCount == 1){
    $('<div/>', {
      class: "slider__handle slider__handle_center"
    }).appendTo(track);
  }  

  if (this.config.handleCount == 2) {
    $('<div/>', {
      class: "slider__handle slider__handle_left"
    }).appendTo(track);

    $('<div/>', {
      class: "slider__handle slider__handle_right"
    }).appendTo(track);
  }
}

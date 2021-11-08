import Handle from "@/view/handle.js";
import Track from "@/view/track.js";

const defaults = {
  text: "this is slider",
  handleCount: 2
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

  $('<div/>', {
    class: "slider__handle slider__handle_left"
  }).appendTo(track);

  if (this.config.handleCount == 2) {
    $('<div/>', {
      class: "slider__handle slider__handle_right"
    }).appendTo(track);
  }
}

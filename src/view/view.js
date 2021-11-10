import Handle from "@/view/handle.js";
import Track from "@/view/track.js";

export class View {
  constructor(element, config) {
    this.config = config;
    this.element = element;
    this.init();
  }

  init() {
    let title = $('<div/>', {
      text: this.config.text
    }).appendTo(this.element);

    let track = $('<div/>', {
      class: "slider__track"
    }).appendTo(this.element);

    let interval = $('<div/>', {
      class: "slider__interval"
    }).appendTo(track);

    let scale = $('<div/>', {
      class: "slider__scale"
    }).appendTo(this.element);

    for (let i = this.config.min; i <= this.config.max; i += this.config.step) {
      $('<div/>', {
        class: 'slider__value',
        data_value: i,
        text: i
      }).appendTo(scale)
    }

    $('<div/>', {
      class: "slider__handle slider__handle_first",
      data_position: this.config.current[0]
    }).appendTo(track);

    if (this.config.handleCount == 2) {
      $('<div/>', {
        class: "slider__handle slider__handle_second",
        data_position: this.config.current[1]
      }).appendTo(track);
    }
  }
}

import {View} from "@/view/view.js";
import Handle from "@/view/handle.js";

export function Controller(element, options) {
  this.options = options;
  this.element = element;

  let view = new View(this.element, this.options);

  this.element.on('mousedown', '.slider__handle', function (event) {
    let handle = new Handle;
    handle.moveHandle(this)
  })
}

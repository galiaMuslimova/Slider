import "./index.scss";
import "./config.scss";
import { Controller } from "./controller/controller.js"
import { View } from "./view/view.js"

(function($) {  
	$.fn.slider = function(options) {
    new Controller(this, options)
    return this;
  } 
})(jQuery);

$(function () {
  $(".slider").slider({
    min: -10,
    max: 30,
    step: 5
  })
})
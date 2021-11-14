import "./index.scss";
import { Controller } from "./controller/controller.js"

(function($) {  
	$.fn.slider = function(options) {
    new Controller(this, options)
    return this;
  } 
})(jQuery);

$(function () {
  $(".slider").slider({
    handleCount: 2,
    min: 1,
    max: 15,
    step: 4
  })
})
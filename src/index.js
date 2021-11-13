import "./index.scss";
import "./config.scss";
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
    min: 0,
    max: 5000,
    step: 500
  })
})
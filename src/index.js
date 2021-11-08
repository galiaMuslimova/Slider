import "./index.scss";
import {controller} from "./controller/controller.js"


(function($) {
	$.fn.slider = function(options) {		
    var config = $.extend({}, {
      to: 't-red'
    }, options);

    function main(e) {  
      controller(e[0]);         
    }
    
    this.each(function () { main($(this)); });
    return this;
	};
})(jQuery);

$(function () {
  $(".slider").slider()
})
import "./index.scss";
import Controller from "./controller/controller.js"


(function($) {
	$.fn.slider = function(options) {		
    var config = $.extend({}, {
      to: 't-red'
    }, options);

    function main(e) {

      $(function(){        
        let controller = new Controller();
        let slider = controller.createSlider();
        e[0].appendChild(slider)
      })

      /*let container = addNode('slider__container');
      container.appendChild(track);*/

      
    }
    this.each(function () { main($(this)); });
    return this;
	};
})(jQuery);

$(function () {
  $(".slider").slider()
})
import "./index.scss";

(function($) {
	$.fn.slider = function(options) {		
    var config = $.extend({}, {
      to: 't-red'
    }, options);

    function main(e) {
      e.append("<div class='slider__container'><div class='slider__connect'></div></div>")
    }
    this.each(function () { main($(this)); });
    return this;
	};
})(jQuery);

$(function () {
  $(".slider").slider()
})
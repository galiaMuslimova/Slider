import "./index.scss";

function addNode(className) {
  let newDiv = document.createElement("div");
  if(className) {
    $(newDiv).addClass(className);
  }
  return newDiv;
}


(function($) {
	$.fn.slider = function(options) {		
    var config = $.extend({}, {
      to: 't-red'
    }, options);

    function main(e) {
      let handleLeft = addNode('slider__handle_left');
      let handleRight = addNode('slider__handle_right');
      let connect = addNode('slider__connect');
      connect.appendChild(handleLeft);
      connect.appendChild(handleRight);
      let container = addNode('slider__container');
      container.appendChild(connect);

      e[0].appendChild(container)
    }
    this.each(function () { main($(this)); });
    return this;
	};
})(jQuery);

$(function () {
  $(".slider").slider()
})
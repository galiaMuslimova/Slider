import { conditionalExpression } from "babel-types";
import "./index.scss";
import Handle from "./view/handle.js"


function addNode(className) {
  let newDiv = document.createElement("div");
  if (className) {
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
      let track = addNode('slider__track');
      track.style.position = 'relative';
      track.appendChild(handleLeft);

      /*handleLeft.ondragstart = function () {
        return false;
      };

      handleLeft.onmousedown = function (event) {
        let startPositionX = track.getBoundingClientRect().left;
        let startPositionY = track.getBoundingClientRect().top;

        handleLeft.style.position = 'absolute';
        handleLeft.style.zIndex = 1000;
        document.body.append(handleLeft);

        //moveAt(event.pageX);

        function moveAt(pageX) {
          console.log(startPositionX)
          if ((pageX - startPositionX < track.offsetWidth) && (pageX > startPositionX)) {
            handleLeft.style.left = pageX + 'px';
            handleLeft.style.top = startPositionY + 'px';
          }          
        }

        function onMouseMove(event) {
          moveAt(event.pageX);
        }

        document.addEventListener('mousemove', onMouseMove);

        handleLeft.onmouseup = function () {
          document.removeEventListener('mousemove', onMouseMove);
          handleLeft.onmouseup = null;
        };

       
      };*/

      
      
      handleLeft.onmousedown = function (event) { 

        let startPositionX = track.getBoundingClientRect().left;
        let startPositionY = track.getBoundingClientRect().top;

        handleLeft.style.position = 'absolute';
        handleLeft.style.zIndex = 1000;
        document.body.append(handleLeft);

        function moveAt(pageX) {
          if ((pageX - startPositionX < track.offsetWidth) && (pageX > startPositionX)) {
            handleLeft.style.left = pageX + 'px';
            handleLeft.style.top = startPositionY + 'px';
          }
        }

        function onMouseMove(event) {
          moveAt(event.pageX);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function () {
          document.removeEventListener('mousemove', onMouseMove);
          handleLeft.onmouseup = null;
        };

      };

      handleLeft.ondragstart = function () {
        return false;
      };
      

      track.appendChild(handleRight);
      let container = addNode('slider__container');
      container.appendChild(track);

      e[0].appendChild(container)
    }
    this.each(function () { main($(this)); });
    return this;
	};
})(jQuery);

$(function () {
  $(".slider").slider()
})
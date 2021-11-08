import Handle from "@/view/handle.js";
import Track from "@/view/track.js";

export function controller(element){
  let handle = new Handle();
  let track = new Track();

  let trackElement = track.addElement();
  let handleElement = handle.addElement();

  trackElement.appendChild(handleElement);
  let slider = element.appendChild(trackElement);

  $(function(){    
    $(".slider__handle_left").on("mousedown", function () {     
      handle.moveHandle(trackElement, handleElement);
      document.addEventListener('mousemove', handle.onMouseMove.bind(handle));
      document.onmouseup = function () {
        document.removeEventListener('mousemove', handle.onMouseMove);
        handleElement.onmouseup = null;
      };
      handleElement.ondragstart = function () {
        return false;
      };
    })
    
  })

  

  return slider;
}

function moveHandle() {
  let startPositionX = this.trackPosition.left;
  let startPositionY = this.trackPosition.top;
  let trackWidth = this.trackPosition.width;
  let handle = this.element;

  this.element.onmousedown = function (event) {
    document.body.append(handle);
    function moveAt(pageX) {
      if ((pageX - startPositionX < trackWidth) && (pageX > startPositionX)) {
        handle.style.left = pageX + 'px';
        handle.style.top = startPositionY + 'px';
      }
    }
    function onMouseMove(event) {
      moveAt(event.pageX);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      handle.onmouseup = null;
    };
  };
  this.element.ondragstart = function () {
    return false;
  };

  return this.element
}



export default class Controller {
    constructor() {
      this.track = new Track();
      this.handle = new Handle();
    }

    createTrack(){
      this.trackClass = new Track();
      this.trackElement = this.trackClass.createElement();      
    }

    createHandle(){
      this.handle = new Handle(this.trackClass.getPosition());
      this.trackElement.appendChild(this.handleClass.createElement());
    }

    createSlider(){
      this.createTrack();
      this.createHandle();
      return this.trackElement;
    }

    addMovement(){
      return this.handleClass.moveElement()
    }
}
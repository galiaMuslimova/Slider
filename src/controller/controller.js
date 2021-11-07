import Handle from "@/view/handle.js";
import Track from "@/view/track.js";

export default class Controller {
    constructor() {
      this.trackClass;
      this.trackElement;
      this.handleClass;
      this.handleElement;
    }

    createTrack(){
      this.trackClass = new Track();
      this.trackElement = this.trackClass.createElement();
    }

    createHandle(){
      this.handleClass = new Handle(this.trackClass.getPosition());
      this.trackElement.appendChild(this.handleClass.createElement());
    }

    createSlider(){
      this.createTrack();
      this.createHandle();
      return this.trackElement;
    }
}
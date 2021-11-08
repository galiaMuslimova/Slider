import Handle from "@/view/handle.js";
import Track from "@/view/track.js";

export const view = {
  createTrack: function(element){
    let track = new Track();
    this.track = track.addElement();
    element.appendChild(this.track);
  },

  createHandle: function(){
    let handle = new Handle();
    this.handle = handle.addElement();
    this.track.appendChild(handle.addElement())
  },

  createSlider: function(element) {
    this.createTrack(element);
    this.createHandle();
    this.slider = element;
    return this.slider
  },

  getSlider: function(){
    console.log($(this.slider).find(this.track))
    return $(this.slider).find(this.track), this.track;
  }
}
import './plugin'
import "./index.scss";

$(function () {
  $(".mySlider1").slider({    
    start: 0,
    end: 100,
    step: 10, 
    vertical: false,
    tip: true,
    range: true
  })
})
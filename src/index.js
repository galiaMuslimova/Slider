import './plugin'
import "./index.scss";

$(function () {
  $(".mySlider1").slider({    
    min: 0,
    max: undefined,
    step: 10, 
    from: 10,
    to: 70,
    tip: true,
    range: true
  })

  $(".mySlider2").slider({
    min: 1,
    max: 6,
    step: 1,
    vertical: false,
    tip: true,
    range: false
  })

  $(".mySlider3").slider({
    min: 1,
    max: 1000,
    from: 100,
    to: undefined,
    vertical: true,
    tip: false
  })
})
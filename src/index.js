import './plugin'
import "./index.scss";

$(function () {
  $(".mySlider1").slider({    
    min: 0,
    max: undefined,
    step: 10, 
    from: 10,
    to: 70,
    vertical: undefined,
    tip: true,
    range: true
  })

  $(".mySlider2").slider({
    min: -10,
    max: 10,
    step: 2,
    from: undefined,
    to: 5,
    vertical: false,
    tip: true,
    range: false
  })

  $(".mySlider3").slider({
    min: 1,
    max: 1000,
    step: 200,
    from: 100,
    to: undefined,
    vertical: true,
    tip: false,
    range: true
  })
})
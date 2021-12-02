import './plugin'
import "./index.scss";

$(function () {
  $(".mySlider1").slider({    
    start: 0,
    end: 90,
    step: 10, 
    from: 10,
    to: 70,
    vertical: false,
    tip: true,
    range: true
  })

  $(".mySlider2").slider({
    start: -10,
    end: 10,
    step: 2,
    from: -15,
    to: 5,
    vertical: false,
    tip: true,
    range: false
  })

  $(".mySlider3").slider({
    start: 1,
    end: 1000,
    step: 200,
    from: 100,
    to: 900,
    vertical: true,
    tip: false,
    range: true
  })
})
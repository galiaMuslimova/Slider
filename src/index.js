import './plugin'

$(function () {
  $(".mySlider1").slider({    
    start: 10,
    end: 100,
    step: 8, 
    handleCount: 2,
    orientation: 'vertical'
  })
})
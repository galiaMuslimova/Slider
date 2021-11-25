import './plugin'

$(function () {
  $(".slider1").slider({
    handleCount: 2,
    min: 10,
    max: 100,
    step: 8
  })
})
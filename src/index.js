import './plugin'

$(function () {
  $(".slider1").slider({
    handleCount: 2,
    min: 5,
    max: 1000,
    step: 100
  })
})
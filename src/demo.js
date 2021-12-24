import './plugin'
import "./index.scss";

$(function () {
  $(".my-slider_1").slider({
    min: 0,
    max: undefined,
    step: 10,
    from: 10,
    to: 70,
    tip: true,
    range: true
  })

  $(".my-slider_2").slider({
    min: 1,
    max: 6,
    step: 1,
    vertical: false,
    tip: true,
    range: false
  })

  $(".my-slider_3").slider({
    min: 1,
    max: 1000,
    from: 100,
    to: undefined,
    vertical: true,
    tip: false
  })
})
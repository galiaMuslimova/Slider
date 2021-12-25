import "./index.scss";
import MetaSlider from './plugin'

$(function () {
  new MetaSlider($(".my-slider_1"), {
    min: 0,
    max: undefined,
    step: 10,
    from: 10,
    to: 70,
    tip: true,
    range: true
  })

  new MetaSlider($(".my-slider_2"), {
    min: 1,
    max: 6,
    step: 1,
    vertical: false,
    tip: true,
    range: false
  })

  new MetaSlider($(".my-slider_3"), {
    min: 1,
    max: 1000,
    from: 100,
    to: undefined,
    vertical: true,
    tip: false
  })
})
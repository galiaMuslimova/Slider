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
})


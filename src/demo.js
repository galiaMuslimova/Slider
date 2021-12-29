import "./demo_styles.scss";
import MetaSlider from './plugin'

$(function () {
  new MetaSlider($(".my-slider_1"), {
    min: true,
    max: 10,
    step: 15.4,
    from: 18/2,
    to: 70,
    tip: 'gg',
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
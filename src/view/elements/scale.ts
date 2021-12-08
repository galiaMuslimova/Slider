import { IConfig, IPositions, ISettings } from "../../interfaces";

export default class Scale {
  slider: JQuery<HTMLElement>;
  scale: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    this.slider = slider;
    this.scale = jQuery('<div>', {
      class: 'meta-slider__scale',
    }).appendTo(this.slider); 
  }

  initScale(stepsArr: { value: number, x: number }[], vertical:boolean){
    this.scale.empty()
    let handleWidth = 20;
    stepsArr.map(item => {
      jQuery('<div>', {
        class: 'meta-slider__value',
        data_value: item.value,
        text: item.value,
        style: vertical ? `top: ${item.x - handleWidth / 2}px`:`left: ${item.x - handleWidth/2}px`
      }).appendTo(this.scale);
    })
  }
}
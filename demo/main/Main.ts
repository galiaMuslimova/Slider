import ISlider from '../slider/interface';
import Slider from '../slider/Slider';
import IMain from './interface';

class Main implements IMain {  
  public sliders: Map<string, ISlider>;
  private $element: JQuery<HTMLElement>;

  constructor($element: JQuery<HTMLElement>) {
    this.$element = $element;
    this.sliders = new Map<string, ISlider>();
    this.init();
  }

  private init(): void {
    const options = require('./main.json');
    options.forEach(element => {
      const name = `${element.name}`;
      const $sliderElement = this.$element.find(`[data-type=${name}]`);
      const slider = new Slider($sliderElement, element.options);
      this.sliders.set(name, slider);
    }); 
    this.sliders.get('simple').showValues();   
  }
}

export default Main;
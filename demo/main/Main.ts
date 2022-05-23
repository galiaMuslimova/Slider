import { IOptions } from '../interfaces/interfaces';
import ISlider from '../slider/interface';
import Slider from '../slider/Slider';
import IMain from './interface';

class Main implements IMain{
  private $element: JQuery<HTMLElement>;

  constructor($element: JQuery<HTMLElement>) {
    this.$element = $element;
    this.init();
  }

  private init(): void {
    const options = require('./main.json')[0];
    const $simpleSliderElement = this.$element.find('[data-type="simple"]');
    const simpleSlider = this.initSlider($simpleSliderElement, options['simple']);
    const $singleSliderElement = this.$element.find('[data-type="single"]');
    const singleSlider = this.initSlider($singleSliderElement, options['single']);  
    const $verticalSliderElement = this.$element.find('[data-type="vertical"]');
    const verticalSlider = this.initSlider($verticalSliderElement, options['vertical']);    
  }

  private initSlider($element: JQuery<HTMLElement>, options: IOptions): ISlider {
    return new Slider($element, options);
  }
}

export default Main;
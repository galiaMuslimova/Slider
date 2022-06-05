import ISlider from '../slider/interface';
import Slider from '../slider/Slider';
import IMain from './interface';

class Main implements IMain {
  public sliders: ISlider[];

  private $element: JQuery<HTMLElement>;

  constructor($element: JQuery<HTMLElement>) {
    this.$element = $element;
    this.sliders = [];
    this.init();
  }

  private init(): void {
    const $sliders = this.$element.find('.js-main__slider__item');
    $sliders.each((index, item) => {
      const slider = new Slider($(item));
      this.sliders.push(slider);
    });
    this.sliders[0].displayValues(true);
  }
}

export default Main;

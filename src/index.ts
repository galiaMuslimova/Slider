import MetaSlider from './MetaSlider';
import { IConfig, IOptions } from './interfaces/interfaces';
import IMetaSlider from './interface';

declare global {
  interface JQuery {
    MetaSlider(opts?: IOptions): JQuery;
    addPanel(): void;
    getSlider(): IMetaSlider
    setOptions(options: IOptions): IMetaSlider;
    getOptions(): IConfig;
    getValues(): number[];
  }
}

(function ($) {
  $.fn.MetaSlider = function (opts) {
    let slider: IMetaSlider | null = null;

    const config = $.extend({}, {
      min: 10,
      max: 40,
      step: 4,
      from: 8,
      to: 24,
      vertical: false,
      tip: true,
      range: true,
      onChange: (values: number[]) => values,
    }, opts);

    function createSlider($element: JQuery<HTMLElement>) {
      slider = new MetaSlider($element, config);
    }

    this.each(() => {
      createSlider($(this));
    });

    $.fn.getSlider = () => {
      if (slider) {
        return slider;
      } throw new Error('no slider');
    };

    $.fn.setOptions = (options) => {
      if (slider) {
        slider.setOptions(options);
        return slider;
      } throw new Error('no slider');
    };

    $.fn.getOptions = () => {
      if (slider) {
        return slider.getOptions();
      } throw new Error('no slider');
    };

    $.fn.getValues = () => {
      if (slider) {
        return slider.getValues();
      } throw new Error('no slider');
    };

    return this;
  };
}(jQuery));

export default MetaSlider;

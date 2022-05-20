import MetaSlider from './MetaSlider';
import { IConfig, IOptions } from './interfaces/interfaces';
import IMetaSlider from './interface';

declare global {
  interface JQuery {
    MetaSlider(opts?: IOptions): JQuery;
    addPanel(): void;
    setOptions(options: IOptions): void;
    getOptions(): IConfig;
    getValues(): { from: number, to?: number };
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

    this.each(function () {
      createSlider($(this));
    });

    $.fn.setOptions = function (options) {
      slider?.setOptions(options);
    };

    $.fn.getOptions = function () {
      if (slider) {
        return slider.getOptions();
      } throw new Error('no slider');
    };

    return this;
  };
}(jQuery));

export default MetaSlider;

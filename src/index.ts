import MetaSlider from './MetaSlider';
import { IConfig, IOptions } from './interfaces/interfaces';

declare global {
  interface JQuery {
    MetaSlider(opts?: IOptions): JQuery<HTMLElement>;
    addPanel(): void;
    getSlider(): JQuery<HTMLElement>
    setOptions(options: IOptions): JQuery<HTMLElement>;
    getOptions(): IConfig;
    getValues(): number[];
  }
}

(function ($) {
  $.fn.MetaSlider = function (opts) {
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

    this.each(function () {
      const slider = new MetaSlider($(this), config);
      $(this).data('slider', slider);
    });

    return $(this);
  };

  $.fn.setOptions = function (options) {
    this.data('slider').setOptions(options);
    return this;
  };

  $.fn.getSlider = function () { return this; };

  $.fn.getOptions = function () {
    return this.data('slider').getOptions();
  };

  $.fn.getValues = function () {
    return this.data('slider').getValues();
  };
}(jQuery));

export default MetaSlider;

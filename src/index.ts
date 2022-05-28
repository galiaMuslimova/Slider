import MetaSlider from './MetaSlider';
import { IConfig, IOptions } from './interfaces/interfaces';

declare global {
  interface JQuery {
    MetaSlider(method: keyof IMethods, args?: IOptions): JQuery<HTMLElement>;
    getOptions(): IConfig;
    getValues(): number[];
  }
}

interface IMethods {
  init: (options?: IOptions) => void,
  setOptions: (options?: IOptions) => void
}

(function ($) {
  const defaults = {
    min: 10,
    max: 40,
    step: 4,
    from: 8,
    to: 24,
    vertical: false,
    tip: true,
    range: true,
    onChange: (values: number[]) => values,
  };

  const methods: IMethods = {
    init(this: JQuery<HTMLElement>, options?: IOptions) {
      const config = $.extend({}, defaults, options);
      const slider = new MetaSlider(this, config);
      $.each(config, (key, value) => {
        this.attr(`data-${key}`, `${value}`);
      });
      this.data('slider', slider);
    },
    setOptions(this: JQuery<HTMLElement>, options?: IOptions) {
      const config = this.data('slider').setOptions(options);
      $.each(config, (key, value) => {
        this.attr(`data-${String(key)}`, `${value}`);
      });
    },
  };

  $.fn.MetaSlider = function (method: keyof IMethods, ...args) {
    const $this = $(this);
    if (methods[method]) {
      methods[method].apply($this, args);
      return this;
    } if (typeof method === 'object' || !method) {
      methods.init.apply($this, args);
      return this;
    }
    $.error(`Method ${method} does not exist on jQuery.tooltip`);
    return this;
  };

  $.fn.getOptions = function () {
    return this.data('slider').getOptions();
  };

  $.fn.getValues = function () {
    return this.data('slider').getValues();
  };
}(jQuery));

export default MetaSlider;

import MetaSlider from './MetaSlider';
import { IConfig, IOptions } from './interfaces/interfaces';

interface MetaSl {
  (method: keyof IMethods): IConfig;
  (method: keyof IMethods, options: IOptions): JQuery<HTMLElement>;
}

declare global {
  interface JQuery {
    MetaSlider: MetaSl;
  }
}
interface IMethods {
  init: (options: IOptions) => void;
  setOptions: (options: IOptions) => void;
  getOptions: () => IConfig;
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
    onChange: (config: IConfig) => [config.from, config.to],
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
    setOptions(this: JQuery<HTMLElement>, options: IOptions) {
      const config = this.data('slider').setOptions(options);
      $.each(config, (key, value) => {
        this.attr(`data-${String(key)}`, `${value}`);
      });
    },
    getOptions(this: JQuery<HTMLElement>) {
      return this.data('slider').getOptions();
    },
  };

  function makeSlider(method: keyof IMethods): IConfig;
  function makeSlider(
    method: keyof IMethods,
    options?: IOptions
  ): JQuery<HTMLElement>;
  function makeSlider(
    this: JQuery<HTMLElement>,
    method: keyof IMethods,
    options?: IOptions,
  ) {
    const $this = $(this);
    if (method === 'getOptions') {
      return methods[method].apply($this);
    }
    if (!method && !options) {
      methods.init.apply($this, [{}]);
      return this;
    }
    if (!method && options) {
      methods.init.apply($this, [options]);
      return this;
    }
    if (methods[method] && options) {
      methods[method].apply($this, [options]);
      return this;
    }

    $.error(`Method ${method} does not exist on jQuery.tooltip`);
    return this;
  }

  $.fn.MetaSlider = makeSlider;
}(jQuery));

export default MetaSlider;

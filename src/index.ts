import MetaSlider from './MetaSlider';
import { IConfig, IOptions } from './interfaces/interfaces';
import defaults from './defaults';

interface MetaSl {
  (method?: 'init'): JQuery<HTMLElement>;
  (method: 'getOptions'): IConfig;
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
  const methods: IMethods = {
    init(this: JQuery<HTMLElement>, options: IOptions) {
      const config = $.extend({}, defaults, options);
      const slider = new MetaSlider(this, config);
      $.each(config, (key, value) => {
        this.attr(`data-${key}`, `${value}`);
      });
      this.data('slider', slider);
    },
    setOptions(this: JQuery<HTMLElement>, options: IOptions) {
      const dataOptions = $.extend(
        {},
        this.data('slider').getOptions(),
        options,
      );
      const config = this.data('slider').setOptions(dataOptions);
      $.each(config, (key, value) => {
        this.attr(`data-${String(key)}`, `${value}`);
      });
    },
    getOptions(this: JQuery<HTMLElement>) {
      return this.data('slider').getOptions();
    },
  };

  function makeSlider(method?: 'init'): JQuery<HTMLElement>;
  function makeSlider(method: 'getOptions'): IConfig;
  function makeSlider(
    method: keyof IMethods,
    options?: IOptions
  ): JQuery<HTMLElement>;
  function makeSlider(
    this: JQuery<HTMLElement>,
    method?: keyof IMethods,
    options?: IOptions,
  ) {
    const $this = $(this);
    if (!method || method === 'init') {
      const dataOptions = { ...$this.data() } || {};
      methods.init.apply($this, [options || dataOptions]);
      return this;
    }
    if (method === 'getOptions') {
      return methods[method].apply($this);
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

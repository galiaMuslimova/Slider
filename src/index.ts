import MetaSlider from './MetaSlider';
import { IOptions } from './interfaces/interfaces';
import IMetaSlider from './interface';

declare global {
  interface JQuery {
    MetaSlider(opts?: IOptions): JQuery;
    addPanel(): void;
  }
}

(function ($) {
  let slider: IMetaSlider | null = null;

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
    }, opts);

    function createSlider($element: JQuery<HTMLElement>) {
      slider = new MetaSlider($element, config);
    }

    this.each(function () {
      createSlider($(this));
    });

    return this;
  };

  $.fn.addPanel = function () {
    if (slider) {
      slider.addPanel();
    }
  };
}(jQuery));

export default MetaSlider;

import "./plugin.scss";
import { Controller } from "./controller/controller";
import { IConfig } from "./interfaces";
import jQuery from 'jquery';

declare global {
  interface JQuery {
    slider(options: IConfig): void;
  }
}

(function ($) {
  $.fn.slider = function (options: IConfig) {
    new Controller(this, options)
    return this;
  }
})(jQuery);




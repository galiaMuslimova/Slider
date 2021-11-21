import "./index.scss";
import { Controller } from "./controller/controller";
import { IConfig } from "./interfaces";

(function ($) {
  $.fn.slider = function (options: IConfig) {
    new Controller(this, options)
    return this;
  }
})(jQuery);




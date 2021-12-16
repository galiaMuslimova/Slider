import './plugin.scss';
import jQuery from 'jquery';
import Controller from './controller/controller';
import { IConfig } from './interfaces';


declare global {
  interface JQuery {
    slider(options: IConfig): void;
  }
}

(function ($) {
  $.fn.slider =  (options: IConfig) => {
    new Controller(this, options)
    return this;
  }
})(jQuery);
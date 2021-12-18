import './plugin.scss';
import jQuery from 'jquery';
import Controller from './controller/controller';
import { IConfig } from './interfaces';

declare global {
  interface JQuery {
    slider(options: IConfig): void;
  }
}

((param) => {
  const $ = param;
  $.fn.slider = function (options: IConfig) {
    const element: JQuery<HTMLElement> = this;
    const controller = new Controller(element, options);
    controller.init();
    return this;
  };
})(jQuery);

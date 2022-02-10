import './demo_styles.scss';
import { IOptions } from './interfaces';
import MetaSlider from './plugin';

$(() => {
  const options1: IOptions = {
    min: true,
    max: 10,
    step: 15.4,
    from: 18 / 2,
    to: 70,
    tip: 'gg',
    range: true,
  };
  const element1 = $('.js-body__container_first').find('.js-body__slider');
  const slider1 = new MetaSlider(element1, options1);

  const options2: IOptions = {
    min: 1,
    max: 6,
    step: 1,
    vertical: false,
    tip: true,
    range: false,
  };
  const element2 = $('.js-body__container_second').find('.js-body__slider');
  const slider2 = new MetaSlider(element2, options2);

  const options3: IOptions = {
    min: 1,
    max: 1000,
    from: 100,
    to: undefined,
    vertical: true,
    tip: false,
  };
  const element3 = $('.js-body__container_third').find('.js-body__slider');
  const slider3 = new MetaSlider(element3, options3);
});

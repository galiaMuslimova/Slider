import './demo_styles.scss';
import { IOptions } from './interfaces/interfaces';
import MetaSlider from './MetaSlider';

const options1: IOptions = {
  min: 0,
  max: 50,
  step: 1,
  from: 3,
  to: 70,
  tip: 'gg',
  range: true,
};
const element1 = $('.js-body__slider_first');
const slider1 = new MetaSlider(element1, options1);
slider1.addPanel();

const options2: IOptions = {
  min: 100000,
  max: 210000,
  from: 25000,
  to: 35750,
  step: 3000,
  vertical: false,
  tip: true,
  range: false,
};
const element2 = $('.js-body__slider_second');
const slider2 = new MetaSlider(element2, options2);
slider2.addPanel();

const options3: IOptions = {
  min: 1,
  max: 1000,
  from: 100,
  step: 10,
  to: undefined,
  vertical: true,
  tip: false,
};
const element3 = $('.js-body__slider_third');
const slider3 = new MetaSlider(element3, options3);
slider3.addPanel();

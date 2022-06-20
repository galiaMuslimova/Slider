import { expect } from 'chai';
import sinon from 'sinon';
import { testConfig } from '../defaults';
import { IConfig } from '../interfaces/interfaces';
import IView from './interface';

import View from './View';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='body__slider js-body__slider'></div>
</body>`);
global.window = dom.window;

(global as any).$ = require('jquery');
(global as any).jQuery = require('jquery');

const { document } = dom.window;

describe('View', () => {
  const $root: JQuery<HTMLElement> = $(document).find('.js-body__slider');
  let $slider: JQuery<HTMLElement>;
  let view: IView;
  let stub: sinon.SinonStub;

  before(() => {
    view = new View($root, testConfig);
    view.changeConfig({
      min: 0,
      max: 10,
      step: 1,
      from: 2,
      to: 8,
      isVertical: false,
      hasTip: true,
      withRange: true,
      fromPosition: 100,
      toPosition: 400,
    });
    $slider = $root.find('.js-meta-slider');
    stub = sinon.stub(view, 'initTrackParameters');
  });

  it('check creating slider element', () => {
    expect($slider.length).to.equal(1);
  });

  it('shcek settting isVertical false', () => {
    expect($slider.hasClass('meta-slider_vertical')).to.equal(false);
    expect($slider.hasClass('meta-slider_horizontal')).to.equal(true);
  });

  it('check trackClick', () => {
    expect($slider.hasClass('meta-slider_vertical')).to.equal(false);
    expect($slider.hasClass('meta-slider_horizontal')).to.equal(true);
  });

  it('check setting withRange true', () => {
    const $handles = $root.find('.js-meta-slider__handle');
    expect($handles.length).to.equal(2);
  });

  it('check setting withRange false', () => {
    view.changeConfig({
      min: 0,
      max: 10,
      step: 1,
      from: 2,
      to: 8,
      isVertical: false,
      hasTip: true,
      withRange: false,
      fromPosition: 100,
      toPosition: 400,
    });
    const $handles = $root.find('.js-meta-slider__handle');
    expect($handles.length).to.equal(1);
  });
});

import { expect } from 'chai';
import sinon from 'sinon';
import { testConfig, testPositions } from '../../../defaults';
import { IPositions, ITrackPosition } from '../../../interfaces/interfaces';

import Scale from './Scale';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='meta-slider js-meta-slider'></div>
</body>`);
global.window = dom.window;

const { document } = dom.window;

describe('Scale', () => {
  let $slider: JQuery<HTMLElement>;
  let scaleClass: Scale;
  let $scale: JQuery<HTMLElement>;
  let trackParameters: ITrackPosition;
  let spy: sinon.SinonSpy;
  let array: IPositions[];

  before(() => {
    $slider = $(document).find('.js-meta-slider');
    scaleClass = new Scale($slider, testConfig);
    $scale = $slider.find('.js-meta-slider__scale');
    $scale.css('width', '500');
    trackParameters = { trackStart: 0, trackWidth: 500 };
    scaleClass.initPositions(trackParameters);
    spy = sinon.spy(scaleClass.observer, 'notify');
    array = [
      { value: 1, position: 10 },
      { value: 2, position: 20 },
      { value: 3, position: 30 },
      { value: 4, position: 40 },
      { value: 5, position: 50 },
      { value: 6, position: 60 },
      { value: 7, position: 70 },
      { value: 8, position: 80 },
      { value: 9, position: 90 },
      { value: 10, position: 100 }];
  });

  it('check creating scale element', () => {
    const scaleItems = $scale.find('.js-meta-slider__scale-item');
    const scaleValues = $scale.find('.js-meta-slider__value');
    scaleValues.each(function (index) {
      expect(Number($(this).text())).to.eq(testPositions[index].value);
    });
    expect(scaleItems.length).to.eq(11);
  });

  it('check creating positions', () => {
    scaleClass.initPositions(trackParameters);
    expect(scaleClass.getPositions()).to.deep.eq(testPositions);
  });

  it('check creating positions', () => {
    scaleClass.setConfig({
      min: 0,
      max: 10,
      step: 3,
      from: 3,
      to: 9,
      isVertical: false,
      hasTip: true,
      withRange: false,
      fromPosition: 150,
      toPosition: 450,
    });
    scaleClass.initPositions(trackParameters);
    expect(scaleClass.getPositions()).to.deep.eq([
      { value: 0, position: 0 },
      { value: 3, position: 150 },
      { value: 6, position: 300 },
      { value: 9, position: 450 },
      { value: 10, position: 500 }]);
  });

  it('check click scale', () => {
    const eClick = jQuery.Event('click', { target: { dataset: { value: 3 } } });
    $scale?.triggerHandler(eClick);
    expect(spy.calledOnce).to.equal(true);
  });

  it('check reduceArray', () => {
    const correctedArray = Scale.reduceArray(array, 4);
    expect(correctedArray).to.deep.equal([
      { value: 1, position: 10 },
      { value: 4, position: 40 },
      { value: 7, position: 70 },
      { value: 10, position: 100 }]);
  });

  it('check reduceArray', () => {
    const correctedArray = Scale.reduceArray(array, 5);
    expect(correctedArray).to.deep.equal([
      { value: 1, position: 10 },
      { value: 3, position: 30 },
      { value: 5, position: 50 },
      { value: 7, position: 70 },
      { value: 9, position: 90 },
      { value: 10, position: 100 }]);
  });

  it('check not reduceArray', () => {
    const correctedArray = Scale.reduceArray(array, 12);
    expect(correctedArray).to.deep.equal(array);
  });
});

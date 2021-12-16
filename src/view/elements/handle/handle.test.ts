import { expect } from 'chai';
import Handle from './handle';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body><div class=\'testSlider\'><div class=\'meta-slider\'></div></div></body>');
global.window = dom.window;
global.$ = require('jquery');
global.jQuery = require('jquery');

const { document } = dom.window;

describe('Handle', () => {
  let slider: JQuery<HTMLElement>;
  let handleClass: Handle;

  before(() => {
    slider = $(document).find('.meta-slider');
    jQuery('<div>', {
      class: 'meta-slider__track',
    }).appendTo(slider);
    handleClass = new Handle(slider);
  });

  it('проверить количество handle = 2 при range=true', () => {
    handleClass.initHandles(true);
    expect($(slider).find('.meta-slider__handle').length).to.equal(2);
    expect(handleClass.handles.length).to.equal(2);
  });

  it('проверить количество handle = 1 при range=false', () => {
    handleClass.initHandles(false);
    expect($(slider).find('.meta-slider__handle').length).to.equal(1);
    expect(handleClass.handles.length).to.equal(1);
  });

  it('проверить позицию при handle = 1 при vertical=false', () => {
    handleClass.moveHandles([100], false);
    $(slider).find('.meta-slider__handle').each(() => {
      expect($(this).css('left')).to.equal('90px');
    });
  });

  it('проверить позицию при handle = 1 при vertical=true', () => {
    handleClass.moveHandles([150], true);
    $(slider).find('.meta-slider__handle').each(() => {
      expect($(this).css('top')).to.equal('140px');
    });
  });

  it('проверить позицию при handle = 2 при vertical=false', () => {
    const handleX = [-10, 10];
    handleClass.moveHandles(handleX, false);
    $(slider).find('.meta-slider__handle').each((index) => {
      expect($(this).css('left')).to.equal(`${handleX[index] - 10}px`);
    });
  });

  it('проверить позицию при handle = 2 при vertical=true', () => {
    const handleX = [50, 200];
    handleClass.moveHandles(handleX, true);
    $(slider).find('.meta-slider__handle').each((index) => {
      expect($(this).css('top')).to.equal(`${handleX[index] - 10}px`);
    });
  });
});

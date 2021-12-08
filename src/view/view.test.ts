import { expect } from 'chai';
import View from './view';

const JSDOM = require('jsdom').JSDOM;
const dom = new JSDOM(`<!DOCTYPE html><body><div class='testSlider'></div></body>`);
global.window = dom.window;
global.$ = global.jQuery = require('jquery');
const document = dom.window.document;

describe('View', () => {
  let root: JQuery<HTMLElement>;

  before(function () {
    root = $(document).find('.testSlider') as JQuery<HTMLElement>
  })

  it('проверяет класс вертикальный', () => {
    let view = new View(root, true);
    let container = view.container;
    expect(container.hasClass('meta-slider_vertical')).to.equal(true);
  });

  it('проверяет класс горизонтальный', () => {
    let view = new View(root, false);
    let container = view.container;
    expect(container.hasClass('meta-slider_horizontal')).to.equal(true);
  });

  it('проверяет класс не вертикальный', () => {
    let view = new View(root, false);
    let container = view.container;
    expect(container.hasClass('meta-slider_vertical')).to.equal(false);
  });

  it('проверяет класс не горизонтальный', () => {
    let view = new View(root, true);
    let container = view.container;
    expect(container.hasClass('meta-slider_horizontal')).to.equal(false);
  });

})
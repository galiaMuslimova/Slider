import { expect } from 'chai';
import { IConfig } from '../interfaces/interfaces';

import View from './View';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='testSlider'>
    <div class='body__container js-body__container'>
      <div class='body__slider js-body__slider'></div>
        <div class='panel js-panel'>
          <form class='panel__form js-panel__form'>            
            <input class='input__field js-input__field', type='number', name='max'></input>
            <input class='input__field js-input__field', type='number', name='min'></input>
            <input class='input__field js-input__field', type='number', name='step'></input>
            <input class='input__field js-input__field', type='number', name='from'></input>
            <input class='input__field js-input__field', type='number', name='to'></input>
            <input class='input__field js-input__field', type='checkbox', name='tip'></input>
            <input class='input__field js-input__field', type='checkbox', name='range'></input>
            <input class='input__field js-input__field', type='checkbox', name='vertical'></input>
          </form>
        </div>
      </div>
    </div>
  </div>
</body>`);
global.window = dom.window;

(global as any).$ = require('jquery');
(global as any).jQuery = require('jquery');

const { document } = dom.window;

describe('View', () => {
  let $slider: JQuery<HTMLElement>;
  let $root: JQuery<HTMLElement>;
  let config: IConfig;

  before(() => {
    $slider = $(document).find('.testSlider');
    $root = $(document).find('.body__slider');
    config = {
      max: 50,
      min: 0,
      step: 5,
      from: 5,
      to: 40,
      vertical: false,
      tip: true,
      range: true,
    };
  });

  afterEach(() => {
    $root.empty();
  });

  it('проверяет параметры трэка', () => {
    const view = new View($root, true);
    const trackParameters = view.getTrackParameters();
    expect(trackParameters).to.deep.equal({ trackStart: 0, trackWidth: 0 });
  });

  it('проверяет изменился на горизонтальный', () => {
    const view = new View($root, true);
    view.changeDirection(false);
    expect(view.$container.hasClass('body__container_horizontal')).to.equal(true);
  });
});

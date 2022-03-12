import { expect } from 'chai';

import Controller from './Controller';

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
const { document } = dom.window;

describe('Controller', () => {
  it('устанавливает опции', () => {
    const $slider = $(document).find('.body__slider');
    const options = {
      min: 5,
      max: 10,
    };
    const controller = new Controller($slider, options);
    expect(controller.options).to.deep.equal(options);
  });

  it('устанавливает корневой элемент', () => {
    const $slider = $(document).find('.body__slider');
    const options = {
      min: 5,
      max: 10,
    };
    const controller = new Controller($slider, options);
    expect(controller.$root).to.deep.equal($slider);
  });
});

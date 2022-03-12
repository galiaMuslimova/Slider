import { expect, assert } from 'chai';

import Input from './Input';

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

describe('Input', () => {
  let $inputMin: JQuery<HTMLElement>;
  let inputClass: Input;

  before(() => {
    $inputMin = $(document).find("input[name='min']");
  });

  beforeEach(() => {
    inputClass = new Input($inputMin);
  });

  it('проверяет получение name', () => {
    const name = inputClass.getName();
    expect(name).to.equal('min');
  });

  it('проверяет установку, получение value', () => {
    inputClass.setValue(5);
    const value = inputClass.getValue();
    expect(value).to.equal(5);
  });

  it('проверяет установку prop', () => {
    inputClass.setProp('max', 10);
    const max = Number(inputClass.element.prop('max'));
    expect(max).to.equal(10);
  });
});

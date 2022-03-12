import { expect, assert } from 'chai';

import { IConfig } from '../interfaces/interfaces';
import Panel from './Panel';

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

describe('Panel', () => {
  let $root: JQuery<HTMLElement>;
  let panelClass: Panel;
  let config: IConfig;

  before(() => {
    $root = $(document).find('.js-body__container');
  });

  beforeEach(() => {
    panelClass = new Panel($root);
    config = {
      min: 5,
      max: 15,
      step: 1,
      from: 8,
      to: 10,
      vertical: false,
      tip: true,
      range: true,
    };
    panelClass.initPanel(config);
  });

  it('проверяет установку параметров', () => {
    const minInput = panelClass.inputs.get('min');
    expect(minInput?.getValue()).to.equal(5);
  });

  it('проверяет установку значений from, to', () => {
    panelClass.initValues([5, 10]);
    const fromInput = panelClass.inputs.get('from');
    expect(fromInput?.getValue()).to.equal(5);
    const toInput = panelClass.inputs.get('to');
    expect(toInput?.getValue()).to.equal(10);
  });

  it('проверяет установку значений', () => {
    panelClass.setValue({ step: 2 });
    const stepInput = panelClass.inputs.get('step');
    expect(stepInput?.getValue()).to.equal(2);
  });
});

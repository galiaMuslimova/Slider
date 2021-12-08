import { assert, expect } from 'chai';
import Model from './model';

const JSDOM = require('jsdom').JSDOM;
const jsDom = new JSDOM('<html>...</html>')

const { window } = jsDom;
const { document } = window;
global.window = window;
global.$ = global.jQuery = require('jquery');

describe('Model', () => {
  let root: JQuery<HTMLElement>;

  before(function () {
    root = $(document).find('.slider').parent()
  })

  it('Инициализирует опции от пользователя', () => {
    const model = new Model({
      min: 15,
      max: 25,
      step: 1,
      from: 18,
      to: 20,
      vertical: false,
      tip: true,
      range: true
    }, 0, 500);
    expect(model.config.min).to.equal(15);
    expect(model.config.max).to.equal(25);
    expect(model.config.step).to.equal(1);
    expect(model.config.from).to.equal(18);
    expect(model.config.to).to.equal(20);
    expect(model.config.vertical).to.equal(false);
    expect(model.config.tip).to.equal(true);
    expect(model.config.range).to.equal(true);

    /*model.setState({
      min: 10,
      max: 51,
      step: 2,
      values: [20, 60],
    });
    expect(model.state.min).to.equal(10);
    expect(model.state.max).to.equal(51);
    expect(model.state.values).to.deep.equal([20, 51]);
    expect(model.state.step).to.equal(2);*/
  });
})
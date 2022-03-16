import { expect } from 'chai';
import { IOptions } from '../interfaces/interfaces';
import IPanel from '../panel/interface';
import IHandle from '../view/elements/handle/interface';
import IScale from '../view/elements/scale/interface';
import ITrack from '../view/elements/track/interface';

import Controller from './Controller';
import IController from './interface';

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
  let $slider: JQuery<HTMLElement>;
  let options: IOptions;
  let controller: IController;
  let scale: IScale;
  let track: ITrack;
  let handle: IHandle;
  let panel: IPanel;

  before(() => {
    $slider = $(document).find('.body__slider');
    options = {
      min: 0,
      max: 10,
      step: 1,
      from: 2,
      to: 8,
      range: true,
      vertical: false,
    };
    controller = new Controller($slider, options);
    scale = controller.view.scale;
    scale.$scale.css('width', '500px');
    scale.$scale.css('left', '0px');
    track = controller.view.track;
    track.$track.css('width', '500px');
    track.$track.css('left', '0px');
    handle = controller.view.handles;
    panel = controller.view.panel;
    const { trackStart, trackWidth } = controller.view.getTrackParameters();
    controller.model.setTrackStart(trackStart);
    controller.model.setTrackWidth(trackWidth);
    controller.model.initStepsArr();
    controller.model.initParameters();
    controller.init();
  });

  afterEach(() => {
    $slider.empty();
  });

  it('устанавливает опции', () => {
    expect(controller.options).to.deep.equal(options);
  });

  it('устанавливает корневой элемент', () => {
    expect(controller.$root).to.deep.equal($slider);
  });

  it('устанавливает stepsArr', () => {
    const stepsArr = controller.model.getStepsArr();
    const expectedStepsArr = [
      { value: 0, x: 0 },
      { value: 1, x: 50 },
      { value: 2, x: 100 },
      { value: 3, x: 150 },
      { value: 4, x: 200 },
      { value: 5, x: 250 },
      { value: 6, x: 300 },
      { value: 7, x: 350 },
      { value: 8, x: 400 },
      { value: 9, x: 450 },
      { value: 10, x: 500 },
    ];
    expect(stepsArr).to.deep.equal(expectedStepsArr);
  });

  it('устанавливает parameters', () => {
    const parameters = controller.model.getParameters();
    const expectedParameters = {
      values: [2, 8],
      positions: [100, 400],
    };
    expect(parameters).to.deep.equal(expectedParameters);
  });

  it('проверяет позиции handles', () => {
    const handles = handle.getHandles();
    expect($(handles[0]).css('left')).to.deep.equal('90px');
    expect($(handles[1]).css('left')).to.deep.equal('390px');
  });

  it('проверяет click track', () => {
    const e = jQuery.Event('click', { pageY: 10, pageX: 10 });
    track.$track.triggerHandler(e);
    const handles = handle.getHandles();
    console.log($(handles[0]).css('left'));
    console.log($(handles[1]).css('left'));
  });

  it('проверяет click scale', () => {
    const e = jQuery.Event('click');
    const dataValue = scale.$scale.find('.meta-slider__value[data-value="0"]');
    console.log($(dataValue[0]));
    $(dataValue[0]).trigger('click');
    const handles = handle.getHandles();
    console.log($(handles[0]).css('left'));
    console.log($(handles[1]).css('left'));
  });

  it('проверяет move handle', () => {
    const handles = handle.getHandles();
    $(handles[0])
      .trigger('mousedown', { pageX: 100, pageY: 10 })
      .trigger('mousemove', { pageX: 200, pageY: 10 })
      .trigger('mouseup');
    console.log($(handles[0]).css('left'));
    console.log($(handles[1]).css('left'));
  });

  it('проверяет change input from', () => {
    const e = jQuery.Event('change', { target: { value: 6 } });
    panel.from.element.triggerHandler(e);
    const from = panel.from.getValue();
    const handles = handle.getHandles();
    const expectParameters = { values: [6, 8], positions: [300, 400] };
    expect(from).to.deep.equal(6);
    expect(controller.model.getParameters()).to.deep.equal(expectParameters);
    expect($(handles[0]).css('left')).to.deep.equal('290px');
    expect($(handles[1]).css('left')).to.deep.equal('390px');
  });

  it('проверяет change input step', () => {
    const e = jQuery.Event('change', { target: { value: 2 } });
    panel.step.element.triggerHandler(e);
    const step = panel.step.getValue();
    const stepsArr = controller.model.getStepsArr();
    const expectedStepsArr = [
      { value: 0, x: 0 },
      { value: 2, x: 100 },
      { value: 4, x: 200 },
      { value: 6, x: 300 },
      { value: 8, x: 400 },
      { value: 10, x: 500 },
    ];
    const scaleItemsCount = scale.$scale.find('.meta-slider__scale-item').length;
    expect(stepsArr).to.deep.equal(expectedStepsArr);
    expect(step).to.deep.equal(2);
    expect(scaleItemsCount).to.deep.equal(6);
  });

  it('проверяет change input range', () => {
    const e = jQuery.Event('change', { target: { checked: false } });
    panel.range.element.triggerHandler(e);
    const range = panel.range.getValue();
    const handles = handle.getHandles();
    expect(controller.model.getParameters()).to.deep.equal({ values: [6], positions: [300] });
    expect(range).to.deep.equal(false);
    expect(handles.length).to.deep.equal(1);
    expect($(handles[0]).css('left')).to.deep.equal('290px');
  });
});

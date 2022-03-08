import { IPosition } from '../../../interfaces/interfaces';
import Observer from '../../../observer/Observer';

class Scale {
  readonly $slider: JQuery<HTMLElement>;

  private vertical: boolean;

  public observer: Observer;

  readonly $scale: JQuery<HTMLElement>;

  private position: { top: number, left: number };

  private scaleWidth: number | undefined;

  constructor(slider: JQuery<HTMLElement>, vertical: boolean) {
    this.$slider = slider;
    this.vertical = vertical;
    this.observer = new Observer();
    this.$scale = jQuery('<div>', {
      class: 'meta-slider__scale',
    }).appendTo(this.$slider);
    this.position = this.$scale.position();
    this.scaleWidth = this.vertical ? this.$scale.height() : this.$scale.width();
    this.bindEventListeners();
  }

  private bindEventListeners() {
    $(this.$slider).on('click touchstart', this.sendScaleClickValue.bind(this));
  }

  private sendScaleClickValue(event: Event) {
    const { observer } = this;
    if ((<HTMLInputElement>event.target).dataset.value) {
      const currentValue = Number((<HTMLInputElement>event.target).dataset.value);
      observer.notify('click', currentValue);
    }
  }

  public initScale(stepsArr: IPosition[], vertical:boolean = false) {
    this.vertical = vertical;
    this.$scale.empty();
    this.addLines(stepsArr);
    this.addValues(stepsArr);
  }

  private addLines(stepsArr: IPosition[]) {
    stepsArr.forEach((item) => {
      jQuery('<div>', {
        class: 'meta-slider__line',
        text: this.vertical ? '\u2014' : '|',
        style: this.vertical ? `top: ${item.x - 10}px` : `left: ${item.x - 10}px`,
      }).appendTo(this.$scale);
    });
  }

  private addValues(stepsArr: IPosition[]) {
    const valuesArr: { item: IPosition, index: number }[] = [];
    const $lines = this.$scale.find('.meta-slider__line');
    const emptyStepsLength = Math.round(stepsArr.length / 10);
    const isStepsArrLengthBig = stepsArr.length > 10;
    stepsArr.forEach((item, i) => {
      const isLineInStep = i % emptyStepsLength === 0;
      const isValueSuitable = isStepsArrLengthBig && isLineInStep;
      const isAddValue = isValueSuitable || !isStepsArrLengthBig;
      if (isAddValue) {
        valuesArr.push({ item, index: i });
      }
    });
    if (valuesArr[valuesArr.length - 1].item !== stepsArr[stepsArr.length - 1]) {
      valuesArr.pop();
      valuesArr.push({ item: stepsArr[stepsArr.length - 1], index: stepsArr.length - 1 });
    }
    valuesArr.forEach((item) => {
      const value = jQuery('<div>', {
        class: 'meta-slider__value js-meta-slider__value',
        'data-value': item.item.value,
        text: item.item.value,
      });
      value.appendTo($lines[item.index]);
    });
  }

  public setVertical(vertical: boolean) {
    this.vertical = vertical;
    this.scaleWidth = this.vertical ? this.$scale.height() : this.$scale.width();
  }
}

export default Scale;

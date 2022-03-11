import { IPosition } from '../../../interfaces/interfaces';
import Observer from '../../../observer/Observer';

class Scale {
  public observer: Observer;

  readonly $slider: JQuery<HTMLElement>;

  readonly $scale: JQuery<HTMLElement>;

  private vertical: boolean;

  constructor(slider: JQuery<HTMLElement>, vertical: boolean) {
    this.$slider = slider;
    this.vertical = vertical;
    this.observer = new Observer();
    this.$scale = jQuery('<div>', {
      class: 'meta-slider__scale',
    }).appendTo(this.$slider);
    this.bindEventListeners();
  }

  public initScale(stepsArr: IPosition[], vertical:boolean = false) {
    this.vertical = vertical;
    this.$scale.empty();
    const valuesArr = Scale.takeValues(stepsArr);
    this.addValues(valuesArr);
  }

  public setVertical(vertical: boolean) {
    this.vertical = vertical;
  }

  static takeValues(stepsArr: IPosition[]) {
    const valuesArr: { item: IPosition, index: number }[] = [];
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
    return valuesArr;
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

  private addValues(valuesArr: { item: IPosition, index: number }[]) {
    valuesArr.forEach((item) => {
      const line = jQuery('<div>', {
        class: 'meta-slider__line',
        text: this.vertical ? '\u2014' : '|',
        style: this.vertical ? `top: ${item.item.x - 10}px` : `left: ${item.item.x - 10}px`,
      }).appendTo(this.$scale);
      jQuery('<div>', {
        class: 'meta-slider__value js-meta-slider__value',
        'data-value': item.item.value,
        text: item.item.value,
      }).appendTo(line);
    });
  }
}

export default Scale;

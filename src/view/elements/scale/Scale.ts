import { IParameters } from '../../../interfaces/interfaces';
import Observer from '../../../observer/Observer';
import IObserver from '../../../observer/interface';
import IScale from './interface';

class Scale implements IScale {
  public observer: IObserver;

  public $slider: JQuery<HTMLElement>;

  public $scale: JQuery<HTMLElement>;

  private stepsArr: IParameters[];

  private itemWidth: number;

  private scaleSize: number;

  private vertical: boolean;

  constructor(slider: JQuery<HTMLElement>) {
    this.$slider = slider;
    this.vertical = false;
    this.observer = new Observer();
    this.$scale = jQuery('<div>');
    this.stepsArr = [];
    this.itemWidth = 20;
    this.scaleSize = 500;
    this.init();
  }

  public correctScale(stepsArr: IParameters[], vertical: boolean): void {
    this.vertical = vertical;
    this.stepsArr = stepsArr;
    this.$scale.empty();
    this.itemWidth = this.takeWidth();
    this.scaleSize = this.takeScaleSize();
    this.addValues();
    this.bindEventListeners();
  }

  static reduceArray(array: IParameters[], size: number): IParameters[] {
    const isStepsArrSmall = array.length < size;
    if (isStepsArrSmall) {
      return array;
    }
    const arrayStep = Math.round(array.length / size);
    const correctedArray = array.filter((item, i) => {
      const isItemEquivalentStep = i % arrayStep === 0;
      const isLastItem = i === (array.length - 1);
      if (isItemEquivalentStep || isLastItem) {
        return item;
      } return false;
    });
    return correctedArray;
  }

  static correctLastItems(array: IParameters[], width: number): IParameters[] {
    const correctedArray = [...array];
    const lastItemPosition = Number(array[array.length - 1].position);
    const prevLastItemPosition = Number(array[array.length - 2].position);
    const isSmallPlaceInEnd = Math.abs(prevLastItemPosition - lastItemPosition) < width;
    if (isSmallPlaceInEnd) {
      correctedArray.splice((array.length - 2), 1);
    }
    return correctedArray;
  }

  private init() {
    this.$scale.addClass('meta-slider__scale');
    this.$scale.appendTo(this.$slider);
  }

  private takeWidth(): number {
    const widthArr: number[] = [];
    const size = this.vertical ? 'height' : 'width';
    this.stepsArr.forEach((item) => {
      const $scaleItem = jQuery('<div>', { text: item.value }).appendTo(this.$scale);
      $scaleItem.css(size, 'min-content');
      const itemWidth = this.vertical ? $scaleItem.height() : $scaleItem.width();
      widthArr.push(itemWidth || 0);
      $scaleItem.remove();
    });
    return Math.max.apply(null, widthArr) + 10;
  }

  private takeScaleSize(): number {
    const scaleSize = this.vertical ? this.$scale.height() : this.$scale.width();
    if (scaleSize !== undefined) {
      return Number(scaleSize);
    }
    throw new Error('wrong scale size');
  }

  private addValues(): void {
    const scaleArr = this.correctScaleArr();
    scaleArr.forEach((item) => {
      const position = item.position - this.itemWidth / 2;
      this.addItem(item, position);
    });
  }

  private correctScaleArr(): IParameters[] {
    const maxStepsCount = Math.floor(this.scaleSize / this.itemWidth);
    const scaleArr: IParameters[] = Scale.reduceArray(this.stepsArr, maxStepsCount);
    const correctedScaleArr = Scale.correctLastItems(scaleArr, this.itemWidth);
    return correctedScaleArr;
  }

  private addItem(item: IParameters, position: number): void {
    const scaleItem = jQuery('<div>', {
      class: 'meta-slider__scale-item js-meta-slider__scale-item',
      style: this.vertical ? `top: ${position}px; line-height: ${this.itemWidth}px` : `left: ${position}px`,
    });
    const $line = jQuery('<div>', { class: 'meta-slider__line', text: this.vertical ? '\u2014' : '|' });
    $line.appendTo(scaleItem);
    const $value = jQuery('<div>', {
      class: 'meta-slider__value js-meta-slider__value',
      'data-value': item.value,
      text: item.value,
      style: this.vertical ? `height: ${this.itemWidth}px` : `width: ${this.itemWidth}px`,
    });
    $value.appendTo(scaleItem);
    scaleItem.appendTo(this.$scale);
  }

  private bindEventListeners(): void {
    $(this.$scale).on('click touchstart', this.handleScaleClick.bind(this));
  }

  private handleScaleClick(event: Event): void {
    const { observer } = this;
    if ((<HTMLInputElement>event.target).dataset.value) {
      const currentValue = Number((<HTMLInputElement>event.target).dataset.value);
      observer.notify('scaleClick', currentValue);
    }
  }
}

export default Scale;

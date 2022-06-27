import {
  IConfig,
  IPositions,
  ITrackPosition,
} from '../../../interfaces/interfaces';
import Observer from '../../../observer/Observer';
import IObserver from '../../../observer/interface';
import IScale from './interface';

class Scale implements IScale {
  public observer: IObserver;

  private $slider: JQuery<HTMLElement>;

  private config: IConfig;

  private $scale: JQuery<HTMLElement>;

  private positions: IPositions[];

  private itemWidth: number;

  private scaleSize: number | null;

  constructor($slider: JQuery<HTMLElement>, config: IConfig) {
    this.$slider = $slider;
    this.config = config;
    this.observer = new Observer();
    this.$scale = jQuery('<div>');
    this.positions = [];
    this.itemWidth = 20;
    this.scaleSize = null;
    this.init();
  }

  public setConfig(config: IConfig): void {
    this.config = config;
  }

  public initPositions(trackParameters: ITrackPosition): void {
    this.scaleSize = trackParameters.trackWidth;
    const { min, max, step } = this.config;
    const range = max - min;
    const stepArray = step.toString().split('.');
    const fractionalLength = stepArray.length === 2 ? 10 ** stepArray[1].length : 1;
    const stepLength = (this.scaleSize / range) * step;
    const arrStep = stepLength < 1 ? Math.floor(1 / stepLength) : 1;
    const stepsCount = Math.floor(range / step / arrStep);
    const emptyArr = Array(stepsCount + 1);
    const multiplyStep = step * 10 * arrStep;
    const positionLength = stepLength * arrStep;
    let positions: IPositions[] = [];
    const valuesArr = Array.from(
      emptyArr,
      (_, i) => min
        + Math.round(multiplyStep * i * fractionalLength)
          / (10 * fractionalLength),
    );
    positions = valuesArr.map((el, i) => {
      const value: number = Math.round(el * fractionalLength) / fractionalLength;
      const position = Math.round(positionLength * i);
      return { value, position };
    });
    if (valuesArr[valuesArr.length - 1] !== max) {
      positions.push({ value: max, position: this.scaleSize });
    }
    this.positions = positions;
    this.initScale();
  }

  public getPositions(): IPositions[] {
    return this.positions;
  }

  static reduceArray(array: IPositions[], size: number): IPositions[] {
    const ispositionsSmall = array.length < size;
    if (ispositionsSmall) {
      return array;
    }
    const arrayStep = Math.round(array.length / size);
    const correctedArray = array.filter((item, i) => {
      const isItemEquivalentStep = i % arrayStep === 0;
      const isLastItem = i === array.length - 1;
      if (isItemEquivalentStep || isLastItem) {
        return item;
      }
      return false;
    });
    return correctedArray;
  }

  static correctLastItems(array: IPositions[], width: number): IPositions[] {
    const correctedArray = [...array];
    const lastItemPosition = Number(array[array.length - 1].position);
    const prevLastItemPosition = Number(array[array.length - 2].position);
    const isSmallPlaceInEnd = Math.abs(prevLastItemPosition - lastItemPosition) < width;
    if (isSmallPlaceInEnd) {
      correctedArray.splice(array.length - 2, 1);
    }
    return correctedArray;
  }

  private init(): void {
    this.$scale.addClass('meta-slider__scale js-meta-slider__scale');
    this.$scale.appendTo(this.$slider);
    this.bindEventListeners();
  }

  private initScale(): void {
    this.$scale.empty();
    this.itemWidth = this.takeWidth();
    this.addValues();
  }

  private takeWidth(): number {
    const widthArr: number[] = [];
    const size = this.config.isVertical ? 'height' : 'width';
    this.positions.forEach((item) => {
      const $scaleItem = jQuery('<div>', { text: item.value }).appendTo(
        this.$scale,
      );
      $scaleItem.css(size, 'min-content');
      const itemWidth = this.config.isVertical
        ? $scaleItem.height()
        : $scaleItem.width();
      widthArr.push(itemWidth || 0);
      $scaleItem.remove();
    });
    return Math.max.apply(null, widthArr) + 10;
  }

  private addValues(): void {
    const scaleArr = this.correctScaleArr();
    const $scaleRow = jQuery('<div>', {
      class: 'meta-slider__scale-row js-meta-slider__scale-row',
    });
    scaleArr.forEach((item) => {
      const position = item.position - this.itemWidth / 2;
      const $scaleItem = this.createItem(item, position);
      $scaleRow.append($scaleItem);
    });
    this.$scale.append($scaleRow);
  }

  private correctScaleArr(): IPositions[] {
    if (this.scaleSize) {
      const maxStepsCount = Math.floor(this.scaleSize / this.itemWidth);
      const scaleArr: IPositions[] = Scale.reduceArray(
        this.positions,
        maxStepsCount,
      );
      const correctedScaleArr = Scale.correctLastItems(
        scaleArr,
        this.itemWidth,
      );
      return correctedScaleArr;
    }
    throw new Error('wrong size of scale');
  }

  private createItem(item: IPositions, position: number): JQuery<HTMLElement> {
    const $scaleItem = jQuery('<div>', {
      class: 'meta-slider__scale-item js-meta-slider__scale-item',
      style: this.config.isVertical
        ? `top: ${position}px; line-height: ${this.itemWidth}px`
        : `left: ${position}px`,
    });
    const $line = jQuery('<div>', {
      class: 'meta-slider__line',
      text: this.config.isVertical ? '\u2014' : '|',
    });
    $line.appendTo($scaleItem);
    const $value = jQuery('<div>', {
      class: 'meta-slider__value js-meta-slider__value',
      'data-value': item.value,
      text: item.value,
      style: this.config.isVertical
        ? `height: ${this.itemWidth}px`
        : `width: ${this.itemWidth}px`,
    });
    $value.appendTo($scaleItem);
    return $scaleItem;
  }

  private bindEventListeners(): void {
    $(this.$scale).on('click touchstart', this.handleScaleClick.bind(this));
  }

  private handleScaleClick(event: Event): void {
    const { observer } = this;
    if ((<HTMLInputElement>event.target).dataset.value) {
      const currentValue = Number(
        (<HTMLInputElement>event.target).dataset.value,
      );
      observer.notify('scaleClick', currentValue);
    }
  }
}

export default Scale;

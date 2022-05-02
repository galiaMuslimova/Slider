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

  private vertical: boolean;

  constructor(slider: JQuery<HTMLElement>) {
    this.$slider = slider;
    this.vertical = false;
    this.observer = new Observer();
    this.$scale = jQuery('<div>');
    this.stepsArr = [];
    this.itemWidth = 20;
  }

  public init(stepsArr: IParameters[], vertical: boolean): void {
    this.$scale.addClass('meta-slider__scale');
    this.$scale.appendTo(this.$slider);
    this.vertical = vertical;
    this.stepsArr = stepsArr;
    this.$scale.empty();
    this.itemWidth = this.takeWidth();
    this.addValues();
    this.bindEventListeners();
  }

  private takeWidth(): number {
    const widthArr: number[] = [];
    const randomItemsArr = [...this.stepsArr.slice(0, 3), ...this.stepsArr.slice(-3)];
    randomItemsArr.forEach((item) => {
      const scaleItem = jQuery('<div>', { text: item.value }).appendTo(this.$scale);
      scaleItem.css(this.vertical ? 'height' : 'width', 'min-content');
      const itemWidth = this.vertical ? $(scaleItem).height() : $(scaleItem).width();
      if (itemWidth !== undefined) {
        widthArr.push(itemWidth);
      } else {
        throw new Error('wrong width of item');
      }
      scaleItem.remove();
    });
    const maxWidth = Math.max.apply(null, widthArr);
    return this.vertical ? maxWidth : maxWidth + 10;
  }

  private addValues(): void {
    const scaleArr = this.correctScaleArr();
    const lastItemPosition = Number(scaleArr[scaleArr.length - 1].position);
    const prevLastItemPosition = Number(scaleArr[scaleArr.length - 2].position);
    const isSmallPlaceInEnd = Math.abs(prevLastItemPosition - lastItemPosition) < this.itemWidth;
    if (isSmallPlaceInEnd) {
      scaleArr.splice((scaleArr.length - 2), 1);
    }
    scaleArr.forEach((item) => {
      this.addItem(item);
    });
  }

  private correctScaleArr(): IParameters[] {
    const maxStepsCount = this.takeMaxStepsCount();
    const scaleStep = Math.round(this.stepsArr.length / maxStepsCount);
    const isStepsArrSmall = this.stepsArr.length < maxStepsCount;
    const scaleArr: IParameters[] = this.stepsArr.filter((item, i) => {
      const isItemEquivalentStep = i % scaleStep === 0;
      const isLastItem = i === (this.stepsArr.length - 1);
      const shouldItemBeInScale = isItemEquivalentStep || isLastItem;
      if (shouldItemBeInScale || isStepsArrSmall) {
        return item;
      } return false;
    });
    return scaleArr;
  }

  private takeMaxStepsCount(): number {
    const scaleWidth = this.vertical ? this.$scale.height() : this.$scale.width();
    if (scaleWidth !== undefined) {
      const stepsCount = scaleWidth / this.itemWidth;
      return Math.floor(stepsCount);
    }
    throw new Error('wrong scale width');
  }

  private addItem(item: IParameters): JQuery<HTMLElement> {
    const position = item.position - this.itemWidth / 2;
    const scaleItem = jQuery('<div>', {
      class: 'meta-slider__scale-item',
      style: this.vertical ? `top: ${position}px` : `left: ${position}px`,
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
    return scaleItem;
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

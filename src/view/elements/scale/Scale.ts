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
    this.$scale = jQuery('<div>', { class: 'meta-slider__scale' }).appendTo(this.$slider);
    this.stepsArr = [];
    this.itemWidth = 20;
  }

  public init(stepsArr: IParameters[], vertical: boolean): void {
    this.vertical = vertical;
    this.$scale.css('width', `${this.vertical ? '40px' : '100%'}`);
    this.$scale.css('height', `${this.vertical ? '100%' : '40px'}`);
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
    return Math.max.apply(null, widthArr);
  }

  private addValues(): void {
    const scaleArr = this.correctScaleArr();
    const lastItemPosition = Number(scaleArr.at(-1)?.position);
    const prevLastItemPosition = Number(scaleArr.at(-2)?.position);
    if (Math.abs(prevLastItemPosition - lastItemPosition) < this.itemWidth) {
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
      const isLineInStep = (i % scaleStep === 0) || (i === (this.stepsArr.length - 1));
      if (isLineInStep || isStepsArrSmall) {
        return item;
      } return false;
    });
    return scaleArr;
  }

  private takeMaxStepsCount(): number {
    const scaleWidth = this.vertical ? this.$scale.height() : this.$scale.width();
    if (scaleWidth !== undefined) {
      const stepsCount = scaleWidth / (this.itemWidth + 4);
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
    jQuery('<div>', {
      class: 'meta-slider__line',
      text: this.vertical ? '\u2014' : '|',
    }).appendTo(scaleItem);
    jQuery('<div>', {
      class: 'meta-slider__value js-meta-slider__value',
      'data-value': item.value,
      text: item.value,
      style: this.vertical ? `height: ${this.itemWidth}px` : `width: ${this.itemWidth}px`,
    }).appendTo(scaleItem);
    scaleItem.appendTo(this.$scale);
    return scaleItem;
  }

  private bindEventListeners(): void {
    $(this.$scale).on('click touchstart', this.sendScaleClickValue.bind(this));
  }

  private sendScaleClickValue(event: Event): void {
    const { observer } = this;
    if ((<HTMLInputElement>event.target).dataset.value) {
      const currentValue = Number((<HTMLInputElement>event.target).dataset.value);
      observer.notify('click', currentValue);
    }
  }
}

export default Scale;

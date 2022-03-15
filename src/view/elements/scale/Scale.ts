import { IStepsArr } from '../../../interfaces/interfaces';
import Observer from '../../../observer/Observer';
import IObserver from '../../../observer/interface';
import IScale from './interface';

class Scale implements IScale {
  public observer: IObserver;

  readonly $slider: JQuery<HTMLElement>;

  readonly $scale: JQuery<HTMLElement>;

  private stepsArr: IStepsArr[];

  private itemWidth: number;

  private vertical: boolean;

  constructor(slider: JQuery<HTMLElement>, vertical: boolean) {
    this.$slider = slider;
    this.vertical = vertical;
    this.observer = new Observer();
    this.$scale = jQuery('<div>', {
      class: 'meta-slider__scale',
    }).appendTo(this.$slider);
    this.stepsArr = [];
    this.itemWidth = 0;
    this.bindEventListeners();
  }

  public setVertical(vertical: boolean): void {
    this.vertical = vertical;
  }

  public initScale(stepsArr: IStepsArr[], vertical:boolean = false): void {
    this.vertical = vertical;
    this.stepsArr = stepsArr;
    this.$scale.empty();
    this.itemWidth = this.takeWidth();
    this.addValues();
  }

  private takeWidth(): number {
    const widthArr: number[] = [];
    const randomItemsArr = [...this.stepsArr.slice(0, 3), ...this.stepsArr.slice(-3)];
    randomItemsArr.forEach((item) => {
      const scaleItem = jQuery('<div>', {
        text: item.value,
      }).appendTo(this.$scale);
      scaleItem.css(this.vertical ? 'height' : 'width', 'min-content');
      const itemWidth = this.vertical ? $(scaleItem).height() : $(scaleItem).width();
      if (itemWidth) {
        widthArr.push(itemWidth);
        scaleItem.remove();
      } else {
        throw new Error('wrong width of item');
      }
    });
    return Math.max.apply(null, widthArr);
  }

  private addValues(): void {
    const scaleArr = this.correctScaleArr();
    const lastItemPosition = scaleArr[scaleArr.length - 1].x;
    const prevLastItemPosition = scaleArr[scaleArr.length - 2].x;
    if (Math.abs(prevLastItemPosition - lastItemPosition) < this.itemWidth) {
      scaleArr.splice((scaleArr.length - 2), 1);
    }
    scaleArr.forEach((item) => {
      this.addItem(item);
    });
  }

  private correctScaleArr(): IStepsArr[] {
    const scaleArr: IStepsArr[] = [];
    const maxStepsCount = this.takeMaxStepsCount();
    const scaleStep = Math.round(this.stepsArr.length / maxStepsCount);
    this.stepsArr.forEach((item, i) => {
      const isLineInStep = (i % scaleStep === 0) || (i === (this.stepsArr.length - 1));
      const isStepsArrSmall = this.stepsArr.length < maxStepsCount;
      if (isLineInStep || isStepsArrSmall) {
        scaleArr.push(item);
      }
    });
    return scaleArr;
  }

  private takeMaxStepsCount(): number {
    const scaleWidth = this.vertical ? this.$scale.height() : this.$scale.width();
    if (scaleWidth) {
      const stepsCount = scaleWidth / (this.itemWidth + 4);
      return Math.floor(stepsCount);
    }
    throw new Error('wrong scale width');
  }

  private addItem(item: IStepsArr): JQuery<HTMLElement> {
    const position = item.x - this.itemWidth / 2;
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
    $(this.$slider).on('click touchstart', this.sendScaleClickValue.bind(this));
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

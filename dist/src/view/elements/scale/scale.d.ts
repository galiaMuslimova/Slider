/// <reference types="jquery" />
import { IParameters } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';
import IScale from './interface';
declare class Scale implements IScale {
    observer: IObserver;
    $slider: JQuery<HTMLElement>;
    $scale: JQuery<HTMLElement>;
    private stepsArr;
    private itemWidth;
    private scaleSize;
    private vertical;
    constructor(slider: JQuery<HTMLElement>);
    correctScale(stepsArr: IParameters[], vertical: boolean): void;
    static reduceArray(array: IParameters[], size: number): IParameters[];
    static correctLastItems(array: IParameters[], width: number): IParameters[];
    private init;
    private takeWidth;
    private takeScaleSize;
    private addValues;
    private correctScaleArr;
    private addItem;
    private bindEventListeners;
    private handleScaleClick;
}
export default Scale;

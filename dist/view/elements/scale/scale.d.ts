/// <reference types="jquery" />
import { IStepsArr, IScaleArr } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';
import IScale from './interface';
declare class Scale implements IScale {
    observer: IObserver;
    readonly $slider: JQuery<HTMLElement>;
    readonly $scale: JQuery<HTMLElement>;
    private vertical;
    constructor(slider: JQuery<HTMLElement>, vertical: boolean);
    initScale(stepsArr: IStepsArr[], vertical?: boolean): void;
    setVertical(vertical: boolean): void;
    static takeValues(stepsArr: IStepsArr[]): IScaleArr[];
    private bindEventListeners;
    private sendScaleClickValue;
    private addValues;
}
export default Scale;

/// <reference types="jquery" />
import { IParameters } from '../../../interfaces/interfaces';
import IInterval from './interface';
declare class Interval implements IInterval {
    $interval: JQuery<HTMLElement>;
    readonly $slider: JQuery<HTMLElement>;
    private vertical;
    constructor(slider: JQuery<HTMLElement>);
    correctInterval(): void;
    changeVertical(vertical: boolean): void;
    moveInterval(parameters: IParameters[]): void;
    private init;
}
export default Interval;

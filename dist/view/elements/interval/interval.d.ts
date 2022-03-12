/// <reference types="jquery" />
import IInterval from './interface';
declare class Interval implements IInterval {
    readonly $slider: JQuery<HTMLElement>;
    readonly $interval: JQuery<HTMLElement>;
    readonly $track: JQuery<HTMLElement>;
    constructor(slider: JQuery<HTMLElement>);
    moveInterval(positions: number[], vertical: boolean): void;
}
export default Interval;

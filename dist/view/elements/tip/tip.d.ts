/// <reference types="jquery" />
import ITip from './interface';
declare class Tip implements ITip {
    readonly $slider: JQuery<HTMLElement>;
    readonly $tip: JQuery<HTMLElement>;
    private $tips;
    constructor(slider: JQuery<HTMLElement>);
    initTips(tip?: boolean): void;
    changeTips(values: number[]): void;
}
export default Tip;

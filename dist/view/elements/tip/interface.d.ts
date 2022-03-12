/// <reference types="jquery" />
interface ITip {
    $slider: JQuery<HTMLElement>;
    $tip: JQuery<HTMLElement>;
    initTips(tip: boolean): void;
    changeTips(values: number[]): void;
}
export default ITip;

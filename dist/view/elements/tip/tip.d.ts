declare class Tip {
    $slider: JQuery<HTMLElement>;
    $handles: JQuery<HTMLElement>[];
    $tips: JQuery<HTMLElement>[];
    $tip: JQuery<HTMLElement>;
    constructor(slider: JQuery<HTMLElement>);
    initTips(tip?: boolean): void;
    changeTips(values: number[]): void;
}
export default Tip;

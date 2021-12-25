declare class Scale {
    $slider: JQuery<HTMLElement>;
    $scale: JQuery<HTMLElement>;
    constructor(slider: JQuery<HTMLElement>);
    initScale(stepsArr: {
        value: number;
        x: number;
    }[], vertical?: boolean): void;
}
export default Scale;

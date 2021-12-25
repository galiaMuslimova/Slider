declare class Interval {
    $slider: JQuery<HTMLElement>;
    $interval: JQuery<HTMLElement>;
    $track: JQuery<HTMLElement>;
    constructor(slider: JQuery<HTMLElement>);
    moveInterval(handleX: number[], vertical: boolean): void;
}
export default Interval;

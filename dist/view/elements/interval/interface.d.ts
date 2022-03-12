/// <reference types="jquery" />
interface IInterval {
    $slider: JQuery<HTMLElement>;
    $interval: JQuery<HTMLElement>;
    $track: JQuery<HTMLElement>;
    moveInterval(positions: number[], vertical: boolean): void;
}
export default IInterval;

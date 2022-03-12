/// <reference types="jquery" />
import { ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';
import ITrack from './interface';
declare class Track implements ITrack {
    observer: IObserver;
    readonly $slider: JQuery<HTMLElement>;
    readonly $track: JQuery<HTMLElement>;
    readonly position: {
        top: number;
        left: number;
    };
    private vertical;
    private trackStart;
    constructor(slider: JQuery<HTMLElement>, vertical: boolean);
    getTrackParameters(): ITrackPosition;
    setVertical(vertical: boolean): void;
    private bindEventListeners;
    private handleTrackClick;
}
export default Track;

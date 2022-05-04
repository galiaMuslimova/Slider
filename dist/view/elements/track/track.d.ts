/// <reference types="jquery" />
import { ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';
import ITrack from './interface';
declare class Track implements ITrack {
    observer: IObserver;
    $slider: JQuery<HTMLElement>;
    $track: JQuery<HTMLElement>;
    private vertical;
    private trackStart;
    private trackWidth;
    constructor(slider: JQuery<HTMLElement>);
    correctTrack(vertical: boolean): void;
    getTrackParameters(): ITrackPosition;
    private init;
    private bindEventListeners;
    private handleTrackClick;
}
export default Track;

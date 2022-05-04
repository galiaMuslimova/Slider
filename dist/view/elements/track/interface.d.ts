/// <reference types="jquery" />
import { ITrackPosition } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';
interface ITrack {
    observer: IObserver;
    $slider: JQuery<HTMLElement>;
    $track: JQuery<HTMLElement>;
    correctTrack(vertical: boolean): void;
    getTrackParameters(): ITrackPosition;
}
export default ITrack;

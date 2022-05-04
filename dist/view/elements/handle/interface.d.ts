/// <reference types="jquery" />
import { IParameters } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';
interface IHandle {
    observer: IObserver;
    readonly $slider: JQuery<HTMLElement>;
    correctHandles(vertical: boolean): void;
    correctHandlesByRange(range: boolean): void;
    moveHandles(parameters: IParameters[]): void;
    setVertical(vertical: boolean): void;
    getVertical(): boolean;
    getHandles(): JQuery<HTMLElement>[];
}
export default IHandle;

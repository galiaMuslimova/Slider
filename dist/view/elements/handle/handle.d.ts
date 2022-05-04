/// <reference types="jquery" />
import IObserver from '../../../observer/interface';
import IHandle from './interface';
import { IParameters } from '../../../interfaces/interfaces';
declare class Handle implements IHandle {
    observer: IObserver;
    readonly $slider: JQuery<HTMLElement>;
    private $track;
    private vertical;
    private $leftHandle;
    private $rightHandle;
    private handles;
    constructor(slider: JQuery<HTMLElement>);
    correctHandles(vertical: boolean): void;
    correctHandlesByRange(range: boolean): void;
    moveHandles(parameters: IParameters[]): void;
    setVertical(vertical: boolean): void;
    getVertical(): boolean;
    getHandles(): JQuery<HTMLElement>[];
    static handleDragStart(): boolean;
    private init;
    private bindEventListeners;
    private handleHandleMouseDown;
    private handleMouseMove;
    private handleTouchMove;
    private handleMoveEnd;
}
export default Handle;

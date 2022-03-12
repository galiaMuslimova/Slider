/// <reference types="jquery" />
import IObserver from '../../../observer/interface';
import IHandle from './interface';
declare class Handle implements IHandle {
    observer: IObserver;
    readonly $slider: JQuery<HTMLElement>;
    readonly $track: JQuery<HTMLElement>;
    private vertical;
    private handles;
    constructor(slider: JQuery<HTMLElement>, vertical: boolean);
    correctHandlesByRange(range: boolean): void;
    moveHandles(positions: number[]): void;
    setVertical(vertical: boolean): void;
    static handleDragStart(): boolean;
    private bindEventListeners;
    private handleHandleMouseDown;
    private handleMouseMove;
    private handleTouchMove;
    private handleMoveEnd;
    private initHandles;
}
export default Handle;

/// <reference types="jquery" />
import { IConfig, IParameters, IStepsArr, ISettings, ITrackPosition } from '../interfaces/interfaces';
import Observer from '../observer/Observer';
import IView from './interface';
import './slider.scss';
declare class View implements IView {
    observer: Observer;
    readonly $root: JQuery<HTMLElement>;
    readonly $container: JQuery<HTMLElement>;
    readonly $slider: JQuery<HTMLElement>;
    private vertical;
    private panel;
    private track;
    private scale;
    private handles;
    private interval;
    private tips;
    constructor(root: JQuery<HTMLElement>, vertical: boolean);
    getTrackParameters(): ITrackPosition;
    initScale(stepsArr: IStepsArr[]): void;
    correctHandlesByRange(range: boolean): void;
    initTips(tip: boolean): void;
    changeTips(values: number[]): void;
    changeDirection(vertical: boolean): void;
    setParameters(parameters: IParameters): void;
    setSettings(setting: ISettings): void;
    initPanel(config: IConfig): void;
    private changePositionByTrack;
    private scaleClick;
    private changeSettings;
    private mouseMove;
    private mouseMoveEnd;
}
export default View;

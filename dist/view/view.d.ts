import './slider.scss';
import Settings from './settings/settings';
import Observer from '../observer';
import { IConfig, IParameters, IPositions, ISettings } from '../interfaces';
import Track from './elements/track/track';
import Scale from './elements/scale/scale';
import Handle from './elements/handle/handle';
import Interval from './elements/interval/interval';
import Tip from './elements/tip/tip';
declare class View {
    vertical: boolean;
    observer: Observer;
    $root: JQuery<HTMLElement>;
    $container: JQuery<HTMLElement>;
    $slider: JQuery<HTMLElement>;
    settings: Settings;
    track: Track;
    scale: Scale;
    handles: Handle;
    interval: Interval;
    tips: Tip;
    constructor(root: JQuery<HTMLElement>, vertical: boolean);
    getTrackParameters(): {
        trackStart: number;
        trackWidth: number;
    };
    initScale(stepsArr: IPositions[]): void;
    initHandles(range: boolean): void;
    initTips(tip: boolean): void;
    changeTips(values: number[]): void;
    setParameters(parameters: IParameters): void;
    initSettings(config: IConfig): void;
    handleMove(): void;
    static sendMouseMoveOptions(e: {
        pageX: number;
        pageY: number;
        data: {
            index: number;
            observer: Observer;
        };
    }): void;
    static sendTouchMoveOptions(e: {
        data: {
            index: number;
            observer: Observer;
        };
        originalEvent: any;
    }): void;
    scaleClick(): void;
    static sendScaleClickValue(e: {
        currentTarget: HTMLElement;
        data: {
            observer: Observer;
        };
    }): void;
    changeSettings(settings: ISettings): void;
}
export default View;

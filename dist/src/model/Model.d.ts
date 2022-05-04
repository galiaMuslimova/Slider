import { IOptions, IConfig, IParameters, IEventPosition, ISettings } from '../interfaces/interfaces';
import IModel from './interface';
declare class Model implements IModel {
    readonly options: IOptions;
    private config;
    private stepsArr;
    private parameters;
    private trackStart;
    private trackWidth;
    constructor(options: IOptions);
    correctMinMax(config?: IConfig): IConfig;
    initStepsArr(): IParameters[];
    correctFromTo(config?: IConfig): IConfig;
    initParameters(): IParameters[];
    takeParamHandleMove(options: IEventPosition): IParameters[] | boolean;
    correctFromToByParams(): {
        from: number;
        to: number;
    };
    takeParamScaleClick(value: number): IParameters[];
    takeParamTrackClick(position: number): IParameters[];
    getConfig(): IConfig;
    setConfig(config: IConfig): void;
    setSetting(setting: ISettings): void;
    getParameters(): IParameters[];
    setVertical(vertical: boolean): void;
    setTrackParameters(trackStart: number, trackWidth: number | undefined): void;
    getStepsArr(): IParameters[];
    static takeClosestNum(num: number, array: number[]): number;
    static takeClosestIndex(num: number, array: number[]): number;
    private correctOptionsType;
    private takeXByValue;
    private takeValueByX;
}
export default Model;

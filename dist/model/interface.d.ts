import { IParameters, IStepsArr, IEventPosition, IOptions, IConfig } from '../interfaces/interfaces';
interface IModel {
    readonly options: IOptions;
    correctMinMax(config?: IConfig): IConfig;
    initStepsArr(): IStepsArr[];
    correctFromTo(config?: IConfig): IConfig;
    initParameters(): IParameters;
    takeParamHandleMove(options: IEventPosition): IParameters | boolean;
    correctFromToByParams(): void;
    takeParamScaleClick(value: number): IParameters;
    takeParamTrackClick(position: number): IParameters;
    getConfig(): IConfig;
    setConfig(config: IConfig): void;
    getParameters(): IParameters;
    setTrackStart(trackStart: number): void;
    settrackWidth(trackWidth: number | undefined): void;
    getStepsArr(): IStepsArr[];
}
export default IModel;

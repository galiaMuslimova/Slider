import { IConfig, IOptions, IParameters, IPositions } from '../interfaces';
declare class Model {
    config: IConfig;
    positionsArr: IPositions[];
    parameters: IParameters;
    trackStart: number;
    trackWidth: number;
    range: number;
    constructor(options: IOptions, trackStart?: number, trackWidth?: number);
    correctConfig(config?: IConfig): {
        min: number;
        max: number;
        step: number;
        from: number;
        to: number;
        vertical: boolean;
        tip: boolean;
        range: boolean;
    };
    initStepsArr(): IPositions[];
    initPositionsArr(): IPositions[];
    initParameters(): IParameters;
    takeXByValue(val: number): number;
    takeParamHandleMove(options: {
        eventPosition: {
            pageX: number;
            pageY: number;
        };
        index: number;
    }): false | IParameters;
    takeParamScaleClick(value: number): IParameters;
}
export default Model;

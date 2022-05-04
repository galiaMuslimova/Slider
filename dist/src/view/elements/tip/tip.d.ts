/// <reference types="jquery" />
import { IParameters } from '../../../interfaces/interfaces';
import ITip from './interface';
declare class Tip implements ITip {
    readonly $slider: JQuery<HTMLElement>;
    readonly $tip: JQuery<HTMLElement>;
    private $tips;
    constructor(slider: JQuery<HTMLElement>);
    correctTips(tip?: boolean): void;
    changeTips(parameters: IParameters[]): void;
    private init;
}
export default Tip;

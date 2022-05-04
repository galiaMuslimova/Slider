/// <reference types="jquery" />
import { IParameters } from '../../../interfaces/interfaces';
interface ITip {
    $slider: JQuery<HTMLElement>;
    $tip: JQuery<HTMLElement>;
    correctTips(tip: boolean): void;
    changeTips(parameters: IParameters[]): void;
}
export default ITip;

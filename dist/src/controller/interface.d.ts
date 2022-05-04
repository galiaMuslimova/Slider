/// <reference types="jquery" />
import { IOptions } from '../interfaces/interfaces';
import IModel from '../model/interface';
import IView from '../view/interface';
interface IController {
    readonly options: IOptions;
    readonly $root: JQuery<HTMLElement>;
    view: IView;
    model: IModel;
    $slider: JQuery<HTMLElement>;
    correctSlider(): void;
    addPanel(): void;
}
export default IController;

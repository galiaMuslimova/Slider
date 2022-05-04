/// <reference types="jquery" />
import { IOptions } from '../interfaces/interfaces';
import IView from '../view/interface';
import IModel from '../model/interface';
import IController from './interface';
declare class Controller implements IController {
    readonly options: IOptions;
    readonly $root: JQuery<HTMLElement>;
    view: IView;
    model: IModel;
    $slider: JQuery<HTMLElement>;
    private config;
    private vertical;
    constructor(root: JQuery<HTMLElement>, options: IOptions);
    correctSlider(): void;
    addPanel(): void;
    private init;
    private initSlider;
    private moveHandle;
    private moveEnd;
    private clickOnScale;
    private changeSettings;
    private changePositionByTrack;
}
export default Controller;

/// <reference types="jquery" />
import { IOptions } from '../interfaces/interfaces';
import IController from './interface';
declare class Controller implements IController {
    readonly options: IOptions;
    readonly $root: JQuery<HTMLElement>;
    private vertical;
    private model;
    private view;
    constructor(root: JQuery<HTMLElement>, options: IOptions);
    private init;
    private initElements;
    private moveHandle;
    private moveEnd;
    private clickOnScale;
    private changeSettings;
    private changePositionByTrack;
}
export default Controller;

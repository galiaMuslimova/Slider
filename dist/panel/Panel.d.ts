/// <reference types="jquery" />
import { IConfig, ISettings } from '../interfaces/interfaces';
import IObserver from '../observer/interface';
import Input from './input/Input';
import IPanel from './interface';
import './panel.scss';
declare class Panel implements IPanel {
    inputs: Map<string, Input>;
    observer: IObserver;
    readonly $root: JQuery<HTMLElement>;
    readonly $panel: JQuery<HTMLElement>;
    readonly $form: JQuery<HTMLElement>;
    private from;
    private to;
    private range;
    private max;
    private min;
    private step;
    constructor(root: JQuery<HTMLElement>);
    initPanel(config: IConfig): void;
    initValues(values: number[]): void;
    setValue(setting: ISettings): void;
    static handlePanelFormSubmit(): boolean;
    private initInputs;
    private takeInputFromArr;
    private bindEventListeners;
    private changeSettings;
    private changeBounds;
}
export default Panel;

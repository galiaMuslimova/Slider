/// <reference types="jquery" />
import { IConfig, IParameters, ISettings } from '../interfaces/interfaces';
import IObserver from '../observer/interface';
import Input from './input/Input';
import IPanel from './interface';
import './panel.scss';
declare class Panel implements IPanel {
    inputs: Map<string, Input>;
    observer: IObserver;
    readonly $root: JQuery<HTMLElement>;
    private $panel;
    private $form;
    constructor(root: JQuery<HTMLElement>);
    initPanel(config: IConfig): void;
    initBounds(config: IConfig): void;
    initValues(parameters: IParameters[]): void;
    setValue(setting: ISettings): void;
    takeInputFromArr(name: string): Input;
    static handlePanelFormSubmit(): boolean;
    private init;
    private bindEventListeners;
    private changeSettings;
    private changeBounds;
}
export default Panel;

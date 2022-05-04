/// <reference types="jquery" />
import { ISettings, IConfig, IParameters } from '../interfaces/interfaces';
import IInput from './input/interface';
import IObserver from '../observer/interface';
interface IPanel {
    inputs: Map<string, IInput>;
    observer: IObserver;
    readonly $root: JQuery<HTMLElement>;
    initPanel(config: IConfig): void;
    initBounds(config: IConfig): void;
    initValues(parameters: IParameters[]): void;
    setValue(setting: ISettings): void;
    takeInputFromArr(name: string): IInput;
}
export default IPanel;

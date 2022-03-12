/// <reference types="jquery" />
import IObserver from '../../observer/interface';
import IInput from './interface';
import './input.scss';
declare class Input implements IInput {
    observer: IObserver;
    readonly element: JQuery<HTMLElement>;
    private name;
    private type;
    private value;
    constructor(element: JQuery<HTMLElement>);
    getName(): string;
    getValue(): number | boolean;
    setValue(value: number | boolean): void;
    setProp(name: string, value: number | boolean): void;
    private bindEventListeners;
    private handleInputValueChange;
}
export default Input;

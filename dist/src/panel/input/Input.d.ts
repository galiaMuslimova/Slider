/// <reference types="jquery" />
import IObserver from '../../observer/interface';
import IInput from './interface';
import './input.scss';
declare class Input implements IInput {
    observer: IObserver;
    $input: JQuery<HTMLElement>;
    readonly $form: JQuery<HTMLElement>;
    private name;
    private type;
    private value;
    constructor(form: JQuery<HTMLElement>, key: string, value: number | boolean);
    getName(): string;
    getValue(): number | boolean;
    setValue(value: number | boolean): void;
    setProp(name: string, value: number | boolean): void;
    private createInput;
    private bindEventListeners;
    private handleInputValueChange;
}
export default Input;

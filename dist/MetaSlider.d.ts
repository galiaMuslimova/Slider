/// <reference types="jquery" />
import Controller from './controller/Controller';
import { IOptions } from './interfaces/interfaces';
declare class MetaSlider {
    readonly controller: Controller;
    constructor(element: JQuery<HTMLElement>, options: IOptions);
    addPanel(): void;
}
export default MetaSlider;

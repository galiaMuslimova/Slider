import './plugin.scss';
import Controller from './controller/controller';
import { IConfig } from './interfaces';
declare global {
    interface JQuery {
        slider(options: IConfig): void;
    }
}
declare class MetaSlider {
    controller: Controller;
    constructor(element: JQuery<HTMLElement>, options: IConfig);
}
export default MetaSlider;

import View from '../view/view';
import Model from '../model/model';
import { IConfig, ISettings } from '../interfaces';
declare class Controller {
    model: Model;
    view: View;
    options: IConfig;
    $root: JQuery<HTMLElement>;
    vertical: boolean;
    constructor(root: JQuery<HTMLElement>, options: IConfig);
    init(): void;
    moveHandle(options: {
        eventPosition: {
            pageX: number;
            pageY: number;
        };
        index: number;
    }): void;
    clickOnScale(value: number): void;
    changeSettings(settings: ISettings): void;
}
export default Controller;

import './settings_styles.scss';
import Observer from '../../observer';
import { IConfig, ISettings } from '../../interfaces';
declare class Settings {
    $root: JQuery<HTMLElement>;
    observer: Observer;
    $settings: JQuery<HTMLElement>;
    $max: JQuery<HTMLElement>;
    $min: JQuery<HTMLElement>;
    $step: JQuery<HTMLElement>;
    $from: JQuery<HTMLElement>;
    $to: JQuery<HTMLElement>;
    $vertical: JQuery<HTMLElement>;
    $range: JQuery<HTMLElement>;
    $tip: JQuery<HTMLElement>;
    constructor(root: JQuery<HTMLElement>);
    initSettings(config: IConfig): void;
    initValues(values: number[]): void;
    changeBounds(set: ISettings): void;
}
export default Settings;

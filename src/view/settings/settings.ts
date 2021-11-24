import "./settings.scss";
import Observer from "../../observer";
import { settingsTemplate } from "./settingsTemplate";
import { IConfig, ISettings } from "../../interfaces";

export default class Settings {
  config: IConfig;
  slider: JQuery<HTMLElement>;
  observer: Observer;
  settings: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>, config: IConfig) {
    this.slider = slider;
    this.config = config;
    this.observer = new Observer();
    this.settings = $(this.slider).closest('.container').find(".settings");
    this.init();
  }

  init() {
    let observer = this.observer;
    let container: JQuery<HTMLElement> | null = $(this.slider).closest('.container');
    container.append(settingsTemplate);
    
    let settingsArr: string[] = ['min', 'max', 'step', 'from', 'to'];

    for (const [key, value] of Object.entries(this.config)) {
      if (key in settingsArr) {
        $(this.settings).find(`input[name='${key}']`).val(value);
        $(this.settings).find(`input[name='${key}']`).on('change', function () {
          let setting: ISettings = { key: value };
          observer.notify('settings', setting);
        });
      }
    }
  }

  initValues(values: number[]) {
    (this.settings).find(`input[name='from']`).val(values[0]);
    (this.settings).find(`input[name='to']`).val(values[1]);
  }
}
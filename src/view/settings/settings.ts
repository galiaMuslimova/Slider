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
    let container: JQuery<HTMLElement> = $(this.slider).closest('.container');
    container.append(settingsTemplate);
    this.settings = $(this.slider).closest('.container').find(".settings");
    this.init();
  }

  init() {
    let observer = this.observer;    
    let settingsArr: string[] = ['min', 'max', 'step', 'from', 'to'];

    for (const [key, value] of Object.entries(this.config)) {  
      if ($.inArray(key, settingsArr)) {
        let input = this.settings.find(`input[name='${key}']`)
        input.val(value);
        input.on('change', function () {
          let setting: ISettings = {};
          setting[key] =  Number(input.val())
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
import "./settings.scss";
import Observer from "../../observer";
import { settingsTemplate } from "./settingsTemplate";
import { IConfig, ISettings } from "../../interfaces";

export default class Settings {
  config: IConfig;
  root: JQuery<HTMLElement>;
  observer: Observer;
  settings: JQuery<HTMLElement>;

  constructor(root: JQuery<HTMLElement>, config: IConfig) {
    this.root = root;
    this.config = config;
    this.observer = new Observer();
    root.append(settingsTemplate);
    this.settings = $(this.root).find(".settings");
    this.init();
  }

  init() {
    let observer = this.observer;    
    let numberInputs: string[] = ['min', 'max', 'step', 'from', 'to'];
    let radioInputs: string[] = ['orientation']

    for (const [key, value] of Object.entries(this.config)) {  
      if ($.inArray(key, numberInputs)) {
        let input = this.settings.find(`input[name='${key}']`)
        input.val(value);
        input.on('change', function () {
          let setting: ISettings = {};
          setting[key] =  Number(input.val())
          observer.notify('settings', setting);
        });
      } else if ($.inArray(key, radioInputs)){
        let input = this.settings.find(`input[name='${key}']`)
      } else {
        throw new Error('not such setting')
      }
    }
  }

  initValues(values: number[]) {
    (this.settings).find(`input[name='from']`).val(values[0]);
    (this.settings).find(`input[name='to']`).val(values[1]);
  }
}
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
    let numberInputs: string[] = ['start', 'end', 'step', 'from', 'to'];
    let radioInputs: string[] = ['vertical', 'tip', 'range'];

    if (!this.config.range) {
      this.settings.find(`input[name='to']`).prop('disabled', true)
    }

    for (const [key, value] of Object.entries(this.config)) {
      let setting: ISettings = {};
      if ($.inArray(key, numberInputs) >= 0) {
        let input = this.settings.find(`input[name='${key}']`)
        input.val(value);
        input.on('change', function () {
          setting[key] = Number(input.val())
          observer.notify('settings', setting);
        });
      }  else if ($.inArray(key, radioInputs) >= 0) {
        let input = this.settings.find(`input[name='${key}']`)
        input.prop('checked', value);
        input.on('change', function () {
          setting[key] = input.prop('checked')
          observer.notify('settings', setting);
        });
      }
    }
  }

  initValues(values: number[]) {
    if(values.length == 1) {
      this.settings.find(`input[name='to']`).prop('disabled', true);
      (this.settings).find(`input[name='from']`).val(values[0]);
    } else {
      this.settings.find(`input[name='to']`).prop('disabled', false);
      (this.settings).find(`input[name='to']`).val(values[1]);
    }    
  }
}
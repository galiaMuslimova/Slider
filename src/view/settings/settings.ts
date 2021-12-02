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
    this.changeBounds()
  }

  init() {
    if (!this.config.range) {
      this.settings.find(`input[name='to']`).prop('disabled', true)
    }

    /*if (key == 'step' && this.config.start && this.config.end) {
      let range = this.config.end - this.config.start
      if (value > range) {
        this.config.step = Math.round(range / 10)
      }
    }*/

    for (const [key, value] of Object.entries(this.config)) {
      this.initSetting(key, value)
    }
  }

  initSetting(key: string, value: number | boolean) {
    let element = this;
    let observer = this.observer;
    let setting: ISettings = {};
    let input = this.settings.find(`input[name='${key}']`);
    (typeof value == 'number') ? input.val(value) : input.prop('checked', value);
    input.on('change', function () {
      
      let checkedValue = element.checkSetting(key, value)
      if (checkedValue) { value = checkedValue }
      setting[key] = (typeof value == 'number') ? Number(input.val()) : input.prop('checked')
      observer.notify('settings', setting);
    });
  }

  checkSetting(key: string, value: number | boolean) {
    if (this.config.start != undefined && this.config.end != undefined && this.config.step) {      
      let end = this.config.end;
      let start = this.config.start;
      let range = end - start;
      let step = this.config.step
      if (key == 'start' && value > end) {
        return start
      }
      if (key == 'end' && value < start) {
        return end
      }
      if (key == 'step' && step > range) {
        
        return Math.round(range/10)
      }
    }
  }

  initValues(values: number[]) {
    (this.settings).find(`input[name='from']`).val(values[0]);
    if (values.length == 1) {
      this.settings.find(`input[name='to']`).prop('disabled', true);
    } else {
      this.settings.find(`input[name='to']`).prop('disabled', false).val(values[1]);
    }
  }

  changeBounds(config = this.config) {
    this.settings.find(`input[name='from']`).prop('min', config.start).prop('max', config.end);
    this.settings.find(`input[name='to']`).prop('min', config.start).prop('max', config.end);
  }
}
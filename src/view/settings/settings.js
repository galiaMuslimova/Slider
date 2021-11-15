import "./settings.scss";
import Observer from "@/observer.js";
import { settingsTemplate } from "@/view/settings/settingsTemplate.js";

export default class Settings {
  constructor(slider, config) {
    this.slider = slider;
    this.config = config;
    this.observer = new Observer();
    this.settings;
    this.init();
  }

  init() {
    let observer = this.observer;
    let container = $(this.slider).closest('.container')[0];    
    container.insertAdjacentHTML("beforeEnd", settingsTemplate);

    this.settings = $(this.slider).closest('.container').find(".settings");
    $(this.settings).find("input[name='min']").val(this.config.min);
    $(this.settings).find("input[name='max']").val(this.config.max);
    
    $(this.settings).find("input[name='min']").on('change', function () {
      observer.notify('settings', { key: 'min', value: this.value });
    })
    $(this.settings).find("input[name='max']").on('change', function () {
      observer.notify('settings', { key: 'max', value: this.value });
    })
  }
}
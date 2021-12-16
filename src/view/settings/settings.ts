import './settings_styles.scss';
import Observer from '../../observer';
import { settingsTemplate } from './settingsTemplate';
import { IConfig, ISettings } from '../../interfaces';

export default class Settings {
  root: JQuery<HTMLElement>;

  observer: Observer;

  settings: JQuery<HTMLElement>;

  constructor(root: JQuery<HTMLElement>) {
    this.root = root;
    this.observer = new Observer();
    root.append(settingsTemplate);
    this.settings = $(this.root).find('.meta-slider__settings');
  }

  initSettings(config: IConfig) {
    const element = this;
    const { observer } = this;
    Object.entries(config).forEach(([key, value]) => {
      const input = this.settings.find(`input[name='${key}']`);
      const setting: ISettings = {};
      setting[key] = value;

      switch (key) {
        case 'min':
        case 'max':
        case 'step':
        case 'from':
        case 'to':
          input.val(value);
          input.on('change', () => {
            setting[key] = Number(input.val());
            observer.notify('settings', setting);
          });
          break;
        case 'vertical':
        case 'tip':
        case 'range':
          input.prop('checked', value);
          input.on('change', () => {
            setting[key] = input.prop('checked');
            observer.notify('settings', setting);
          });
          break;
        default:
          throw new Error('undefined setting');
      }

      switch (key) {
        case 'min':
        case 'max':
        case 'from':
        case 'to':
        case 'range':
          element.changeBounds(setting);
          input.on('change', () => {
            element.changeBounds(setting);
          });
          break;
        case 'step':
          input.prop('min', 0);
          break;
        default:
          throw new Error('undefined setting');
      }
    });
  }

  initValues(values: number[]) {
    switch (values.length) {
      case 1: {
        const max = this.settings.find('input[name=\'max\']').val();
        this.settings.find('input[name=\'from\']').val(values[0]).prop('max', max);
        break;
      }
      case 2: {
        this.settings.find('input[name=\'from\']').val(values[0]).prop('max', values[1]);
        this.settings.find('input[name=\'to\']').val(values[1]).prop('min', values[0]);
        break;
      }
      default: {
        throw new Error('undefined values');
      }
    }
  }

  changeBounds(set: ISettings) {
    const key = Object.keys(set)[0];
    const value = Object.values(set)[0];
    let maxMinRange;

    switch (key) {
      case 'min':
        this.settings.find('input[name=\'max\']').prop('min', value);
        this.settings.find('input[name=\'from\']').prop('min', value);
        maxMinRange = Number(this.settings.find('input[name=\'max\']').val()) - (value as number);
        this.settings.find('input[name=\'step\']').prop('max', maxMinRange);
        break;
      case 'max':
        this.settings.find('input[name=\'min\']').prop('max', value);
        this.settings.find('input[name=\'to\']').prop('max', value);
        maxMinRange = (value as number) - Number(this.settings.find('input[name=\'min\']').val());
        this.settings.find('input[name=\'step\']').prop('max', maxMinRange);
        break;
      case 'from':
        this.settings.find('input[name=\'to\']').prop('min', value);
        break;
      case 'to':
        this.settings.find('input[name=\'from\']').prop('max', value);
        break;
      case 'range': {
        const max = value ? this.settings.find('input[name=\'to\']').val() : this.settings.find('input[name=\'max\']').val();
        this.settings.find('input[name=\'to\']').prop('disabled', !value);
        this.settings.find('input[name=\'from\']').prop('max', max);
        break;
      }
      default:
        throw new Error('undefined setting');
    }
  }
}

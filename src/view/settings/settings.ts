import './settings_styles.scss';
import Observer from '../../observer';
import settingsTemplate from './settingsTemplate';
import { IConfig, ISettings } from '../../interfaces';

export default class Settings {
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

  constructor(root: JQuery<HTMLElement>) {
    this.$root = root;
    this.observer = new Observer();
    root.append(settingsTemplate);
    this.$settings = $(this.$root).find('.meta-slider__settings');
    this.$max = this.$settings.find('input[name="max"]');
    this.$min = this.$settings.find('input[name="min"]');
    this.$step = this.$settings.find('input[name="step"]');
    this.$from = this.$settings.find('input[name="from"]');
    this.$to = this.$settings.find('input[name="to"]');
    this.$vertical = this.$settings.find('input[name="vertical"]');
    this.$range = this.$settings.find('input[name="range"]');
    this.$tip = this.$settings.find('input[name="tip"]');
  }

  initSettings(config: IConfig) {
    const element = this;
    const { observer } = this;
    Object.entries(config).forEach(([key, value]) => {
      const $input = this.$settings.find(`input[name='${key}']`);
      const setting: ISettings = {};
      setting[key] = value;

      switch (key) {
        case 'min':
        case 'max':
        case 'step':
        case 'from':
        case 'to':
          $input.val(value);
          $input.on('change', () => {
            setting[key] = Number($input.val());
            observer.notify('settings', setting);
          });
          break;
        case 'vertical':
        case 'tip':
        case 'range':
          $input.prop('checked', value);
          $input.on('change', () => {
            setting[key] = $input.prop('checked');
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
          $input.on('change', () => {
            element.changeBounds(setting);
          });
          break;
        case 'step':
          $input.prop('min', 0);
          break;
        default:
          break;
      }
    });
  }

  initValues(values: number[]) {
    switch (values.length) {
      case 1: {
        const max = this.$max.val();
        this.$from.val(values[0]);
        this.$from.prop('max', max);
        break;
      }
      case 2: {
        this.$from.val(values[0]);
        this.$to.val(values[1]);
        this.$from.prop('max', values[1]);
        this.$to.prop('min', values[0]);
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
        this.$max.prop('min', value);
        this.$from.prop('min', value);
        maxMinRange = Number(this.$max.val()) - (value as number);
        this.$step.prop('max', maxMinRange);
        break;
      case 'max':
        this.$min.prop('max', value);
        this.$to.prop('max', value);
        maxMinRange = (value as number) - Number(this.$min.val());
        this.$step.prop('max', maxMinRange);
        break;
      case 'from':
        this.$to.prop('min', value);
        break;
      case 'to':
        this.$from.prop('max', value);
        break;
      case 'range': {
        const max = value ? this.$to.val() : this.$max.val();
        this.$to.prop('disabled', !value);
        this.$from.prop('max', max);
        break;
      }
      default:
        throw new Error('undefined setting');
    }
  }
}

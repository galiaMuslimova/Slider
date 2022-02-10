import { IConfig, ISettings } from '../interfaces';
import Observer from '../observer';
import './panel-styles.scss';

class Panel {
  $root: JQuery<HTMLElement>;

  observer: Observer;

  $panel: JQuery<HTMLElement>;

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
    this.$panel = $(this.$root).find('.js-panel');
    this.$max = this.$panel.find('input[name="max"]');
    this.$min = this.$panel.find('input[name="min"]');
    this.$step = this.$panel.find('input[name="step"]');
    this.$from = this.$panel.find('input[name="from"]');
    this.$to = this.$panel.find('input[name="to"]');
    this.$vertical = this.$panel.find('input[name="vertical"]');
    this.$range = this.$panel.find('input[name="range"]');
    this.$tip = this.$panel.find('input[name="tip"]');
  }

  initPanel(config: IConfig) {
    const element = this;
    const { observer } = this;
    Object.entries(config).forEach(([key, value]) => {
      const $input = this.$panel.find(`input[name='${key}']`);
      switch (key) {
        case 'min':
        case 'max':
        case 'step':
        case 'from':
        case 'to':
        { const setting: { [index: string]: number } = {};
          setting[key] = value;
          element.setValue(setting);
          $input.on('change', () => {
            setting[key] = Number($input.val());
            observer.notify('settings', setting);
          });
          break; }
        case 'vertical':
        case 'tip':
        case 'range':
          { const setting: { [index: string]: boolean } = {};
            setting[key] = value;
            $input.on('change', () => {
              setting[key] = $input.prop('checked');
              observer.notify('settings', setting);
            }); }
          break;
        default:
          throw new Error('undefined setting');
      }

      switch (key) {
        case 'min':
        case 'max':
        case 'step':
        case 'from':
        case 'to':
        case 'range':
          { const setting: ISettings = {};
            setting[key] = value;
            element.changeBounds(setting);
            $input.on('change', () => {
              element.changeBounds(setting);
            }); }
          break;
        default:
          break;
      }
    });
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
      case 'step':
        this.$from.prop('step', value);
        this.$to.prop('step', value);
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

  setValue(set: ISettings) {
    const key = Object.keys(set)[0];
    const value = Number(Object.values(set)[0]);
    const $input = this.$panel.find(`input[name='${key}']`);
    $input.val(value);
  }

  setProp(set: ISettings) {
    const key = Object.keys(set)[0];
    const value = Object.values(set)[0];
    const $input = this.$panel.find(`input[name='${key}']`);
    $input.prop('checked', value);
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
}

export default Panel;

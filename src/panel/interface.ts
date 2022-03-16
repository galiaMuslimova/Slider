import {
  ISettings, IConfig,
} from '../interfaces/interfaces';
import IInput from './input/interface';
import IObserver from '../observer/interface';

interface IPanel {
  inputs: Map<string, IInput>
  observer: IObserver
  max: IInput
  min: IInput
  step: IInput
  from: IInput
  to: IInput
  range: IInput
  readonly $root: JQuery<HTMLElement>
  readonly $panel: JQuery<HTMLElement>
  readonly $form: JQuery<HTMLElement>

  initPanel(config: IConfig): void
  initValues(values: number[]): void
  setValue(setting: ISettings): void
}

export default IPanel;

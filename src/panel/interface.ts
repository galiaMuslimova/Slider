import {
  ISettings, IConfig, IParameters,
} from '../interfaces/interfaces';
import IInput from './input/interface';
import IObserver from '../observer/interface';

interface IPanel {
  inputs: Map<string, IInput>
  observer: IObserver
  readonly $root: JQuery<HTMLElement>
  readonly $panel: JQuery<HTMLElement>
  readonly $form: JQuery<HTMLElement>

  initPanel(config: IConfig): void
  initBounds(config: IConfig): void
  initValues(parameters: IParameters[]): void
  setValue(setting: ISettings): void
}

export default IPanel;

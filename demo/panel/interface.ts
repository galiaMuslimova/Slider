import { IConfig, IParameters, ISettings } from '../interfaces/interfaces';
import IObserver from '../observer/interface';
import Input from '../input/Input';

interface IPanel {
  inputs: Map<string, Input>;
  observer: IObserver;
  readonly $root: JQuery<HTMLElement>;

  initBounds(config: IConfig): void
  initValues(parameters: IParameters[]): void
  setValue(setting: ISettings): void
  takeInputFromArr(name: string): Input
}

export default IPanel;
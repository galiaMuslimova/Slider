import { ISettings } from '../interfaces/interfaces';
import IObserver from '../observer/interface';
import Input from '../input/Input';

interface IPanel {
  inputs: Map<string, Input>;
  observer: IObserver;
  readonly $root: JQuery<HTMLElement>;

  setValue(setting: ISettings): void
}

export default IPanel;
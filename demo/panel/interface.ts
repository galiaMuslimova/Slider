import { IOptions } from '../../src/interfaces/interfaces';
import IObserver from '../../src/observer/interface';

interface IPanel {
  inputs: {};
  observer: IObserver;
  readonly $root: JQuery<HTMLElement>;

  setValue(options: IOptions): void;
}

export default IPanel;

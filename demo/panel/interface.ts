import { IOptions } from "../../src/interfaces/interfaces";
import IObserver from "../../src/observer/interface";
import Input from '../input/Input';

interface IPanel {
  inputs: {};
  observer: IObserver;
  readonly $root: JQuery<HTMLElement>;

  setValue(options: IOptions): void;
}

export default IPanel;
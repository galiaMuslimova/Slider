import { IParameters } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface IScale {
  observer: IObserver;
  $slider: JQuery<HTMLElement>;
  $scale: JQuery<HTMLElement>;

  init(stepsArr: IParameters[], vertical:boolean): void
}

export default IScale;

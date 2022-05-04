import { IParameters } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface IScale {
  observer: IObserver;
  $slider: JQuery<HTMLElement>;
  $scale: JQuery<HTMLElement>;

  correctScale(stepsArr: IParameters[], vertical:boolean): void
}

export default IScale;

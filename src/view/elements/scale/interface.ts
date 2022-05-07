import { IParameters } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface IScale {
  observer: IObserver;
  $scale: JQuery<HTMLElement>;

  init($slider: JQuery<HTMLElement>): void
  setVertical(vertical: boolean): void
  correctScale(stepsArr: IParameters[]): void
}

export default IScale;

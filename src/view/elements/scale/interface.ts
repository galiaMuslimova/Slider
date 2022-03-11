import { IStepsArr, IScaleArr } from '../../../interfaces/interfaces';
import IObserver from '../../../observer/interface';

interface IScale {
  observer: IObserver;
  $slider: JQuery<HTMLElement>;
  $scale: JQuery<HTMLElement>;

  initScale(stepsArr: IStepsArr[], vertical:boolean): void
  setVertical(vertical: boolean): void
}

export default IScale;

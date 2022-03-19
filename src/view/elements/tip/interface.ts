import { IParameters } from '../../../interfaces/interfaces';

interface ITip{
  $slider: JQuery<HTMLElement>;
  $tip: JQuery<HTMLElement>;

  init(tip: boolean): void
  changeTips(parameters: IParameters[]): void
}

export default ITip;

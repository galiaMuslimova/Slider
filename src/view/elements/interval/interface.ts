import { IParameters } from '../../../interfaces/interfaces';

interface IInterval {
  $slider: JQuery<HTMLElement>;
  $interval: JQuery<HTMLElement>;
  $track: JQuery<HTMLElement>;

  init(vertical: boolean): void
  moveInterval(parameters: IParameters[]): void
}

export default IInterval;

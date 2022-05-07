import { IParameters } from '../../../interfaces/interfaces';

interface IInterval {
  $interval: JQuery<HTMLElement>;

  init($track: JQuery<HTMLElement>): void
  setVertical(vertical: boolean): void
  moveInterval(parameters: IParameters[]): void
}

export default IInterval;

import { IParameters } from '../../../interfaces/interfaces';

interface IInterval {
  init($track: JQuery<HTMLElement>): void;
  setVertical(vertical: boolean): void;
  setRange(range: boolean): void;
  moveInterval(parameters: IParameters[]): void;
}

export default IInterval;

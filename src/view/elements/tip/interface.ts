import { IPositions } from '../../../interfaces/interfaces';

interface ITip {
  init($handle: JQuery<HTMLElement>): void
  changeTip(parameter: IPositions): void
  getElement(): JQuery<HTMLElement>
}

export default ITip;

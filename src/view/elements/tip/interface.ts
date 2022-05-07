import { IParameters } from '../../../interfaces/interfaces';

interface ITip {
  init($handle: JQuery<HTMLElement>): void
  changeTip(parameter: IParameters): void
  getElement(): JQuery<HTMLElement>
}

export default ITip;

import IPresenter from './Presenter/interface';
import { IOptions } from './interfaces/interfaces';

interface IMetaSlider {
  presenter: IPresenter;

  setOptions(options: IOptions): void
  getOptions(): IOptions
}

export default IMetaSlider;

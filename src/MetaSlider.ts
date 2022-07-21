import Presenter from './presenter/Presenter';
import { IOptions } from './interfaces/interfaces';
import IMetaSlider from './interface';

class MetaSlider implements IMetaSlider {
  readonly presenter: Presenter;

  constructor(element: JQuery<HTMLElement>, options: IOptions) {
    this.presenter = new Presenter(element, options);
  }

  public setOptions(options: IOptions): void {
    this.presenter.setOptions(options);
  }

  public getOptions(): IOptions {
    return this.presenter.getOptions();
  }
}

export default MetaSlider;

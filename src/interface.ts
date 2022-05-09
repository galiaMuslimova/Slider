import IController from './controller/interface';

interface IMetaSlider {
  controller: IController;

  addPanel(): void
}

export default IMetaSlider;

interface IConfig {
  min: number,
  max: number,
  step: number,
  from: number,
  to: number,
  vertical: boolean,
  tip: boolean,
  range: boolean,
}

/* type any has to be here,
cause customer should be able to write any type of options without problems */
interface IOptions {
  min?: number,
  max?: number,
  step?: number,
  from?: number,
  to?: number,
  vertical?: boolean,
  tip?: boolean,
  range?: boolean,
  onChange?: (values: number[]) => number[]
}

interface ISettings {
  [index: string]: number | boolean;
}

interface IParameters {
  value: number,
  position: number
}

interface ICoordinates {
  key?: number,
  value?: number,
  position?: number
}

interface IEventPosition {
  eventPosition: number,
  index: number
}

interface ITrackPosition {
  trackStart: number,
  trackWidth: number
}

interface IData {
  config: IConfig,
  trackParameters: ITrackPosition;
  parameters: IParameters[],
  stepsArr: IParameters[],
}

export {
  IOptions,
  IConfig,
  ISettings,
  IParameters,
  IEventPosition,
  ITrackPosition,
  IData,
  ICoordinates,
};

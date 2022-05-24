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
  key: string,
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

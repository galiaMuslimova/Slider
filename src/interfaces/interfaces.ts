interface IConfig {
  min: number,
  max: number,
  step: number,
  from: number,
  to: number,
  vertical: boolean,
  tip: boolean,
  range: boolean
}

interface IOptions {
  min?: any,
  max?: any,
  step?: any,
  from?: any,
  to?: any,
  vertical?: any,
  tip?: any,
  range?: any,
}

interface ISettings {
  [index: string]: number | boolean;
}

interface IParameters {
  values: number[],
  positions: number[],
}

interface IStepsArr {
  value: number,
  x: number
}

interface IResult {
  stepsArr: IStepsArr[],
  parameters: IParameters
}

interface IEventPosition {
  eventPosition: number,
  index: number
}

interface ITrackPosition {
  trackStart: number,
  trackWidth: number | undefined
}

export {
  IOptions,
  IConfig,
  ISettings,
  IParameters,
  IStepsArr,
  IResult,
  IEventPosition,
  ITrackPosition,
};

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
  min?: any,
  max?: any,
  step?: any,
  from?: any,
  to?: any,
  vertical?: any,
  tip?: any,
  range?: any,
  onChange?: () => {}
}

interface ISettings {
  [index: string]: number | boolean;
}

interface IParameters {
  value: number,
  position: number
}

interface ICoordinates {
  [index: string]: {
    value?: number,
    position?: number,
  };
}

interface IChanges {
  value?: number,
  position?: number
}

interface IResult {
  stepsArr: IParameters[],
  parameters: IParameters[]
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
  IResult,
  IEventPosition,
  ITrackPosition,
  IData,
  ICoordinates,
  IChanges,
};

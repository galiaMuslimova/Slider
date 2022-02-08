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
  handleWidth?: any
}

interface ISettings {
  [index: string]: number | boolean;
}

interface IParameters {
  values: number[],
  handleX: number[],
}

interface IPositions {
  value: number,
  x: number
}

interface IResult {
  stepsArr: IPositions[],
  parameters: IParameters
}

export {
  IOptions,
  IConfig,
  ISettings,
  IParameters,
  IPositions,
  IResult,
};

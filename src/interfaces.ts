interface IConfig {
  min?: number,
  max?: number,
  step?: number,
  from?: number,
  to?: number ,
  vertical: boolean,
  tip: boolean,
  range: boolean,
  handleWidth?: number
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

export {
  IConfig,
  ISettings,
  IParameters,
  IPositions
}
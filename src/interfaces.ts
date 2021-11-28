interface IConfig {
  min?: number,
  max?: number,
  step?: number,
  from?: number | null,
  to?: number | null,
  handleCount?: number | null,
  orientation?: 'vertical' | 'horizontal'
}

interface ISettings {
  [index: string]: number;
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
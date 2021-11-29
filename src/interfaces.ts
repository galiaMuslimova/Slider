interface IConfig {
  start?: number,
  end?: number,
  step?: number,
  from?: number | null,
  to?: number | null,
  handleCount?: number | null,
  orientation?: 'vertical' | 'horizontal'
  isVertical?: boolean
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
interface IConfig {
  min?: number,
  max?: number,
  step?: number,
  from?: number | null,
  to?: number | null,
  handleCount?: number | null,
  vertical?: boolean
}

interface ISettings {
  [index: string]: number;
}

interface IParameters {
  values: number[],
  handleX: number[],
}

export {
  IConfig,
  ISettings,
  IParameters
}
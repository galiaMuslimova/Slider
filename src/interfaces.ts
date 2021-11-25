interface IConfig {
  min?: number,
  max?: number,
  step?: number,
  from?: number | null,
  to?: number | null,
  handleCount?: number | null,
  vertical?: boolean
}

type configKeys = keyof IConfig;

interface ISettings {
  [index: string]: number;
}

export {
  IConfig,
  ISettings,
  configKeys
}
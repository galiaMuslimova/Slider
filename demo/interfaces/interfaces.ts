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
  min?: number | boolean | string | null,
  max?: number | boolean | string | null,
  step?: number | boolean | string | null,
  from?: number | boolean | string | null,
  to?: number | boolean | string | null,
  vertical?: number | boolean | string | null,
  tip?: number | boolean | string | null,
  range?: number | boolean | string | null,
  onChange?: (values: number[]) => number[]
}

interface ISettings {
  [index: string]: number | boolean;
}

export {
  IOptions,
  IConfig,
  ISettings,
};

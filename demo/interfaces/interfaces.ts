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

/* type any has to be here,
cause customer should be able to write any type of options without problems */
interface IOptions {
  min?: any,
  max?: any,
  step?: any,
  from?: any,
  to?: any,
  vertical?: any,
  tip?: any,
  range?: any,
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

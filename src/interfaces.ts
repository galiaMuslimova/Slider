interface IConfig {
  min?: number,
  max?: number,
  (step?: string): number | null,
  (from?: string): number | null,
  (to?: string): number | null,
  (handleCount?:string): number | null,
  (vertical?: string): boolean
}

type Set = keyof IConfig;

interface ISettings {
  key: Set,
  value: number
}

export {
  IConfig,
  ISettings,
}
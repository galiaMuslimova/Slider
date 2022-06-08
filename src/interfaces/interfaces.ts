interface IConfig {
  min: number;
  max: number;
  step: number;
  from: number;
  to: number;
  vertical: boolean;
  tip: boolean;
  range: boolean;
}

interface IOptions {
  min?: number;
  max?: number;
  step?: number;
  from?: number;
  to?: number;
  vertical?: boolean;
  tip?: boolean;
  range?: boolean;
  onChange?: (config: IConfig) => void;
}

interface IPositions {
  value: number;
  position: number;
}

interface IParameters {
  from: IPositions;
  to?: IPositions;
}

interface ICoordinates {
  key?: number;
  value?: number;
  position?: number;
}

interface IEventPosition {
  eventPosition: number;
  index: number;
}

interface ITrackPosition {
  trackStart: number;
  trackWidth: number;
}

export {
  IOptions,
  IConfig,
  IPositions,
  IParameters,
  IEventPosition,
  ITrackPosition,
  ICoordinates,
};

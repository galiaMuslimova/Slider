interface IDefaults {
  min: number;
  max: number;
  step: number;
  from: number;
  to: number;
  isVertical: boolean;
  hasTip: boolean;
  withRange: boolean;
}

interface IConfig extends IDefaults {
  fromPosition: number;
  toPosition: number;
}

interface IOptions {
  min?: number;
  max?: number;
  step?: number;
  from?: number;
  to?: number;
  isVertical?: boolean;
  hasTip?: boolean;
  withRange?: boolean;
  onChange?: (options: IOptions) => void;
}

interface IPositions {
  value: number;
  position: number;
}

interface ICoordinates {
  key?: 'from' | 'to';
  value?: number;
  position?: number;
}

interface ITrackPosition {
  trackStart: number;
  trackWidth: number;
}

export {
  IDefaults,
  IOptions,
  IConfig,
  IPositions,
  ITrackPosition,
  ICoordinates,
};

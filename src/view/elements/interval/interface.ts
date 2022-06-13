interface IInterval {
  setVertical(vertical: boolean): void;
  setRange(withRange: boolean): void;
  moveInterval(fromPosition: number, toPosition: number): void;
}

export default IInterval;

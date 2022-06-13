interface ITip {
  init($handle: JQuery<HTMLElement>): void
  changeTip(item: number): void
  getElement(): JQuery<HTMLElement>
}

export default ITip;

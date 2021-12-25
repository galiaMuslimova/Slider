declare class Handle {
    $slider: JQuery<HTMLElement>;
    handles: JQuery<HTMLElement>[];
    constructor(slider: JQuery<HTMLElement>);
    initHandles(range?: boolean): void;
    moveHandles(handleX: number[], vertical: boolean): void;
}
export default Handle;

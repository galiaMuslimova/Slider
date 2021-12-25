declare class Track {
    $slider: JQuery<HTMLElement>;
    $track: JQuery<HTMLElement>;
    position: {
        top: number;
        left: number;
    };
    constructor(slider: JQuery<HTMLElement>);
    getTrackParameters(vertical: boolean): {
        trackStart: number;
        trackWidth: number;
    };
}
export default Track;

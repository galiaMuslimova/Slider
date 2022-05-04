import Controller from './controller/Controller';
class MetaSlider {
    constructor(element, options) {
        this.controller = new Controller(element, options);
        this.controller.correctSlider();
    }
    addPanel() {
        this.controller.addPanel();
    }
}
export default MetaSlider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YVNsaWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXRhU2xpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBR2pELE1BQU0sVUFBVTtJQUdkLFlBQVksT0FBNEIsRUFBRSxPQUFpQjtRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7QUFFRCxlQUFlLFVBQVUsQ0FBQyJ9
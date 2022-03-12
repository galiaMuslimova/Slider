import Observer from '../../../observer/Observer';
class Handle {
    constructor(slider, vertical) {
        this.$slider = slider;
        this.$track = this.$slider.find('.meta-slider__track');
        this.vertical = vertical;
        this.observer = new Observer();
        this.handles = this.initHandles();
        this.bindEventListeners();
    }
    correctHandlesByRange(range) {
        if (range && this.handles.length === 1) {
            const $handle2 = jQuery('<div>', {
                class: 'meta-slider__handle meta-slider__handle_right',
            }).appendTo(this.$track);
            this.handles.push($handle2);
        }
        else if (!range && this.handles.length === 2) {
            const $handle2 = this.handles[1];
            $handle2.remove();
            this.handles.pop();
        }
        this.bindEventListeners();
    }
    moveHandles(positions) {
        this.handles.forEach((item, index) => {
            item.css(this.vertical ? 'top' : 'left', `${positions[index] - 20 / 2}px`);
            item.css(this.vertical ? 'left' : 'top', '-5px');
        });
    }
    setVertical(vertical) {
        this.vertical = vertical;
    }
    static handleDragStart() {
        return false;
    }
    bindEventListeners() {
        this.handles.forEach((item) => {
            item.on('mousedown touchstart', this.handleHandleMouseDown.bind(this));
        });
    }
    handleHandleMouseDown(event) {
        event.preventDefault();
        const eventTarget = event.target;
        $(document).on('mousemove', this.handleMouseMove.bind(this, eventTarget));
        $(document).on('touchmove', this.handleTouchMove.bind(this, eventTarget));
        $(document).on('mouseup touchend', this.handleMoveEnd.bind(this));
        $(document).on('dragstart', Handle.handleDragStart);
    }
    handleMouseMove(eventTarget, event) {
        const index = $(eventTarget).hasClass('meta-slider__handle_right') ? 1 : 0;
        const eventPosition = this.vertical ? event.pageY : event.pageX;
        const options = { eventPosition, index };
        this.observer.notify('mousemove', options);
    }
    handleTouchMove(eventTarget, event) {
        var _a;
        const index = $(eventTarget).hasClass('meta-slider__handle_right') ? 1 : 0;
        const touches = (_a = event) === null || _a === void 0 ? void 0 : _a.touches;
        if (touches !== undefined) {
            const touch = touches[0];
            const eventPosition = this.vertical ? touch.pageY : touch.pageX;
            const options = { eventPosition, index };
            this.observer.notify('mousemove', options);
        }
    }
    handleMoveEnd(event) {
        this.observer.notify('moveend', event);
        $(document).off('mousemove mouseup touchmove touchend');
    }
    initHandles() {
        const handles = [];
        const $handle1 = jQuery('<div>', {
            class: 'meta-slider__handle meta-slider__handle_left',
        }).appendTo(this.$track);
        handles.push($handle1);
        const $handle2 = jQuery('<div>', {
            class: 'meta-slider__handle meta-slider__handle_right',
        }).appendTo(this.$track);
        handles.push($handle2);
        return handles;
    }
}
export default Handle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3ZpZXcvZWxlbWVudHMvaGFuZGxlL2hhbmRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSw0QkFBNEIsQ0FBQztBQUlsRCxNQUFNLE1BQU07SUFXVixZQUFZLE1BQTJCLEVBQUUsUUFBaUI7UUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0scUJBQXFCLENBQUMsS0FBYztRQUN6QyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDL0IsS0FBSyxFQUFFLCtDQUErQzthQUN2RCxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3QjthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzlDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFD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
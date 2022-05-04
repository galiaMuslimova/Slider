class Tip {
    constructor(slider) {
        this.$slider = slider;
        this.$tips = [];
        this.$tip = jQuery('<div>');
        this.init();
    }
    correctTips(tip = true) {
        const element = this;
        this.$slider.find('.js-meta-slider__tip').remove();
        this.$tips = [];
        if (tip) {
            const $handles = this.$slider.find('.js-meta-slider__handle');
            $handles.each(function () {
                const $tipClone = element.$tip.clone();
                $tipClone.appendTo($(this));
                element.$tips.push($tipClone);
            });
        }
    }
    changeTips(parameters) {
        this.$tips.forEach((item, index) => {
            item.html(`${parameters[index].value}`);
        });
    }
    init() {
        this.$tip.addClass('meta-slider__tip js-meta-slider__tip');
    }
}
export default Tip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3ZpZXcvZWxlbWVudHMvdGlwL3RpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLEdBQUc7SUFPUCxZQUFZLE1BQTJCO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFTSxXQUFXLENBQUMsTUFBZSxJQUFJO1FBQ3BDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksR0FBRyxFQUFFO1lBQ1AsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUM5RCxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNaLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3ZDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU0sVUFBVSxDQUFDLFVBQXlCO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxJQUFJO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0Y7QUFFRCxlQUFlLEdBQUcsQ0FBQyJ9
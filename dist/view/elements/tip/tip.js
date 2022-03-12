class Tip {
    constructor(slider) {
        this.$slider = slider;
        this.$tips = [];
        this.$tip = jQuery('<div>', {
            class: 'meta-slider__tip',
        });
    }
    initTips(tip = true) {
        const element = this;
        this.$slider.find('.meta-slider__tip').remove();
        this.$tips = [];
        if (tip) {
            const $handles = this.$slider.find('.meta-slider__handle');
            $handles.each(function () {
                const $tipClone = element.$tip.clone();
                $tipClone.appendTo($(this));
                element.$tips.push($tipClone);
            });
        }
    }
    changeTips(values) {
        this.$tips.forEach((item, index) => {
            item.html(`${values[index]}`);
        });
    }
}
export default Tip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3ZpZXcvZWxlbWVudHMvdGlwL3RpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLEdBQUc7SUFPUCxZQUFZLE1BQTJCO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUMxQixLQUFLLEVBQUUsa0JBQWtCO1NBQzFCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxRQUFRLENBQUMsTUFBZSxJQUFJO1FBQ2pDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksR0FBRyxFQUFFO1lBQ1AsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUMzRCxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNaLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3ZDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU0sVUFBVSxDQUFDLE1BQWdCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBRUQsZUFBZSxHQUFHLENBQUMifQ==
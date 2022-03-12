import Observer from '../../observer/Observer';
import './input.scss';
class Input {
    constructor(element) {
        this.element = element;
        this.observer = new Observer();
        this.name = this.element.prop('name');
        this.type = this.element.prop('type');
        this.value = (this.type === 'number') ? this.element.val() : this.element.prop('checked');
        this.bindEventListeners();
    }
    getName() {
        return this.name;
    }
    getValue() {
        const { value } = this;
        if (typeof value === 'number') {
            Number(value);
        }
        return value;
    }
    setValue(value) {
        this.value = value;
        if (typeof value === 'number') {
            this.element.val(value);
        }
        else {
            this.element.prop('checked', value);
        }
    }
    setProp(name, value) {
        this.element.prop(name, value);
    }
    bindEventListeners() {
        $(this.element).on('change keyup', this.handleInputValueChange.bind(this));
    }
    handleInputValueChange(event) {
        switch (this.type) {
            case 'number':
                this.value = Number(event.target.value);
                break;
            case 'checkbox':
                this.value = event.target.checked;
                break;
            default:
                break;
        }
        const setting = {};
        setting[this.name] = this.value;
        this.observer.notify('setting', setting);
    }
}
export default Input;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFuZWwvaW5wdXQvSW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxRQUFRLE1BQU0seUJBQXlCLENBQUM7QUFHL0MsT0FBTyxjQUFjLENBQUM7QUFFdEIsTUFBTSxLQUFLO0lBV1QsWUFBWSxPQUE0QjtRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU0sUUFBUTtRQUNiLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTSxRQUFRLENBQUMsS0FBdUI7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFTSxPQUFPLENBQUMsSUFBWSxFQUFFLEtBQXVCO1FBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVPLHNCQUFzQixDQUFDLEtBQVk7UUFDekMsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2pCLEtBQUssUUFBUTtnQkFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBb0IsS0FBSyxDQUFDLE1BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUQsTUFBTTtZQUNSLEtBQUssVUFBVTtnQkFDYixJQUFJLENBQUMsS0FBSyxHQUFzQixLQUFLLENBQUMsTUFBTyxDQUFDLE9BQU8sQ0FBQztnQkFDdEQsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtRQUNELE1BQU0sT0FBTyxHQUFjLEVBQUUsQ0FBQztRQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRjtBQUVELGVBQWUsS0FBSyxDQUFDIn0=
import Observer from '../../observer/Observer';
import './input.scss';
class Input {
    constructor(form, key, value) {
        this.$form = form;
        this.value = value;
        this.name = key;
        this.type = (typeof value === 'number') ? 'number' : 'checkbox';
        this.$input = this.createInput();
        this.observer = new Observer();
        this.setValue(this.value);
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
            this.$input.val(value);
        }
        else {
            this.$input.prop('checked', value);
        }
    }
    setProp(name, value) {
        this.$input.prop(name, value);
    }
    createInput() {
        const $input = jQuery('<div>', { class: 'input js-input' });
        $input.appendTo(this.$form);
        const $label = jQuery('<label>', { class: 'input__label' });
        $label.appendTo($input);
        const $text = jQuery('<p>', { class: 'input__text', text: this.name });
        $text.appendTo($label);
        const $field = jQuery('<input>', {
            class: `input__field js-input__field input__field_with-${this.type}`,
            type: this.type,
            name: this.name,
        });
        $field.appendTo($label);
        if (this.type === 'checkbox') {
            const $box = jQuery('<span>', { class: 'input__box' });
            $box.appendTo($label);
        }
        return $field;
    }
    bindEventListeners() {
        this.$input.on('change keyup', this.handleInputValueChange.bind(this));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcGFuZWwvaW5wdXQvSW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxRQUFRLE1BQU0seUJBQXlCLENBQUM7QUFHL0MsT0FBTyxjQUFjLENBQUM7QUFFdEIsTUFBTSxLQUFLO0lBYVQsWUFBWSxJQUF5QixFQUFFLEdBQVcsRUFBRSxLQUF1QjtRQUN6RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ2hFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU0sUUFBUTtRQUNiLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTSxRQUFRLENBQUMsS0FBdUI7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxP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
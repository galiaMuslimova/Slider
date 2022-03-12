import { expect } from 'chai';
import Panel from './Panel';
const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='testSlider'>
    <div class='body__container js-body__container'>
      <div class='body__slider js-body__slider'></div>
        <div class='panel js-panel'>
          <form class='panel__form js-panel__form'>            
            <input class='input__field js-input__field', type='number', name='max'></input>
            <input class='input__field js-input__field', type='number', name='min'></input>
            <input class='input__field js-input__field', type='number', name='step'></input>
            <input class='input__field js-input__field', type='number', name='from'></input>
            <input class='input__field js-input__field', type='number', name='to'></input>
            <input class='input__field js-input__field', type='checkbox', name='tip'></input>
            <input class='input__field js-input__field', type='checkbox', name='range'></input>
            <input class='input__field js-input__field', type='checkbox', name='vertical'></input>
          </form>
        </div>
      </div>
    </div>
  </div>
</body>`);
global.window = dom.window;
const { document } = dom.window;
describe('Panel', () => {
    let $root;
    let panelClass;
    let config;
    before(() => {
        $root = $(document).find('.js-body__container');
    });
    beforeEach(() => {
        panelClass = new Panel($root);
        config = {
            min: 5,
            max: 15,
            step: 1,
            from: 8,
            to: 10,
            vertical: false,
            tip: true,
            range: true,
        };
        panelClass.initPanel(config);
    });
    it('проверяет установку параметров', () => {
        const minInput = panelClass.inputs.get('min');
        expect(minInput === null || minInput === void 0 ? void 0 : minInput.getValue()).to.equal(5);
    });
    it('проверяет установку значений from, to', () => {
        panelClass.initValues([5, 10]);
        const fromInput = panelClass.inputs.get('from');
        expect(fromInput === null || fromInput === void 0 ? void 0 : fromInput.getValue()).to.equal(5);
        const toInput = panelClass.inputs.get('to');
        expect(toInput === null || toInput === void 0 ? void 0 : toInput.getValue()).to.equal(10);
    });
    it('проверяет установку значений', () => {
        panelClass.setValue({ step: 2 });
        const stepInput = panelClass.inputs.get('step');
        expect(stepInput === null || stepInput === void 0 ? void 0 : stepInput.getValue()).to.equal(2);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYW5lbC9wYW5lbC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQVUsTUFBTSxNQUFNLENBQUM7QUFHdEMsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBRTVCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFbkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBb0JkLENBQUMsQ0FBQztBQUNWLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUMzQixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUVoQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUNyQixJQUFJLEtBQTBCLENBQUM7SUFDL0IsSUFBSSxVQUFpQixDQUFDO0lBQ3RCLElBQUksTUFBZSxDQUFDO0lBRXBCLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDVixLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixNQUFNLEdBQUc7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxFQUFFO1lBQ1AsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsQ0FBQztZQUNQLEVBQUUsRUFBRSxFQUFFO1lBQ04sUUFBUSxFQUFFLEtBQUs7WUFDZixHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQztRQUNGLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHVDQUF1QyxFQUFFLEdBQUcsRUFBRTtRQUMvQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFO1FBQ3RDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=
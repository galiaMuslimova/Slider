import { expect } from 'chai';
import Controller from './Controller';
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
describe('Controller', () => {
    it('устанавливает опции', () => {
        const $slider = $(document).find('.body__slider');
        const options = {
            min: 5,
            max: 10,
        };
        const controller = new Controller($slider, options);
        expect(controller.options).to.deep.equal(options);
    });
    it('устанавливает корневой элемент', () => {
        const $slider = $(document).find('.body__slider');
        const options = {
            min: 5,
            max: 10,
        };
        const controller = new Controller($slider, options);
        expect(controller.$root).to.deep.equal($slider);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvY29udHJvbGxlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFOUIsT0FBTyxVQUFVLE1BQU0sY0FBYyxDQUFDO0FBRXRDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFbkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBb0JkLENBQUMsQ0FBQztBQUNWLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUMzQixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUVoQyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUMxQixFQUFFLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO1FBQzdCLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEQsTUFBTSxPQUFPLEdBQUc7WUFDZCxHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxFQUFFO1NBQ1IsQ0FBQztRQUNGLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRTtRQUN4QyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sT0FBTyxHQUFHO1lBQ2QsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsRUFBRTtTQUNSLENBQUM7UUFDRixNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=
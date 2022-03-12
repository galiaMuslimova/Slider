import { expect } from 'chai';
import View from './View';
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
global.$ = require('jquery');
global.jQuery = require('jquery');
const { document } = dom.window;
describe('View', () => {
    let $slider;
    let $root;
    let config;
    before(() => {
        $slider = $(document).find('.testSlider');
        $root = $(document).find('.body__slider');
        config = {
            max: 50,
            min: 0,
            step: 5,
            from: 5,
            to: 40,
            vertical: false,
            tip: true,
            range: true,
        };
    });
    it('проверяет параметры трэка', () => {
        const view = new View($root, true);
        const trackParameters = view.getTrackParameters();
        expect(trackParameters).to.deep.equal({ trackStart: 0, trackWidth: 0 });
    });
    it('проверяет изменился на горизонтальный', () => {
        const view = new View($root, true);
        view.changeDirection(false);
        expect(view.$container.hasClass('body__container_horizontal')).to.equal(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvdmlldy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHOUIsT0FBTyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBRTFCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFbkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBb0JkLENBQUMsQ0FBQztBQUNWLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUUxQixNQUFjLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNyQyxNQUFjLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUUzQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUVoQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNwQixJQUFJLE9BQTRCLENBQUM7SUFDakMsSUFBSSxLQUEwQixDQUFDO0lBQy9CLElBQUksTUFBZSxDQUFDO0lBRXBCLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDVixPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxQyxNQUFNLEdBQUc7WUFDUCxHQUFHLEVBQUUsRUFBRTtZQUNQLEdBQUcsRUFBRSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsQ0FBQztZQUNQLEVBQUUsRUFBRSxFQUFFO1lBQ04sUUFBUSxFQUFFLEtBQUs7WUFDZixHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtRQUNuQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDbEQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxRSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7UUFDL0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hGLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==
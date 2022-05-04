import { expect } from 'chai';
import Scale from './Scale';
const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='testSlider'>
    <div class='meta-slider js-meta-slider'></div>
  </div>
</body>`);
global.window = dom.window;
const { document } = dom.window;
describe('reduceArray', () => {
    let array;
    before(() => {
        array = [
            { value: 1, position: 10 },
            { value: 2, position: 20 },
            { value: 3, position: 30 },
            { value: 4, position: 40 },
            { value: 5, position: 50 },
            { value: 6, position: 60 },
            { value: 7, position: 70 },
            { value: 8, position: 80 },
            { value: 9, position: 90 },
            { value: 10, position: 100 }
        ];
    });
    it('проверить уменьшение массива', () => {
        const correctedArray = Scale.reduceArray(array, 4);
        expect(correctedArray).to.deep.equal([
            { value: 1, position: 10 },
            { value: 4, position: 40 },
            { value: 7, position: 70 },
            { value: 10, position: 100 }
        ]);
    });
    it('проверить уменьшение массива', () => {
        const correctedArray = Scale.reduceArray(array, 5);
        expect(correctedArray).to.deep.equal([
            { value: 1, position: 10 },
            { value: 3, position: 30 },
            { value: 5, position: 50 },
            { value: 7, position: 70 },
            { value: 9, position: 90 },
            { value: 10, position: 100 }
        ]);
    });
    it('оставить массив без изменений', () => {
        const correctedArray = Scale.reduceArray(array, 12);
        expect(correctedArray).to.deep.equal(array);
    });
});
describe('correctLastItems', () => {
    let array;
    before(() => {
        array = [
            { value: 1, position: 10 },
            { value: 2, position: 20 },
            { value: 3, position: 30 },
            { value: 4, position: 40 },
            { value: 5, position: 45 }
        ];
    });
    it('удалить предпоследнее значение', () => {
        const correctedArray = Scale.correctLastItems(array, 7);
        expect(correctedArray).to.deep.equal([
            { value: 1, position: 10 },
            { value: 2, position: 20 },
            { value: 3, position: 30 },
            { value: 5, position: 45 }
        ]);
    });
    it('не удалять предпоследнее значение', () => {
        const correctedArray = Scale.correctLastItems(array, 4);
        expect(correctedArray).to.deep.equal([
            { value: 1, position: 10 },
            { value: 2, position: 20 },
            { value: 3, position: 30 },
            { value: 4, position: 40 },
            { value: 5, position: 45 }
        ]);
    });
});
describe('create slider', () => {
    let $slider;
    let scaleClass;
    let $scale;
    let stepsArr;
    before(() => {
        $slider = $(document).find('.js-meta-slider');
        scaleClass = new Scale($slider);
        $scale = scaleClass.$scale;
        $scale.css('width', '300px');
        $scale.css('height', '300px');
        stepsArr = [
            { value: 0, position: 0 },
            { value: 2, position: 100 },
            { value: 4, position: 200 },
            { value: 8, position: 300 }
        ];
    });
    it('проверить создание слайдера', () => {
        scaleClass.correctScale(stepsArr, false);
        const scaleItems = $scale.find('.js-meta-slider__scale-item');
        const scaleValues = $scale.find('.js-meta-slider__value');
        scaleValues.each(function (index) {
            expect(Number($(this).text())).to.eq(stepsArr[index].value);
        });
        expect(scaleItems.length).to.eq(4);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92aWV3L2VsZW1lbnRzL3NjYWxlL3NjYWxlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUc5QixPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFFNUIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVuQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQzs7Ozs7UUFLZCxDQUFDLENBQUM7QUFDVixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFM0IsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFaEMsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7SUFDM0IsSUFBSSxLQUFvQixDQUFDO0lBRXpCLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDVixLQUFLLEdBQUc7WUFDTixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUMxQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUMxQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUMxQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUMxQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUMxQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUMxQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUMxQixFQUFFLEtBQUssRUFBRSxDQUFDLEVB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
import { expect } from 'chai';
import Track from './track';
const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html>
<body>
  <div class='testSlider'>
    <div class='meta-slider'></div>
  </div>
</body>`);
global.window = dom.window;
const { document } = dom.window;
describe('Track', () => {
    let $slider;
    let trackClass;
    let $track;
    before(() => {
        $slider = $(document).find('.meta-slider');
        trackClass = new Track($slider, false);
        $track = trackClass.$track;
        $track.css('width', '500');
        $track.css('height', '400');
        trackClass.position.top = 20;
        trackClass.position.left = 10;
    });
    it('устанавливает корневой элемент', () => {
        expect(trackClass.$slider).to.deep.equal($slider);
    });
    it('проверяет ширину трэка для вертикального', () => {
        trackClass.setVertical(true);
        const trackParameters = trackClass.getTrackParameters();
        expect(trackParameters.trackWidth).to.equal(400);
    });
    it('проверяет ширину трэка для горизонтального', () => {
        trackClass.setVertical(false);
        const trackParameters = trackClass.getTrackParameters();
        expect(trackParameters.trackWidth).to.equal(500);
    });
    it('проверяет начало трэка для вертикального', () => {
        trackClass.setVertical(true);
        const trackParameters = trackClass.getTrackParameters();
        expect(trackParameters.trackStart).to.equal(20);
    });
    it('проверяет начало трэка для горизонтального', () => {
        trackClass.setVertical(false);
        expect(trackClass.getTrackParameters().trackStart).to.equal(10);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2sudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92aWV3L2VsZW1lbnRzL3RyYWNrL3RyYWNrLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU5QixPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFFNUIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVuQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQzs7Ozs7UUFLZCxDQUFDLENBQUM7QUFDVixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFM0IsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFaEMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDckIsSUFBSSxPQUE0QixDQUFDO0lBQ2pDLElBQUksVUFBaUIsQ0FBQztJQUN0QixJQUFJLE1BQTJCLENBQUM7SUFFaEMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNWLE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNDLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQzdCLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7UUFDeEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxHQUFHLEVBQUU7UUFDbEQsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUN4RCxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNENBQTRDLEVBQUUsR0FBRyxFQUFFO1FBQ3BELFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDeEQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLEdBQUcsRUFBRTtRQUNsRCxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxHQUFHLEVBQUU7UUFDcEQsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=
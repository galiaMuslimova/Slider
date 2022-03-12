import { expect } from 'chai';
import Model from './Model';
describe('Model', () => {
    it('устанавливает значения в конфиг', () => {
        const model = new Model({
            min: 15,
            max: 25,
            step: 1,
            from: 18,
            to: 20,
            vertical: false,
            tip: true,
            range: true,
        });
        expect(model.getConfig().min).to.equal(15);
        expect(model.getConfig().max).to.equal(25);
        expect(model.getConfig().step).to.equal(1);
        expect(model.getConfig().from).to.equal(18);
        expect(model.getConfig().to).to.equal(20);
        expect(model.getConfig().vertical).to.equal(false);
        expect(model.getConfig().tip).to.equal(true);
        expect(model.getConfig().range).to.equal(true);
    });
    it('установлены дефолтные значения в случае отсутствия опций', () => {
        const model = new Model({
            max: 50,
            step: 10,
            from: 10,
            to: 20,
        });
        expect(model.getConfig().min).to.equal(10);
        expect(model.getConfig().max).to.equal(50);
        expect(model.getConfig().step).to.equal(10);
        expect(model.getConfig().from).to.equal(10);
        expect(model.getConfig().to).to.equal(20);
        expect(model.getConfig().vertical).to.equal(false);
        expect(model.getConfig().tip).to.equal(true);
        expect(model.getConfig().range).to.equal(true);
    });
    it('скорректирован min и max', () => {
        const model = new Model({
            min: 35,
            max: 25,
        });
        model.correctMinMax();
        expect(model.getConfig().min).to.equal(25);
        expect(model.getConfig().max).to.equal(35);
    });
    it('скорректирован from', () => {
        const model = new Model({
            min: 10,
            max: 25,
            step: 5,
            from: 5,
        });
        model.correctFromTo();
        expect(model.getConfig().from).to.equal(10);
    });
    it('скорректирован to', () => {
        const model = new Model({
            min: 10,
            max: 25,
            step: 5,
            from: 1,
            to: 125,
        });
        model.correctFromTo();
        expect(model.getConfig().to).to.equal(25);
    });
    it('сделать массив шагов для шкалы', () => {
        const model = new Model({
            min: 1,
            max: 6,
            step: 1,
        });
        const stepsArr = [
            { value: 1, x: 0 },
            { value: 2, x: 100 },
            { value: 3, x: 200 },
            { value: 4, x: 300 },
            { value: 5, x: 400 },
            { value: 6, x: 500 }
        ];
        expect(model.initStepsArr()).to.deep.equal(stepsArr);
    });
    it('инициализировать параметры', () => {
        const model = new Model({
            min: 0,
            max: 10,
            step: 1,
            from: 3,
            to: 10,
        });
        expect(model.initParameters()).to.deep.equal({ values: [3, 10], positions: [150, 500] });
    });
    it('инициализировать параметры с неправильными from и  to', () => {
        const model = new Model({
            min: 0,
            max: 10,
            step: 1,
            from: -8,
            to: 19,
        });
        model.correctFromTo();
        expect(model.initParameters()).to.deep.equal({ values: [0, 10], positions: [0, 500] });
    });
    it('получить параметры при движении handle 1', () => {
        const model = new Model({
            min: 0,
            max: 500,
            step: 50,
            from: 100,
            to: 400,
        });
        const options = { eventPosition: 130, index: 0 };
        const parameters = {
            values: [150, 400],
            positions: [150, 400],
        };
        expect(model.takeParamHandleMove(options)).to.deep.equal(parameters);
    });
    it('получить параметры при движении handle 2', () => {
        const model = new Model({
            min: 0,
            max: 50,
            step: 5,
            from: 10,
            to: 40,
        });
        const options = { eventPosition: 130, index: 1 };
        const parameters = {
            values: [10, 15],
            positions: [100, 150],
        };
        expect(model.takeParamHandleMove(options)).to.deep.equal(parameters);
    });
    it('получить параметры при клике на шкалу, меняется handle 2', () => {
        const model = new Model({
            min: 0,
            max: 50,
            step: 5,
            from: 10,
            to: 40,
        });
        const parameters = { values: [10, 45], positions: [100, 450] };
        expect(model.takeParamScaleClick(45)).to.deep.equal(parameters);
    });
    it('получить параметры при клике на шкалу, меняется handle 1', () => {
        const model = new Model({
            min: 0,
            max: 50,
            step: 5,
            from: 10,
            to: 40,
        });
        const parameters = { values: [15, 40], positions: [150, 400] };
        expect(model.takeParamScaleClick(15)).to.deep.equal(parameters);
    });
    it('получить параметры при клике на шкалу, при range=false', () => {
        const model = new Model({
            min: 0,
            max: 50,
            step: 5,
            from: 10,
            to: 40,
            range: false,
        });
        expect(model.takeParamScaleClick(5)).to.deep.equal({ values: [5], positions: [50] });
    });
    it('получить параметры при клике на трэк, при range=false', () => {
        const model = new Model({
            min: 0,
            max: 50,
            step: 5,
            from: 10,
            to: 40,
            range: false,
        });
        expect(model.takeParamTrackClick(150)).to.deep.equal({ values: [15], positions: [150] });
    });
    it('получить параметры при клике на трэк, при range=true', () => {
        const model = new Model({
            min: 0,
            max: 50,
            step: 5,
            from: 5,
            to: 40,
            range: true,
        });
        expect(model.takeParamTrackClick(350)).to.deep.equal({ values: [5, 35], positions: [50, 350] });
    });
    it('получить параметры', () => {
        const config = {
            min: 0,
            max: 50,
            step: 5,
            from: 10,
            to: 40,
            range: true,
            vertical: false,
            tip: false,
        };
        const model = new Model(config);
        expect(model.getConfig()).to.deep.equal(config);
    });
    it('установить параметры', () => {
        const config = {
            min: 10,
            max: 50,
            step: 15,
            from: 10,
            to: 40,
            range: false,
            vertical: false,
            tip: false,
        };
        const model = new Model({
            min: 0,
            max: 50,
            step: 5,
            from: 10,
            to: 40,
            range: true,
        });
        model.setConfig(config);
        expect(model.getConfig()).to.deep.equal(config);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9tb2RlbC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFOUIsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBRTVCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ3JCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7UUFDekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUM7WUFDdEIsR0FBRyxFQUFFLEVBQUU7WUFDUCxHQUFHLEVBQUUsRUFBRTtZQUNQLElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLEVBQUU7WUFDUixFQUFFLEVBQUUsRUFBRTtZQUNOLFFBQVEsRUFBRSxLQUFLO1lBQ2YsR0FBRyxFQUFFLElBQUk7WUFDVCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMERBQTBELEVBQUUsR0FBRyxFQUFFO1FBQ2xFLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDO1lBQ3RCLEdBQUcsRUFBRSxFQUFFO1lBQ1AsSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLEVBQUUsRUFBRSxFQUFFO1NBQ1AsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsRUFB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QUFDLEVBQUUsR0FBRyxFQUFFO1NBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDO1lBQ3RCLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLEVBQUU7WUFDUCxJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxDQUFDO1lBQ1AsRUFBRSxFQUFFLEVBQUU7U0FDUCxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzRixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1REFBdUQsRUFBRSxHQUFHLEVBQUU7UUFDL0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUM7WUFDdEIsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsRUFBRTtZQUNQLElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNSLEVBQUUsRUFBRSxFQUFFO1NBQ1AsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFD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
import { expect, assert } from 'chai';

import Observer from './Observer';

describe('Observer', () => {
  let observerClass: Observer;

  before(() => {
    observerClass = new Observer();
  });

  it('проверяет добавление подписчика', () => {
    const changeSetting = function changeSetting(item: number) { return item * 2; };
    observerClass.subscribe({ key: 'setting', observer: changeSetting });
    const chosenObserver = observerClass.observers.filter((item) => item.key === 'setting');
    expect(chosenObserver[0].observer).to.deep.equal(changeSetting);
  });

  it('проверяет добавление подписчика', () => {
    const changeSetting = function changeSetting(item: number) { return item * 2; };
    observerClass.subscribe({ key: 'setting', observer: changeSetting });
    const chosenObserver = observerClass.observers.filter((item) => item.key === 'setting');
    assert.isOk(chosenObserver[0].observer);
  });
});

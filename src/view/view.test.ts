import { assert } from 'chai';
import { vie } from './vie';


describe("vie", function () {

  it("возводит", function () {
    assert.equal(vie(2, 3), 5);
  });

});
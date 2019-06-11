const assert = require("assert");
const { describe } = require("../dist/describe");

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

describe("some title", describe => {
  assert.equal(1 + 1, 2);

  describe("some sub title1", describe => {
    assert.equal(1 * 1, 1);
    assert.equal(1 / 1, 1);

    describe("some sub title1 deeper", describe => {
      assert.equal(1 - 1, 0);
    });

    describe("some sub title1 deeper2", describe => {
      assert.equal(1 % 1, 0);
    });
  });

  describe("some sub title2", describe => {
    assert.equal(1 ** 2, 1);
  });
});

// run this with: `node success.js`

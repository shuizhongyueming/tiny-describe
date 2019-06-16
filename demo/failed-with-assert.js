const assert = require("assert");
const { describe } = require("../dist/describe");

describe("some spec contain error", async describe => {
  await describe("some right spec", describe => {
    assert.equal(1 * 1, 1);
    assert.equal(1 / 1, 1);
  });

  await describe("some right and wrong spec", describe => {
    describe("some right spec in it", describe => {
      assert.equal(1 - 1, 0);
    });
    describe("some wrong spec in it", () => {
      assert.equal(1 * 1, 0);
    });
  });

  describe("some other right spec", describe => {
    assert.equal(1 % 1, 0);
  });

  describe("some wrong", () => {
    assert.equal(1, 2);
  });
});

// run this with: `node success-with-assert.js`

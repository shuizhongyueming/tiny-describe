const assert = require("assert");
const { describe } = require("../dist/describe");

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

describe("some title", async describe => {
  assert.strictEqual(1 + 1, 2);

  await describe("some sub title1", async describe => {
    assert.strictEqual(1 * 1, 1);
    assert.strictEqual(1 / 1, 1);

    await describe("some sub title1 deeper", describe => {
      assert.strictEqual(1 - 1, 0);
    });

    await describe("some sub title1 deeper2", describe => {
      assert.strictEqual(1 % 1, 0);
    });
  });

  await describe("some sub title2", describe => {
    assert.strictEqual(1 ** 2, 1);
  });
});

// run this with: `node success-with-assert.js`

const assert = require("assert");
const { describe } = require("../dist/describe");

function test() {
  return describe("some spec contain error", async describe => {
    await describe("some right spec", describe => {
      assert.strictEqual(1 * 1, 1);
      assert.strictEqual(1 / 1, 1);
    });

    await describe("some right and wrong spec", async describe => {
      await describe("some right spec in it", describe => {
        assert.strictEqual(1 - 1, 0);
      });
      await describe("some wrong spec in it", () => {
        assert.strictEqual(1 * 1, 0);
      });
    });

    await describe("some other right spec", describe => {
      assert.strictEqual(1 % 1, 0);
    });

    await describe("some wrong", () => {
      assert.strictEqual(1, 2);
    });
  });
}

exports.test = test;

if (require.main === module) {
  test();
}

// run this with: `node success-without-throw.js`

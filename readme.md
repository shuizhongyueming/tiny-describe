# tiny-describe

<a href="https://www.npmjs.com/package/tiny-describe"><img src="https://img.shields.io/npm/v/tiny-describe.svg?style=flat-square&colorB=51C838" alt="NPM Version"></a>

## description

This is a tiny test framework which you can run at runtime or a development environment.

It is good for a simple or temp use, but if you want to build a well featured test, use other test frameworks like Mocha, Jest.

## use

```javascript
const describe = require('describe');
const assert = require('assert');
describe('some spec name', describe => {
  assert.equal(1, 1);

  describe('some sub spec', () => {
    assert.equal(1 * 1 , 1);
  });
});
```

more usage you can see the `demo/` folder
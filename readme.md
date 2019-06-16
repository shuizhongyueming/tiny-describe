## description

This is a tiny test framework which you can run at runtime or a development environment.

It is good for a simple or temp use, but if you want to build a well featured test, use otherthings like Mocha, Jest.

## use

```javascript
const describe = require('describe');
const assert = require('assert');
describe('some spec name', () => {
  assert.equal(1, 1);
});
```

more usage you can see the `demo/` folder
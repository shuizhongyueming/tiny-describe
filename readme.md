# tiny-describe

<a href="https://www.npmjs.com/package/tiny-describe"><img src="https://img.shields.io/npm/v/tiny-describe.svg?style=flat-square&colorB=51C838" alt="NPM Version"></a>

## description

This is a tiny test framework which you can run at runtime or a development environment.

It just help you to organize your assert and make sure they are called in ordered sequence.

It is good for a simple or temp use, but if you want to build a well featured test, use other test frameworks like Mocha, Jest.

## use

```javascript
const describe = require('tiny-describe');
const assert = require('assert');
describe('some spec name', async describe => {
  assert.equal(1, 1);

  // all inner describe should called with await
  await describe('some sub spec', () => {
    assert.equal(1 * 1 , 1);
  });
});
```

more usage you can see the `demo/` folder

`demo/failed-with-throw` is a demo for a well formatted output of all spec's test status, but it will not throw any exception

![](http://cdn.imagehost.top/ipic/mygor.png-q60)

`demo/failed-without-thorw.js` is a demo that will thorw an error for the first spec error and stop the rest test

![](http://cdn.imagehost.top/ipic/6ut55.png-q60)
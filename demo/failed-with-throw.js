const { setIsThrowError } = require("../dist/describe");
const { test } = require("./failed-without-thorw");

// hooks inside describe to control wheather to thorw error
setIsThrowError(true);

test()
  .then(() => {
    console.log("all test passed success");
  })
  .catch(e => {
    console.log("test failed: %s", e.message);
  });

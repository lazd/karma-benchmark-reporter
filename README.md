# karma-benchmark-reporter
> A jsPerf-style reporter for karma-benchmark

## Installation

```shell
npm install karma-benchmark-reporter --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    reporters: ['benchmark']
  });
};
```

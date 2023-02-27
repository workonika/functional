# or, and functions
Apply functions to one data and return boolean; apply function to some data and return boolean.

## Install
```sh
npm install @workonika/functional
```

##API
```
const wf = require('@workonika/functional');
const { or, and } = wf;
or(fn, [fn2, ..., fnN], data) => boolean
or(fn, data, [data2, ..., dataN]) => boolean
and(fn, [fn2, ..., fnN], data) => boolean
and(fn, data, [data2, ..., dataN]) => boolean
```
##Example
```js
  const five = 5; const six = 6; const seven = 7;
  const equal5 = (data) => data === 5;
  const equal6 = (data) => data === 6;
  const equal7 = (data) => data === 7;

  or(five, six, seven, equal5); // => true
  or(equal5, equal6, equal7, six); // => true

  const five = 'five'; const six = 'six'; const seven = 'seven'; const eight = 'eight';
  const containI = (data) => /i/.test(data);
  const containE = (data) => /e/.test(data);

  and(five, six, eight, containI); // => true
  and(six, seven, eight, containE); // => false
```
##License
ISC

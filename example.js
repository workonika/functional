const workFunc = require('./');
const { or, and } = workFunc;

const five = 5; const six = 6; const seven = 7;
const equal5 = (data) => data === 5;
const equal6 = (data) => data === 6;
const equal7 = (data) => data === 7;

or(five, six, seven, equal5); // => true
or(equal5, equal6, equal7, six); // => true

const fiveStr = 'five'; const sixStr = 'six'; const sevenStr = 'seven'; const eightStr = 'eight';
const containI = (data) => /i/.test(data);
const containE = (data) => /e/.test(data);

and(fiveStr, sixStr, eightStr, containI); // => true
and(sixStr, sevenStr, eightStr, containE); // => false

# Klumba
## На русском (english below)
Набор функций позволяющий писать код в функциональном стиле. 

## Install
```sh
npm install klumba
```

### isEqualValues
Иногда приходится писать код, наподобие: 
```
if (variable === value1 || variable === value2 || variable === value3) /**/
```
Вместо такого стиля, используется функция isEqualValues:
```
if(isEqualValues(variable, [value1, value2, value3])) /**/
```

### isEqualVariables
Иногда приходится писать код, наподобие: 
```
if (variable1 === value || variable2 === value || variable3 === value) /**/
```
Вместо такого стиля, используется функция isEqualVariables:
```
if(isEqualVariables(value, [variable1, variable2, variable3])) /**/
```

### or
Иногда приходится писать код, наподобие: 
```
if (checkTruthy(value1) === true || checkTruthy(value2) === true || ...) /**/
```
или, что тоже самое: 
```
if(checkTruthy(value1) || checkTruthy(value2) || ...) /**/
```
Вместо такого стиля, используется функция or:
```
if(or(value1, value2, checkTruthy)) /**/
```

Но, также эта функция применяется и для следующих случаев: 
```
if(checkTruthy1(value) === true || checkTruthy2(value) === true || ...) /**/
```
или, что тоже самое: 
```
if(checkTruthy1(value) || checkTruthy2(value) || ...) /**/
```
Вместо такого стиля, используется функция or:
```
if(or(checkTruthy1, checkTruthy2, ..., value)) /**/
```

### and
Иногда приходится писать код, наподобие: 
```
if (isString(data) && hasSubstring(data) && isLengthMore200(data) && ...) /**/
```
Вместо такого стиля, используется функция and:
```
if(and(isString, hasSubstring, isLengthMore200, data)) /**/
```
Иногда приходится писать код, наподобие: 
```
if (isString(data1) && isString(data2) && isString(data3) && ...) /**/
```
Вместо такого стиля, используется функция and:
```
if(and(data1, data2, data3, isString)) /**/
```
Наглядный результат работы функций, or, and вы можете посмотреть в __tests__/orand.test.ts 
Возвращаемый результат. В зависимости от того, какую функцию создала фабрика, данные будут обрабатываться так. Рассмотрим
например функцию or, а затем and. Допустим у вас есть одно данное и вам над ним нужно выполнить ряд проверок, допустим,
является ли данное строкой, содержит ли эта строка конкретную подстроку, превышает ли длина определенное число символов. Если
какая-либо проверка (это естественно будет функция) возвращает true, то функция or вернет true. В коде это будет выглядеть так
or(isString, hasSubstring, isLengthMore200, data). Но может возникнуть и другая потребность - вам нужно проверить ряд данных
на определенное свойство, допустим есть ли среди данных строка. В коде это будет выглядеть так
or(string, number, boolean, isString). Обратите внимание, что код or(isString, hasSubstring, isLengthMore200, data) можно
заменить эквивалентным кодом, который будет выглядеть так: isString(data) || hasSubstring(data) || isLengthMore200(data).
А для or(string, number, boolean, isString) : isString(string) || isString(number) || isString(boolean).
Теперь понимаете, какую проблему решают функции? Убирают дублирование. Но признаюсь, за это пришлось заплатить простотой.
Теперь про функцию and. Допустим у вас есть одно данное и вам нужно выполнить ряд проверок и при этом все проверки должны
дать положительный результат, тогда and вернет true, иначе false. В коде это будет выглядеть так
and(isString, hasSubstring, isLengthMore200, data) если переменная data является строкой, содержит определенную подстроку и
ее длина больше 200 символов, то and возвращает true, в противном случае false. Допустим у вас есть несколько переменных
и вы утверждаете, что все они строки, в коде это будет выглядеть так and(data1, data2, data3, isString). Если все переменные- строки, 
то функция and вернет true, в противном случае false. Обратите внимание, что код
and(isString, hasSubstring, isLengthMore200, data) можно заменить на эквивалентный isString(data) && hasSubstring(data) &&
isLengthMore200(data). А код and(data1, data2, data3, isString) заменить на эквивалентный isString(data1) && isString(data2) &&
isString(data3).


# Klumba (in English)
A set of functions for programming in functinal style. 

Klumba means a clump (in english). A clump is a set of plants in one pot. By this analogy I used the name for a library.

## Install
```sh
npm install klumba
```

##API
```
const wf = require('klumba');
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

  const five = 'five'; 
  const six = 'six'; 
  const seven = 'seven'; 
  const eight = 'eight';
  const containI = (data) => /i/.test(data);
  const containE = (data) => /e/.test(data);

  and(five, six, eight, containI); // => true
  and(six, seven, eight, containE); // => false
```
##License
ISC

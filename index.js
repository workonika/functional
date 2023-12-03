    const splitFnArgs = (...args) => args.reduce((acc, arg) => {
            const prop = typeof arg === 'function' ? 'fns' : 'data';

            return {
            ...acc,
            [prop]: [...acc[prop], arg],
        };
    }, { fns: [], data: [] });

    /**
    * Это фабрика функций. При вызове ей передается тип Operation, который может быть строкой или some или every.
    * Понадобились функции, которые выполняют действия разные по сути, но их реализации разнятся буквально лишь одним
    * названием метода. Это методы some, every - методы массивов. Для того, чтобы не дублировать реализации и была написана
    * одна фабрика. Фабрика возвращает функцию.
    * Что делает возвращаемая функция? Глядя на сигнатуру принимает переменное число аргументов.
    * Работает в двух направлениях: 1) можно передать от одного до какого-то количества данных и в конце одну функцию или 2)
    * передать от одной до нескольких функций и в конце одно данное.
    * Смысл данных и функций в аргументах. Данное - это то, над чем будут вести работу переданные функции. И в случае 1 над каждым
    * переданным данным одна функция будет вести работу, а в случае 2 каждая функция будет вести работу над одним данным, которое
    * передано в конце.
    * Наглядный результат работы функций, созданных фабрикой, or, and вы можете посмотреть в __tests__/orand.test.ts
    * Возвращаемый результат. В зависимости от того, какую функцию создала фабрика, данные будут обрабатываться так. Рассмотрим
    * например функцию or, а затем and. Допустим у вас есть одно данное и вам над ним нужно выполнить ряд проверок, допустим,
    * является ли данное строкой, содержит ли эта строка конкретную подстроку, превышает ли длина определенное число символов. Если
    * какая-либо проверка (это естественно будет функция) возвращает true, то функция or вернет true. В коде это будет выглядеть так
    * or(isString, hasSubstring, isLengthMore200, data). Но может возникнуть и другая потребность - вам нужно проверить ряд данных
    * на определенное свойство, допустим есть ли среди данных строка. В коде это будет выглядеть так
    * or(string, number, boolean, isString). Обратите внимание, что код or(isString, hasSubstring, isLengthMore200, data) можно
    * заменить эквивалентным кодом, который будет выглядеть так: isString(data) || hasSubstring(data) || isLengthMore200(data).
    * А для or(string, number, boolean, isString) : isString(string) || isString(number) || isString(boolean).
    * Теперь понимаете, какую проблему решают функции? Убирают дублирование. Но признаюсь, за это пришлось заплатить простотой.
    * Теперь про функцию and. Допустим у вас есть одно данное и вам нужно выполнить ряд проверок и при этом все проверки должны
    * дать положительный результат, тогда and вернет true, иначе false. В коде это будет выглядеть так
    * and(isString, hasSubstring, isLengthMore200, data) если переменная data является строкой, содержит определенную подстроку и
    * ее длина больше 200 символов, то and возвращает true, в противном случае false. Допустим у вас есть несколько переменных
    * и вы утверждаете, что все они строки, в коде это будет выглядеть так and(data1, data2, data3, isString). Если все переменные
    * - строки, то функция and вернет true, в противном случае false. Обратите внимание, что код
    * and(isString, hasSubstring, isLengthMore200, data) можно заменить на эквивалентный isString(data) && hasSubstring(data) &&
    * isLengthMore200(data). А код and(data1, data2, data3, isString) заменить на эквивалентный isString(data1) && isString(data2) &&
    * isString(data3).
    * @param operation - строка 'some' | 'every';
    */
    const functionCreator = (operation) => (...args) => {

        /**
         * После применения функции splitFnArgs, мы получаем объект, где в fns - массив функций, а в data - массив данных.
         * Предположений о количестве функция не делает.
         */
        const {
            fns,
            data
        } = splitFnArgs(...args);

        /**
         * Определяем, что пользователь передал первым аргументом. Как сказано выше - это определяет, как будут обрабатываться данные.
         * Если first - функция, то любое их число, равное args.length - 1 будет применено к последнему аргументу доступному в
         * массиве args.
         */
        const [first] = args;
        /**
         * Ветка обработки, если первый аргумент - функция
         */
        if (typeof first === 'function') {
            const [input] = data;

            const appliedFnsResult = fns.map((fn) => fn(input));

            return Array.prototype[operation].apply(appliedFnsResult, [bool => bool]);
        }
        /**
         * Ветка обработки, если первый аргумент - данные
         */
        const [fn] = fns;
        return data[operation](fn);
    };

    const [or, and] = ['some', 'every'].map((operation) => functionCreator(operation));

    const isEqualValues = (variable, values) => {
        if (!Array.isArray(values)){
            const type = typeof values;
            const isObject = type === 'object';

            throw new Error(`Second argument values of function isEqualValues must be ` + 
                `an array, but it ${isObject ? 'has other object type' : 'is type ' + type}`);
        }

        return values.includes(variable);
    };

    const isEqualVariables = (value, variables) => {
        if (!Array.isArray(values)){
            const type = typeof values;
            const isObject = type === 'object';

            throw new Error(`Second argument values of function isEqualVariables must be ` + 
                `an array, but it ${isObject ? 'has other object type' : 'is type ' + type}`);
        }

        return variables.includes(value);
    };

    module.exports = { or, and, isEqualValues, isEqualVariables };

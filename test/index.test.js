const { or, and } = require('../');

describe('or', () => {
    const five = 5; const six = 6; const seven = 7; const eight = 8;
    const equal5 = (data) => data === 5;
    const equal6 = (data) => data === 6;
    const equal7 = (data) => data === 7;

    test('or вернет true если переденная функция вернет true для любого из данных', () => {
        expect(or(five, six, seven, equal5)).toBeTruthy();
    });

    test('or вернет false если переденная функция вернет false для всех данных', () => {
        expect(or(six, seven, eight, equal5)).toBeFalsy();
    })

    test('or вернет true если любая из функций вернет true для данного', () => {
        expect(or(equal5, equal6, equal7, six)).toBeTruthy();
    })

    test('or вернет false если все функции вернут false для данного', () => {
        expect(or(equal5, equal6, equal7, eight)).toBeFalsy();
    })
});

describe('and', () => {
    const five = 'five'; const six = 'six'; const seven = 'seven'; const eight = 'eight';
    const containI = (data) => /i/.test(data);
    const containE = (data) => /e/.test(data);
    const containV = (data) => /v/.test(data);

    test('and вернет true если переданная функция вернет true для всех из данных', () => {
        expect(and(five, six, eight, containI)).toBeTruthy();
    });

    test('and вернет false если переданная функция вернет false хотя бы для одного из данных', () => {
        expect(and(six, seven, eight, containE)).toBeFalsy();
    })

    test('and вернет true если каждая из функций вернет true для данного', () => {
        expect(and(containI, containE, containV, five)).toBeTruthy();
    })

    test('and вернет false если хотя бы одна из функций вернет false для данного', () => {
        expect(and(containI, containE, containV, eight)).toBeFalsy();
    })
});

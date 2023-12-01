import { Trebuchet } from "../../src/tasks/01/Trebuchet";

describe('Trebuchet', ()=> {
    let trebuchet: Trebuchet;

    beforeEach(()=> {
        trebuchet = new Trebuchet();
    })

    test('1abc2 yields 12, which is the sum', ()=> {
        const data = ['1abc2'];
        expect(trebuchet.calculateSum(data)).toEqual(12);
    });

    test('pqr3stu8vwx yields 38', ()=> {
        const data = ['pqr3stu8vwx'];
        expect(trebuchet.calculateSum(data)).toEqual(38);
    });

    test('a1b2c3d4e5f yields 15', ()=> {
        const data = ['a1b2c3d4e5f'];
        expect(trebuchet.calculateSum(data)).toEqual(15);
    });

    test('treb7uchet yields 77', ()=> {
        const data = ['treb7uchet'];
        expect(trebuchet.calculateSum(data)).toEqual(77);
    })

    it('matches the sample code result', ()=> {
        const data = [
            '1abc2',
            'pqr3stu8vwx',
            'a1b2c3d4e5f',
            'treb7uchet'
        ];

        expect(trebuchet.calculateSum(data)).toEqual(142);
    });


    test('two1nine yields 29', ()=> {
        const data = ['two1nine'];
        expect(trebuchet.calculateSumWitWordDigits(data)).toEqual(29);
    });

    test('eightwothree yields 83', ()=> {
        const data = ['eightwothree'];
        expect(trebuchet.calculateSumWitWordDigits(data)).toEqual(83);
    });

    test('abcone2threexyz yields 13', ()=> {
        const data = ['abcone2threexyz'];
        expect(trebuchet.calculateSumWitWordDigits(data)).toEqual(13);
    });

    test('xtwone3four yields 24', ()=> {
        const data = ['xtwone3four'];
        expect(trebuchet.calculateSumWitWordDigits(data)).toEqual(24);
    });
    
    test('4nineeightseven2 yields 42', ()=> {
        const data = ['4nineeightseven2'];
        expect(trebuchet.calculateSumWitWordDigits(data)).toEqual(42);
    })
    
    it('matches the sample code result', ()=> {
        const data = [
            'two1nine',
            'eightwothree',
            'abcone2threexyz',
            'xtwone3four',
            '4nineeightseven2',
            'zoneight234',
            '7pqrstsixteen'
        ];

        expect(trebuchet.calculateSumWitWordDigits(data)).toEqual(281);
    });
  
})
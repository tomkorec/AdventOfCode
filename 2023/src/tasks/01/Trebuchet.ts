import { AbstractTask } from "../AbstractTask";

export class Trebuchet extends AbstractTask {

    public calculateSum(data: string[]): number {

        let sum = 0;

        data.forEach(line => {
            const firstMatch = line.match(/^\D*(\d)/);
            const lastMatch = line.match(/(\d)\D*$/);

            if (!firstMatch || !lastMatch) {
                return;
            }

            const first = +firstMatch[1] ?? null;
            const last = +lastMatch[1] ?? null;

            if (!first || !last) {
                return;
            }

            sum += first * 10 + last;
        });

        return sum;
    }

    public calculateSumWitWordDigits(data: string[]): number {
        const digitizedNumbers: Record<number, namedNumbers> = {
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
            6: 'six',
            7: 'seven',
            8: 'eight',
            9: 'nine'
        };

        const numbersOr = Object.values(digitizedNumbers).join('|');

        let sum = 0;

        data.forEach(line => {


            // matching single digits as well as named digits
            const firstRegex = new RegExp(`^.*?(${numbersOr}|\\d)+?.*$`);
            const firstMatch = line.match(firstRegex);

            const lastRegex = new RegExp(`^.*(${numbersOr}|\\d)+.*?$`);
            const lastMatch = line.match(lastRegex);

            if (!firstMatch || !lastMatch) {
                return;
            }

            let first = firstMatch[1] ?? null as string | null;
            let last = lastMatch[1] ?? null as string | null;


            if (!first || !last) {
                return;
            }

            const f = first.length > 1 ? Object.entries(digitizedNumbers).find(([key, value]) => value === first)![0] : first;
            const l = last.length > 1 ? Object.entries(digitizedNumbers).find(([key, value]) => value === last)![0] : last;

            sum += Number(f) * 10 + Number(l);
        });

        return sum;
    }


    solveFirst() {
        const data = this.loadFile('01.txt').split('\n');
        console.log(this.calculateSum(data));
    }

    solveSecond() {
        const data = this.loadFile('01.txt').split('\n');
        console.log(this.calculateSumWitWordDigits(data));
    }

    solveBoth() {
        console.log('First part: ');
        this.solveFirst();
        console.log('Second part: ');
        this.solveSecond();
    }

}

type namedNumbers = 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine';

import { AbstractTask } from "../AbstractTask";

export class Scratchcards extends AbstractTask {


    solveFirst(): void {
        const data = this.loadFile('04.txt').split('\n');
        console.log(this.sumWinningPoints(data));
    }

    solveSecond(): void {
    }

    sumWinningPoints(data: string[]): number {
        let sum = 0;
        data.forEach(line => {
            const [winningStr, actualStr] = line
                .replace(/^Card\s\d:\s/, '') // remove starting string
                .replace(/\s+/g, '-') // normalize spaces
                .split('-|-'); // split into half

            if (!actualStr || !winningStr) {
                return;
            }

            const [winning, actual] = [
                winningStr.split('-').map(n => Number(n)),
                actualStr.split('-').map((n => Number(n)))
            ];

            let pow = 0;
            actual.forEach(ac => {
                if (winning.includes(ac)) {
                    if (pow === 0) {
                        pow = 1;
                    } else {
                        pow *= 2;
                    }
                }
            });

            sum += pow;

        });

        return sum;
    }
}

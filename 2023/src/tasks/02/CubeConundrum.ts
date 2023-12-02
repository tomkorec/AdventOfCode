import { AbstractTask } from "../AbstractTask";

export class CubeConundrum extends AbstractTask {

    public sumPossibleGames(data: string[]): number {

        let sum = 0;
        data.forEach(line => {

            const expr = '^Game\\s+(\\d+):\\s+';

            let match = line.match(expr);

            if (!match) {
                return;
            }

            const gameNumber = Number(match![1]);


            line = line.replace(/^Game\s+\d+:\s+/, '');

            const draws = line.split(/;\s*/);

            let allDrawable = true;
            draws.forEach(draw => {
                const sums: Record<RGB, number> = {
                    red: 0,
                    green: 0,
                    blue: 0
                }

                const colors = draw.split(', ');

                colors.forEach(c => {
                    const [count, color] = c.split(' ');

                    sums[color as RGB] += Number(count);
                });

                if (sums.red > 12 || sums.green > 13 || sums.blue > 14) {
                    allDrawable = false;
                }

            });

            if (allDrawable) {
                sum += gameNumber;
            }

        });

        return sum;
    }

    sumPowersOfMinimalCubeCounts(data: string[]) {
        let sum = 0;

        data.forEach(line => {
            line = line.replace(/^Game\s+\d+:\s+/, '');

            const draws = line.split(/;\s*/);

            const leastSums: Record<RGB, number> = {
                red: 0,
                green: 0,
                blue: 0
            }
            draws.forEach(draw => {

                const colors = draw.split(', ');

                colors.forEach(c => {
                    const [count, color] = c.split(' ');

                    const currentValue = leastSums[color as RGB];

                    if (currentValue < Number(count)) {
                        leastSums[color as RGB] = Number(count);
                    }

                });

            });

            const pow = leastSums.green * leastSums.red * leastSums.blue;

            sum += pow;

        });

        return sum;
    }


    solveFirst(): void {
        const data = this.loadFile('02.txt').split("\n");
        console.log(this.sumPossibleGames(data));
    }

    solveSecond(): void {
        const data = this.loadFile('02.txt').split("\n");
        console.log(this.sumPowersOfMinimalCubeCounts(data));
    }

}

type RGB = 'red' | 'green' | 'blue';

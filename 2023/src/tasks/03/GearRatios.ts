import { AbstractTask } from "../AbstractTask";

export class GearRatios extends AbstractTask {

    solveFirst(): void {
        let s = this.loadFile('03.txt');

        const matches = s.matchAll(/(\d+)/g);
        let count = 0;
        for (let match of matches) {
            count++;
        }

        console.log(count);


        const data = s.split('\n');
        console.log(this.sumPartNumbersInEngine(data));
    }

    solveSecond(): void {
    }

    public sumPartNumbersInEngine(data: string[]): number {
        let sum = 0;

        const grid = new Grid(
            data.map((line, y) =>
                new Row(line.split('')
                        .map((c, x) => new Cell(x, y, c, x === line.length - 1)),
                    y,
                    y === data.length - 1
                )
            )
        );

        grid.findValidPartNumbers();
        console.log(grid.numbers.length);

        // console.log(grid.numbers.filter(n => !n.isPart).map(n => n.drawSurroundings(grid)).join('\n'));

        return grid.numbers.filter(n => n.isPart).reduce((acc, p) => p.value + acc, 0);
    }
}


class Grid {
    public numbers: PartNumber[] = [];

    constructor(
        public readonly rows: Row[]
    ) {
    }

    public extractSymbols() {
        const symbols: PartSymbol[] = [];

        this.rows.forEach(row => {
            row.cells.forEach(cell => {
                if (/[^\d\s.]/.test(cell.value)) {
                    symbols.push(new PartSymbol(
                        cell.value,
                        row,
                        cell
                    ));
                }
            });
        });

        return symbols;
    }

    public extractNumbers(): PartNumber[] {

        const numbers: PartNumber[] = [];

        this.rows.forEach(row => {

            // wait for number!
            let number: string[] = [];
            let cells: Cell[] = [];


            row.cells.forEach(cell => {
                const val = cell.value;

                if (/\d/.test(val)) {
                    number.push(val);
                    cells.push(cell);
                    return;
                }

                if (number.length === 0) {
                    return;
                }

                const partNumber = new PartNumber(
                    Number(number.join('')),
                    row,
                    cells
                );

                numbers.push(partNumber);

                number = [];
                cells = [];

            });

            if (number.length > 0) {
                const partNumber = new PartNumber(
                    Number(number.join('')),
                    row,
                    cells
                );

                numbers.push(partNumber);
            }
        });

        return numbers;
    }

    public getNeighboroughingRows(row: Row): Row[] {
        const neighboroughs = [];

        neighboroughs.push(this.getRowOfNumber(row.number + 1));
        neighboroughs.push(this.getRowOfNumber(row.number - 1));

        return neighboroughs
            .filter(r => r !== null)
            .map(r => r as Row);
    }


    private getRowOfNumber(number: number): Row | null {
        if (number >= this.rows.length) {
            return null;
        }

        if (number <= 0) {
            return null;
        }

        return this.rows.find(row => row.number === number)!;
    }

    /**
     * The goal is to check all symbols for adherent numbers always in the three rows span
     */
    findValidPartNumbers(valid: boolean = true) {
        const validNrs: PartNumber[] = [];

        let partSymbols = this.extractSymbols();
        this.numbers = this.extractNumbers();

        partSymbols.forEach(symbol => {
            const numbers = this.getNumbersAroundRow(symbol.row.number);
            numbers.forEach(n => {

                let start = n.firstCell().x === 0 ? 0 : n.firstCell().x - 1;
                let end = n.lastCell().x >= n.row.cells.length - 1 ? n.lastCell().x : n.lastCell().x + 1;


                for (let i = start; i <= end; i++) {
                    if (i === symbol.cell.x) {
                        validNrs.push(n);
                        n.isPart = true;
                    }
                }
            });
        });


        return validNrs;
    }

    getNumbersAroundRow(number: number) {
        return this.numbers.filter(pn => pn.liesAroundRow(number));
    }

    getRowByNumber(number: number) {
        return this.rows.find(r => r.number === number)!;
    }
}

class Row {


    constructor(
        public readonly cells: Cell[],
        public readonly number: number,
        public last: boolean
    ) {
    }
}

class Cell {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly value: string,
        public readonly last: boolean
    ) {
    }

}

class PartNumber {
    isPart: boolean = false;

    constructor(
        public value: number,
        public row: Row,
        public cells: Cell[],
    ) {
    }

    liesAroundRow(number: number) {
        return Math.abs(this.row.number - number) <= 1;
    }

    firstCell() {
        return this.cells[0];
    }

    lastCell() {
        return this.cells[this.cells.length - 1];
    }

    drawSurroundings(grid: Grid) {
        const rows: Row[] = [];

        if (this.row.number !== 0) {
            rows.push(grid.getRowByNumber(this.row.number - 1));
        }

        rows.push(this.row);

        if (!this.row.last) {
            rows.push(grid.getRowByNumber(this.row.number + 1));
        }

        const start = this.firstCell().x ! === 0 ? 0 : this.firstCell().x - 1;
        const end = this.lastCell().last ? this.lastCell().x : this.lastCell().x + 1;

        let str = '';
        rows.forEach(r => {
            for (let i = start; i <= end; i++) {
                str += r.cells[i]?.value ?? '';
            }

            str += '\n';
        });


        return str;
    }
}

class PartSymbol {
    constructor(
        public value: string,
        public row: Row,
        public cell: Cell
    ) {
    }
}

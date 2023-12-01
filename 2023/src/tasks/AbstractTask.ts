import { FileLoader } from "../utils/fileLoader";

export abstract class AbstractTask implements TaskInterface {
    abstract solveFirst(): void;
    abstract solveSecond(): void;

    private fileLoader = new FileLoader();

    solveBoth() {
        console.log('First part: ');
        this.solveFirst();
        console.log('Second part: ');
        this.solveSecond();
    }
    
    protected loadFile(fileName: string): string {
        return this.fileLoader.load(fileName);
    }
}
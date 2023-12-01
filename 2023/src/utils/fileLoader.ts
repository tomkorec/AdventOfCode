import * as fs from 'fs';
import * as path from 'path';


export class FileLoader {
    public load(filename: string): string {
        const filePath = path.join(__dirname, '..', '..', '..', 'src', 'data', filename);
        return fs.readFileSync(filePath, 'utf-8');
    }
}
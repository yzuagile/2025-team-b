import * as fs from "fs";
import * as path from "path";

export class FileManager {

    static readonly _PATH = './data';

    static async write(fileName: string, content: any) {
        if (!fs.existsSync(FileManager._PATH)) fs.mkdirSync(FileManager._PATH);
        
        const filePath = path.join(this._PATH, fileName);
        const storableData = JSON.stringify(content);
        fs.writeFileSync(filePath, storableData);
    }
    
    static async read(fileName: string) {
        if (!fs.existsSync(FileManager._PATH)) fs.mkdirSync(FileManager._PATH);
        const filePath = path.join(this._PATH, fileName);
        return fs.readFileSync(filePath, { encoding: 'utf-8', flag: 'r' });
    }
}
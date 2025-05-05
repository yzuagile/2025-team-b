import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid"; 

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

    static generateUniqueUUID(directoryPath: string): string {
        if (!fs.existsSync(directoryPath)) fs.mkdirSync(directoryPath);
    
        let newUUID: string;
        let filePath: string;
    
        do {
            newUUID = uuidv4(); // 生成隨機 UUID
            filePath = path.join(directoryPath, `${newUUID}.json`);
        } while (fs.existsSync(filePath)); // 確保 UUID 不與現有文件名衝突
    
        return newUUID;
    }
}
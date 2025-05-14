import * as fs from "fs/promises";
import * as path from "path";
import { v4 as uuidv4 } from "uuid"; 
import { Note } from "../interfaces/NoteStructure";

export class FileManager {

    static readonly _PATH = path.join(process.cwd(), 'data');

    static async write<T>(fileName: string, content: T): Promise<void> {
        try 
        {
            await fs.mkdir(FileManager._PATH, { recursive: true });
            
            const filePath = path.join(FileManager._PATH, fileName);
            const storableData = JSON.stringify(content);
            
            // 若檔案存在，會覆寫檔案內容
            await fs.writeFile(filePath, storableData, { encoding: 'utf8', flag: 'w' });
        }
        catch (err) 
        {
            throw err;
        }
    }

    static async read<T>(fileName: string): Promise<T> {
        try 
        {
            const filePath = path.join(FileManager._PATH, fileName);
            const content = await fs.readFile(filePath, 'utf8');
            const data = JSON.parse(content) as T;
            return data;
        } 
        catch (err) 
        {
            throw err;
        }
    }

    static randomUUID() {
        let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    static async generateUniqueUUID(directoryPath: string): Promise<string> {
        
        try{
            await fs.mkdir(directoryPath, { recursive: true });
    
            let newUUID: string;
            let filePath: string;
            
            do {
                newUUID = FileManager.randomUUID();
                filePath = path.join(directoryPath, `${newUUID}.json`);
            } while (await this.fileExists(filePath));

            return newUUID;
        }
        catch(err){
            throw err;
        }
        
    }

    private static async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    static async getAllFileNames():Promise<string[]>{

        try{
            fs.mkdir(FileManager._PATH);
        
            return await fs.readdir(FileManager._PATH);
        }
        catch(err){
            throw err;
        }
    }
}
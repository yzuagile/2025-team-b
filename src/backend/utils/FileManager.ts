import * as fs from "fs/promises";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

export class FileManager {

    static readonly _PATH = path.join(process.cwd(), 'data');

    static async write<T>(fileName: string, content: T): Promise<void> {
        try {
            await fs.mkdir(FileManager._PATH, { recursive: true });

            const filePath = path.join(FileManager._PATH, fileName);
            const storableData = JSON.stringify(content);

            await fs.writeFile(filePath, storableData, 'utf8');
        }
        catch (err) {
            console.error(err);
        }
    }

    static async read<T>(fileName: string): Promise<T> {
        try {
            const filePath = path.join(FileManager._PATH, fileName);
            const content = await fs.readFile(filePath, 'utf8');
            const data = JSON.parse(content) as T;
            return data;
        }
        catch (err) {
            console.error(err);
        }
    }

    static generateUniqueUUID(directoryPath: string): string {
        fs.mkdir(directoryPath, { recursive: true });

        let newUUID: string;
        let filePath: string;

        newUUID = uuidv4();
        filePath = path.join(directoryPath, `${newUUID}.json`);

        return newUUID;
    }

    static async getAllFileNames(): Promise<string[]> {

        fs.mkdir(FileManager._PATH);

        return await fs.readdir(FileManager._PATH);
    }
}
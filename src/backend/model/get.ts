import { FileManager } from "../utils/FileManager";

export async function getAllNotes(): Promise<Note[]> {

    try{
        const fileNames = await FileManager.getAllFileNames();

        const notes = await Promise.all(
            fileNames.map(async (fileName) => {
                const content = await FileManager.read(fileName) as Note;
                return content;
            })
        );
        return notes as Note[];
    }
    catch(err){
        console.log(err);
        return undefined;
    }
    
}


export async function getNote(uuid: string): Promise<Note> {
    try {
        return await FileManager.read(uuid);
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}
import { Note } from "../interfaces/NoteStructure";
import { FileManager } from "../utils/FileManager";

export async function createNote(title:string = "", labels:string[] = [], context:string = ""):Promise<string> {
    let newNote: Note = {
        note_id: await FileManager.generateUniqueUUID(FileManager._PATH),
        last_edit_time: Date.now(),
        title: title,
        labels: labels,
        context: context,
    }

    try{
        const fileName = `${newNote.note_id}.json`
        await FileManager.write(fileName, newNote);
        return newNote.note_id;
    }
    catch(err){
        console.error(err);
        return undefined;
    }
}

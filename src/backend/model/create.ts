import * as NoteStructure from "../interfaces/NoteStructure";
import * as FileManager from "../utils/FileManager"

export function createNote(title:string = "", labels:string[] = [], context:string = ""):string {
    let newNote: NoteStructure.Note = {
        note_id: FileManager.FileManager.generateUniqueUUID(""),
        last_edit_time: Date.now(),
        title: title,
        labels: labels,
        context: context,
    }
    FileManager.FileManager.write(newNote.note_id, newNote);
    return newNote.note_id;
}

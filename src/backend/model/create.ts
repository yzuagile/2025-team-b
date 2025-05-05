import * as NoteStructure from "../interfaces/NoteStructure";
import * as FileManager from "../utils/FileManager"

export function createNote():string {
    let newNote: NoteStructure.Note = {
        note_id: FileManager.FileManager.generateUniqueUUID(""),
        last_edit_time: Date.now(),
        title: "",
        labels: [],
        context: "",
    }
    FileManager.FileManager.write(newNote.note_id, newNote);
    return newNote.note_id;
}

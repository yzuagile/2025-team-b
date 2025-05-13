import { FileManager } from "../utils/FileManager"

export function createNote():string {
    let newNote: Note = {
        note_id: FileManager.generateUniqueUUID(""),
        last_edit_time: Date.now(),
        title: "",
        labels: [],
        context: "",
    }
    FileManager.write(newNote.note_id, newNote);
    return newNote.note_id;
}

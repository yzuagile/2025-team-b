import * as NoteStructure from "../interfaces/NoteStructure";
import * as FileManager from "../utils/FileManager"

export async function updateTimeStamp(uuid: string) {

    const fileName = `${uuid}.json`
    let note = await FileManager.FileManager.read(fileName) as NoteStructure.Note;


    note.last_edit_time = Date.now();
    await FileManager.FileManager.write(fileName, note);
}
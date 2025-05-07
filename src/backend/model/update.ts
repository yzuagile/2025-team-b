import * as NoteStructure from "../interfaces/NoteStructure";
import * as FileManager from "../utils/FileManager"

import * as fs from "fs";
import * as path from "path";

export async function updateTimeStamp(uuid: string) {

    const fileName = `${uuid}.json`
    let note = await FileManager.FileManager.read(fileName);


    note.last_edit_time = Date.now();
    await FileManager.FileManager.write(fileName, note);
}
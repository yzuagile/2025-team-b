import { Note, ResultType } from "../interfaces/NoteStructure";
import { FileManager } from "../utils/FileManager";

import * as fs from "fs";
import * as path from "path";

export async function updateTimeStamp(uuid: string):Promise<ResultType<boolean>> {
    const fileName = `${uuid}.json`;
    let success = false;
    let err = null;
    try {
        let note = await FileManager.read(fileName);
        note.last_edit_time = Date.now();
        await FileManager.write(fileName, note);

    }
    catch(e) {
        err = e;
        return [success, err] as ResultType<boolean>;
    };
    success = true;
    return [success, err] as ResultType<boolean>;
}

export async function updateNote(uuid: string, note: Note) {
    const fileName = `${uuid}.json`
    updateTimeStamp(uuid);
    await FileManager.write(fileName, note);
}

export async function updateTitle(uuid: string, title:string) {

    const fileName = `${uuid}.json`
    let note = await FileManager.read(fileName);
    note.title = title;
    updateTimeStamp(uuid);
    await FileManager.write(fileName, note);
}

export async function updateLabels(uuid: string, newLabels: string[]) {
    const fileName = `${uuid}.json`
    let note = await FileManager.read(fileName);
    let temp = new Set(note.labels.concat(newLabels));
    note.labels = Array.from(temp);
    updateTimeStamp(uuid);

    await FileManager.write(fileName, note);
}
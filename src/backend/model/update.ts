import * as NoteStructure from "../interfaces/NoteStructure";
import * as FileManager from "../utils/FileManager"

import * as fs from "fs";
import * as path from "path";

function updateTimeStamp(uuid: string) {
    const filePath = path.join(FileManager.FileManager._PATH, `${uuid}.json`);
    let note = FileManager.FileManager.read(filePath);
    // ... promise 還不會寫
}
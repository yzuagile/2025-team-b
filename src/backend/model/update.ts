import { Note, ResultType } from "../interfaces/NoteStructure";
import { FileManager } from "../utils/FileManager";

import * as fs from "fs";
import * as path from "path";

export async function updateTimeStamp(uuid: string):Promise<boolean> {
    
    const fileName = `${uuid}.json`;
    try {
        let note = await FileManager.read(fileName) as Note;
        note.last_edit_time = Date.now();
        await FileManager.write(fileName, note);
        return true;
    }
    catch(e) {
        
        console.log(e);
        return false;
    };
}

export async function updateNote(uuid: string, note: Note):Promise<boolean> {
    const fileName = `${uuid}.json`
    try {

        await FileManager.write(fileName, note);
        return true;
    }
    catch(e) {
        
        console.log(e);
        return false;
    };
}

export async function updateTitle(uuid: string, title:string) {

    const fileName = `${uuid}.json`
    try {
        let note = await FileManager.read(fileName) as Note;
        note.title = title;
        await FileManager.write(fileName, note);
        return true;
    }
    catch(e) {
        
        console.log(e);
        return false;
    };
}

export async function updateLabels(uuid: string, newLabels: string[]) {
    
    const fileName = `${uuid}.json`
    try{
        let note = await FileManager.read(fileName)as Note;
        let temp = new Set(note.labels.concat(newLabels)) ;
        
        note.labels = Array.from(temp);

        await FileManager.write(fileName, note);

        return true;
    }
    catch(err){

        console.log(err);
        return false;
    }
}

export async function updateContext(uuid:string, context:string) {
    
    const fileName = `${uuid}.json`
    try {
        let note = await FileManager.read(fileName) as Note;
        note.context = context;
        await FileManager.write(fileName, note);
        return true;
    }
    catch(e) {
        
        console.log(e);
        return false;
    };
}
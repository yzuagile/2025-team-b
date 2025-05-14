import { updateTimeStamp } from '../model/update';
import { getAllNotes } from '../model/get';
import { Note } from '../interfaces/NoteStructure';

export class RecentlyController {


    constructor() {

    }

    public async updateEditedNote(uuid: string): Promise<boolean> {

        let result = await updateTimeStamp(uuid);
        return result;
    }

    public async getRecentlyEditedNotes(): Promise<Note[]> {
        /*
        * 回傳排序最近使用時間（由近到久）後的 Note
        */

        const notes = await getAllNotes();

        if(notes === undefined)
            return undefined
        
        const sortedNotesByTime = notes.sort((a, b) => b.last_edit_time - a.last_edit_time);
        return sortedNotesByTime;

    }
}
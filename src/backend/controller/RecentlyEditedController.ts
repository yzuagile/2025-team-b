import { updateTimeStamp } from '../model/update';
import { getAllNotes } from '../model/get';

export class RecentlyController {


    constructor() {

    }

    public async updateEditedNote(uuid: string): Promise<void> {

        try {
            await updateTimeStamp(uuid);
        }
        catch (err) {

            throw err;
        }
    }

    public async getRecentlyEditedNotes(): Promise<Note[]> {
        /*
        * 回傳排序最近使用時間（由近到久）後的 Note
        */

        const notes = await getAllNotes();
        const sortedNotesByTime = notes.sort((a, b) => b.last_edit_time - a.last_edit_time);
        return sortedNotesByTime;

    }
}
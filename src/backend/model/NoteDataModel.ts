
export class NoteDataModel implements DataModelInterface {

    private notes: Record<number, OtherDataInfo>;

    constructor() {
        
    }

    getAllNotes(): Record<number, OtherDataInfo> {

        // return deep copy of data
        return JSON.parse(JSON.stringify(this.notes));
    }

    updateNoteTimestamp(note_id: number): void {
        
        // note_id 不存在時拋出例外
        if (!this.notes.hasOwnProperty(note_id)) {
            throw new Error(`Note id ${note_id} does not exist`);
        }
        
        // 取得當下的時間作為最近編輯時間
        this.notes[note_id].last_edit_time = Date.now();
    }
}
interface DataModelInterface {
    getAllNotes(): Record<number, OtherDataInfo>;
    updateNoteTimestamp(note_id: number): void;
    getOtherData(note_id:number):OtherDataInfo;
    addOtherData(data:OtherDataInfo):number;
    isIdExist(note_id:number):boolean;
}

export class NoteDataModel implements DataModelInterface {

    private notes: Record<number, OtherDataInfo>;

    constructor() {
        
    }
    
    isIdExist(note_id:number):boolean{

        if (this.notes.hasOwnProperty(note_id)){
            return true;
        }
        else{
            return false;
        }
    }
    getAllNotes(): Record<number, OtherDataInfo> {

        // return deep copy of data
        return JSON.parse(JSON.stringify(this.notes));
    }

    updateNoteTimestamp(note_id: number): void {
        
        // note_id 不存在時拋出例外
        if (!this.isIdExist(note_id)) {
            throw new Error(`Note id ${note_id} does not exist`);
        }
        
        // 取得當下的時間作為最近編輯時間
        this.notes[note_id].last_edit_time = Date.now();
    }

    getOtherData(note_id: number): OtherDataInfo {
        
        if (!this.isIdExist(note_id)) {
            throw new Error(`Note id ${note_id} does not exist`);
        }

        return JSON.parse(JSON.stringify(this.notes[note_id]));
    }

    addOtherData(data:OtherDataInfo):number{

        /*
         * 新增物件後傳回該物件資料的 id 
         */

        const new_note_id = Object.keys(this.notes).length;

        this.notes[new_note_id] = data;

        return new_note_id;
    }
}
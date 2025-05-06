// import { NoteDataModel } from "../model/NoteDataModel";

// export class RecentlyController{

//     private DataModel:NoteDataModel;

//     constructor(){
//         // 用 mock 的方式先模擬 data model 的資料
//         this.DataModel = new NoteDataModel();
//     }

//     public updateEditedNote(note_id:number):void{

//         try{
//             this.DataModel.updateNoteTimestamp(note_id);
//         }
//         catch (err){
            
//             throw err;
//         }
//     }

//     public getRecentlyEditedNotes(): string[] {
//         /*
//         * 回傳排序最近使用時間（由近到久）後的 檔案名稱
//         */ 

//         const notes = this.DataModel.getAllNotes();
        
//         const sortedNotesByTime = Object.values(notes).sort((a, b) => {
//             return b.last_edit_time - a.last_edit_time;
//         });
        
//         return sortedNotesByTime.map(note => note.content_file_name)
//     }
// }
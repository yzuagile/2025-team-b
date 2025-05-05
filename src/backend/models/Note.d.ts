export interface NoteOtherData {
    // 筆記的Id
    readonly note_id: number;
    // 筆記對應的md檔案名稱
    readonly content_file_name: string;

    // 自 1970/01/01 00:00:00 UTC 起經過的毫秒數
    last_edit_time: number;
    // Note的Title
    title: string;
    // Note擁有的標籤
    labels: string[];
}

// { note_id: NoteOtherDataInfo }
export type NoteOtherDataTable = Record<number, NoteOtherData>;
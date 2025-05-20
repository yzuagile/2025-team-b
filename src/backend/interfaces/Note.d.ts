declare interface Note {
    // 筆記的Id
    readonly note_id: string;
    // 筆記對應的md檔案名稱
    // readonly content_file_name: string;

    // 自 1970/01/01 00:00:00 UTC 起經過的毫秒數
    last_edit_time: number;
    // Note的Title
    title: string;
    // Note擁有的標籤
    labels: string[];
    context: string;
    // fileManage: FileManager;
    // constructor(note_id: number, last_edit_time: number, title: string = "") {
    //     this.note_id = note_id;
    //     this.last_edit_time = last_edit_time;
    //     this.title = title; // 預設為空字串
    //     this.labels = []; // 預設為空陣列
    //     this.context = ""; // 預設為空字串
    //     this.fileManage = new FileManager(); // 初始化 FileManager
    // }
}
declare type ResultType<T> = [T, Error | null];
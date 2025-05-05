import { FileManager } from "../utils/FileManager";
import { NoteOtherData, NoteOtherDataTable } from "./Note.d";

const OTHER_DATA_PATH = './data/NoteOtherData.json';

export class Note {

    readonly id: number;

    constructor(id: number) {
        this.id = id;
    }

    async getOtherData(): Promise<NoteOtherData | undefined> {
        const result = await FileManager.read(OTHER_DATA_PATH);
        const formatDataTable = JSON.parse(result) as NoteOtherDataTable;
        return formatDataTable[this.id];
    }
}
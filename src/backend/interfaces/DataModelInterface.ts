interface DataModelInterface {
    getAllNotes(): Record<number, OtherDataInfo>;
    updateNoteTimestamp(note_id: number): void;
}
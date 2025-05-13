import * as getNote from "../model/get";

export async function showTitle(uuid: string): Promise<string> {
    try {
        const note = await getNote.getNote(uuid);
        if (!note) {
            throw new Error("Note not found");
        }
        if (!note.title || note.title.trim() === "") {
            throw new Error("Note title is empty or only whitespace");
        }
        return note.title;
    }
    catch (error) {
        if (error instanceof Error && error.message === "Database error") {
            throw new Error("Failed to fetch note");
        }
        throw error;
    }
}
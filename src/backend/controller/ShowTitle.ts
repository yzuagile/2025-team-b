import { getNote } from "../model/get";

export async function showTitle(uuid: string): Promise<string> {
    try {
        const note = await getNote(uuid);
        if (!note) {
            console.error("Note not found");
            return;
        }
        return note.title;
    }
    catch (error) {
        console.error("Error fetching");
    }
}
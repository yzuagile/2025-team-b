import { FileManager } from "../utils/FileManager"

export async function updateTimeStamp(uuid: string) {

    const fileName = `${uuid}.json`
    let note = await FileManager.read<Note>(fileName);


    note.last_edit_time = Date.now();
    await FileManager.write(fileName, note);
}
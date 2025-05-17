
import { Note } from "../src/backend/interfaces/Note";
import { FileManager } from "../src/backend/utils/FileManager";
import { NOTE_TEST_DATA } from "./TestData"
import * as fs from 'fs';
import * as path from 'path';
const mock = require('mock-fs');

describe("test FileManager", () => {

    beforeEach(() => {
       mock({
            [FileManager._PATH]: {}
        });
    });

    afterEach(() => {
        mock.restore();
    });

    test('write data', async () => {

        // given
        const fileName = `${NOTE_TEST_DATA[0].note_id}.json`;
        const writeData = NOTE_TEST_DATA[0];

        // when
        await FileManager.write(fileName, writeData);

        // expected
        const filePath = path.join(FileManager._PATH, fileName);
        const data = await fs.promises.readFile(filePath, 'utf-8');
        expect(writeData).toEqual(JSON.parse(data));

    });

    test('read data', async () => {

        // given
        const fileName = `${NOTE_TEST_DATA[0].note_id}.json`;
        const writeData = NOTE_TEST_DATA[0];
        await FileManager.write(fileName, writeData);

        // when
        const data = await FileManager.read(fileName) as Note;

        // expected
        expect(data).toEqual(writeData);
    });

    test("generateUniqueUUID", async () => {

        // given
        const allFileNames = fs.readdirSync(FileManager._PATH);

        // when
        const newUUID = await FileManager.generateUniqueUUID(FileManager._PATH);

        // expect
        const newUUIDIndexInAllFiles = allFileNames.indexOf(`${newUUID}.json`)
        expect(newUUIDIndexInAllFiles).toBe(-1);
        expect(typeof newUUID).toBe("string");

    })

    test("getAllFileNames", async () => {

        // given
        let allFileNames:string[] = [];
        for(let note of NOTE_TEST_DATA){
            await FileManager.write(`${note.note_id}.json`, note);
            allFileNames.push(`${note.note_id}.json`);
        }
        
        // when
        const returnAllFileNames = await FileManager.getAllFileNames();

        // expect
        expect(returnAllFileNames.sort()).toEqual(allFileNames.sort())
    })
})
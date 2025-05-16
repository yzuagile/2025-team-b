import { NOTE_TEST_DATA } from "./TestData"
import { createNote } from "../src/backend/model/create"
import { Note } from "../src/backend/interfaces/Note"
import { FileManager } from "../src/backend/utils/FileManager"


describe("test create service", () => {

    let Temp_Data: Note[] = NOTE_TEST_DATA;

    beforeEach(() => {
        jest.clearAllMocks();

        jest.spyOn(FileManager, "generateUniqueUUID").mockResolvedValue("xxx123xxx");

        jest.spyOn(FileManager, "write").mockImplementation((fileName: string, content: unknown) => {
            const uuid = fileName.replace(/\.json$/, '');
            const index = Temp_Data.findIndex(note => note.note_id === uuid);
            if(index != -1){
                Temp_Data[index] = { ...Temp_Data[index], ...content as Note };
            }
            else{
                Temp_Data.push(content as Note);
            }
            return Promise.resolve();
        });
    });

    afterEach(() => {
        Temp_Data = NOTE_TEST_DATA;
    })

    describe("test createNote", () => {

        it("createNote should return created note id if create successfully", async () => {

            // given
            const title: string = "test title";
            const labels: string[] = ["label"]
            const context: string = "#h1"

            // when
            const newNoteId = await createNote(title, labels, context);

            // expect
            const isNoteInFiles = Temp_Data.some(n => n.note_id === newNoteId);
            expect(isNoteInFiles).toBe(true);
        })

        it("createNote should return undefine when there is a exception occur", async ()=>{

            // given
            (FileManager.write as jest.Mock).mockRejectedValue(new Error("write fail"));
            const title: string = "test title";
            const labels: string[] = ["label"]
            const context: string = "#h1"

            // when
            const newNoteId = await createNote(title, labels, context);

            // expect
            expect(newNoteId).toBe(undefined);

        })
    })
})
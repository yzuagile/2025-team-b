jest.mock("../backend/utils/FileManager");
jest.mock("../backend/model/find.ts");

import { FileManager } from "../backend/utils/FileManager";
import { updateTimeStamp, updateNote, updateTitle, updateLabels, updateContext } from "../backend/model/update";
import { NOTE_TEST_DATA } from "./TestData";
import * as find from "../backend/model/find";



describe("test update services", () => {

    let Temp_Data: Note[] = NOTE_TEST_DATA;

    beforeEach(() => {
        jest.clearAllMocks();

        jest.spyOn(FileManager, "read").mockImplementation((fileName: string) => {

            const uuid = fileName.replace(/\.json$/, '');
            const note = Temp_Data.find(n => n.note_id === uuid);
            if (note) return Promise.resolve(note);
            throw new Error("file not exist");
        })

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

    afterEach(()=>{
        Temp_Data = NOTE_TEST_DATA;
    })

    describe("test updateTimeStep()", () => {

        it("updateTimeStamp should return true if update Time step successfully", async () => {

            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            const targetNote = Temp_Data[0];
            const originalTimestamp = targetNote.last_edit_time;

            // when 
            let success = await updateTimeStamp(targetNote.note_id);

            // expected
            expect(success).toBe(true);
            expect(FileManager.read).toHaveBeenCalledTimes(1);
            expect(FileManager.write).toHaveBeenCalledTimes(1);
            expect(Temp_Data[0].last_edit_time).not.toBe(originalTimestamp);
        });

        it("updateTimeStamp should return false if file not exist", async () => {

            // given
            (find.idExist as jest.Mock).mockReturnValue(false);
            const query_id = "123"

            // when 
            let success = await updateTimeStamp(query_id);

            // expected
            expect(success).toBe(false);
            expect(FileManager.read).toHaveBeenCalledTimes(0);
            expect(FileManager.write).toHaveBeenCalledTimes(0);

        })

        it("updateTimeStamp should return false if FileManager.read throw exception", async () => {

            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            (FileManager.read as jest.Mock).mockRejectedValue(new Error("read fail"));

            // when 
            let success = await updateTimeStamp(Temp_Data[0].note_id);

            // expected
            expect(success).toBe(false);

        })

        it("updateTimeStamp should return false if FileManager.write throw exception", async () => {

            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            (FileManager.read as jest.Mock).mockRejectedValue(new Error("write fail"));

            // when 
            let success = await updateTimeStamp(Temp_Data[0].note_id);

            // expected
            expect(success).toBe(false);

        })

    })

    describe("test updateNote", () => {

        it("updateMote should return true if update Note successfully", async () => {

            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            const originalNote = Temp_Data[0];
            const newNote = Temp_Data[1];

            // when
            const result = await updateNote(originalNote.note_id, newNote);

            // expected
            expect(result).toBe(true);
            expect(FileManager.write).toHaveBeenCalledTimes(1);
            expect(Temp_Data[0]).toEqual(newNote);

        })

        it("updateNote should return false if update Note id not exist", async () => {

            // given
            (find.idExist as jest.Mock).mockReturnValue(false);
            const query_id = "123"

            // when 
            let success = await updateTimeStamp(query_id);

            // expected
            expect(success).toBe(false);
            expect(FileManager.read).toHaveBeenCalledTimes(0);
            expect(FileManager.write).toHaveBeenCalledTimes(0);

        })


        it("updateNote should return false if FileManager.write throw exception", async () => {

            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            (FileManager.write as jest.Mock).mockRejectedValue(new Error("write fail"));

            // when 
            let success = await updateNote(Temp_Data[0].note_id, Temp_Data[1]);

            // expected
            expect(success).toBe(false);

        })
    })


    describe("test updateLabels", () => {

        it("updateLabels should return true if update successfully", async () => {

            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            const originalNote = Temp_Data[0];
            const newLabels = ["new_label1", "new_label2"];

            // when
            const result = await updateLabels(originalNote.note_id, newLabels);

            // expected
            expect(result).toBe(true);
            expect(FileManager.read).toHaveBeenCalledTimes(1);
            expect(FileManager.write).toHaveBeenCalledTimes(1);
            expect(Temp_Data[0].labels).toEqual(newLabels);

        })


        it("updateLabels should return false if note not exist", async () => {
            
            // given
            (find.idExist as jest.Mock).mockReturnValue(false);
            const query_id = "123";
            const newLabels = ["新標籤1", "新標籤2"];

            // when
            const result = await updateLabels(query_id, newLabels);

            // expected
            expect(result).toBe(false);
            expect(FileManager.read).toHaveBeenCalledTimes(0);
            expect(FileManager.write).toHaveBeenCalledTimes(0);
        });

        it("updateLabels should return false if FileManager.read fail", async () => {
            
            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            (FileManager.read as jest.Mock).mockImplementation(() => {
                throw new Error("read fail");
            });

            // when
            const result = await updateLabels(Temp_Data[0].note_id, ["新標籤"]);

            // expected
            expect(result).toBe(false);
        });

        it("updateLabels should return false if FileManager.write fail", async () => {
            
            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            (FileManager.write as jest.Mock).mockImplementation(() => {
                throw new Error("write fail");
            });

            // when
            const result = await updateLabels(Temp_Data[0].note_id, ["新標籤"]);

            // expected
            expect(result).toBe(false);
        });
    })

    describe("test updateTitle", ()=>{

        it("updateTitle should return true if update successfully", async () => {

            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            const originalNote = Temp_Data[0];
            const newTile = "Test tile";

            // when
            const result = await updateTitle(originalNote.note_id, newTile);

            // expected
            expect(result).toBe(true);
            expect(FileManager.read).toHaveBeenCalledTimes(1);
            expect(FileManager.write).toHaveBeenCalledTimes(1);
            expect(Temp_Data[0].title).toEqual(newTile);

        })


        it("updateTitle should return false if note not exist", async () => {
            
            // given
            (find.idExist as jest.Mock).mockReturnValue(false);
            const query_id = "123";
            const newTile = "Test tile";

            // when
            const result = await updateTitle(query_id, newTile);

            // expected
            expect(result).toBe(false);
            expect(FileManager.read).toHaveBeenCalledTimes(0);
            expect(FileManager.write).toHaveBeenCalledTimes(0);
        });

        it("updateTitle should return false if FileManager.read fail", async () => {
            
            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            (FileManager.read as jest.Mock).mockImplementation(() => {
                throw new Error("read fail");
            });
            const newTile = "Test tile";

            // when
            const result = await updateTitle(Temp_Data[0].note_id, newTile);

            // expected
            expect(result).toBe(false);
        });

        it("updateTitle should return false if FileManager.write fail", async () => {
            
            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            (FileManager.write as jest.Mock).mockImplementation(() => {
                throw new Error("write fail");
            });
            const newTile = "Test tile";

            // when
            const result = await updateTitle(Temp_Data[0].note_id, newTile);

            // expected
            expect(result).toBe(false);
        });
    })

    describe("test updateContext", ()=>{

        it("updateContext should return true if update successfully", async () => {

            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            const originalNote = Temp_Data[0];
            const newContext = "Test context";

            // when
            const result = await updateContext(originalNote.note_id, newContext);

            // expected
            expect(result).toBe(true);
            expect(FileManager.read).toHaveBeenCalledTimes(1);
            expect(FileManager.write).toHaveBeenCalledTimes(1);
            expect(Temp_Data[0].context).toEqual(newContext);

        })


        it("updateContext should return false if note not exist", async () => {
            
            // given
            (find.idExist as jest.Mock).mockReturnValue(false);
            const query_id = "123";
            const newContext = "Test context";

            // when
            const result = await updateContext(query_id, newContext);

            // expected
            expect(result).toBe(false);
            expect(FileManager.read).toHaveBeenCalledTimes(0);
            expect(FileManager.write).toHaveBeenCalledTimes(0);
        });

        it("updateContext should return false if FileManager.read fail", async () => {
            
            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            (FileManager.read as jest.Mock).mockImplementation(() => {
                throw new Error("read fail");
            });
            const newContext = "Test context";

            // when
            const result = await updateContext(Temp_Data[0].note_id, newContext);

            // expected
            expect(result).toBe(false);
        });

        it("updateContext should return false if FileManager.write fail", async () => {
            
            // given
            (find.idExist as jest.Mock).mockReturnValue(true);
            (FileManager.write as jest.Mock).mockImplementation(() => {
                throw new Error("write fail");
            });
            const newContext = "Test context";

            // when
            const result = await updateContext(Temp_Data[0].note_id, newContext);

            // expected
            expect(result).toBe(false);
        });
    })

})

jest.mock("../backend/utils/FileManager");

import { getAllNotes, getNote } from '../backend/model/get'
import { NOTE_TEST_DATA } from './TestData';
import { FileManager } from '../backend/utils/FileManager'


describe("data model get service", () => {
  beforeEach(() => {
    // 清除所有 mock
    jest.clearAllMocks();
  });

  it("getAllNotes() should return all notes", async () => {
    // Mock FileManager.getAllFileNames
    (FileManager.getAllFileNames as jest.Mock).mockResolvedValue(["1.json", "2.json"]);
    // Mock FileManager.read
    (FileManager.read as jest.Mock).mockImplementation((fileName: string) => {
      if (fileName === "1.json") return Promise.resolve(NOTE_TEST_DATA[0]);
      if (fileName === "2.json") return Promise.resolve(NOTE_TEST_DATA[1]);
    });

    const notes = await getAllNotes();
    expect(FileManager.getAllFileNames).toHaveBeenCalledTimes(1);
    expect(notes).toHaveLength(2);
    expect(notes[0].title).toBe("Test Note 1");
    expect(notes[1].title).toBe("Test Note 2");
  });

  it("getAllNotes() should return empty array when no files exist", async () => {
    (FileManager.getAllFileNames as jest.Mock).mockResolvedValue([]);

    const notes = await getAllNotes();
    expect(FileManager.getAllFileNames).toHaveBeenCalledTimes(1);
    expect(notes).toHaveLength(0);
  });

  it("getNote should return a single note by uuid", async () => {
    (FileManager.read as jest.Mock).mockResolvedValue(NOTE_TEST_DATA[0]);

    const note = await getNote("1.json");

    expect(FileManager.read).toHaveBeenCalledTimes(1);
    expect(note.note_id).toBe("1");
    expect(note.title).toBe("Test Note 1");
  });

  it("getNote should return undefined when file read fails", async () => {

    const mockFileName = "not-exist.json";
    (FileManager.read as jest.Mock).mockRejectedValueOnce(
      new Error(`File : ${mockFileName} not found`)
    );

    const note = await getNote(mockFileName);

    expect(FileManager.read).toHaveBeenCalledWith(mockFileName);
    expect(note).toBeUndefined();
  });
});

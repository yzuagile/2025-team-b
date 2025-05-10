jest.mock("../src/backend/utils/FileManager");

import {getAllNotes, getNote} from '../src/backend/model/get'
import { NOTE_TEST_DATA } from './TestData';
import { FileManager } from '../src/backend/utils/FileManager'

// Mock FileManager



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

  it("getNote should handle non-existent file gracefully", async () => {

    // given
    const mockFileName = "not-exist.json";
    // 模擬找不到檔案時 read 回傳拋錯
    (FileManager.read as jest.Mock).mockRejectedValueOnce(new Error(`File : ${mockFileName} not found`))

    // expected
    await expect(getNote(mockFileName)).rejects.toThrow(`File : ${mockFileName} not found`);
  });
});

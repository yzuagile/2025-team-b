import { NOTE_TEST_DATA } from "./TestData";
import { createNote } from "../backend/model/create";
import { FileManager } from "../backend/utils/FileManager";

describe("createNote", () => {
  // 每次都用深拷貝確保資料乾淨
  let Temp_Data: Note[];

  beforeEach(() => {
    Temp_Data = structuredClone(NOTE_TEST_DATA);

    jest.clearAllMocks();

    // 1. 偽造 UUID
    jest
      .spyOn(FileManager, "generateUniqueUUID")
      .mockResolvedValue("xxx123xxx");

    // 2. 偽造寫檔：成功 → push；失敗個別 case 再覆寫
    jest
      .spyOn(FileManager, "write")
      .mockImplementation((_fileName: string, content: unknown) => {
        Temp_Data.push(content as Note);
        return Promise.resolve();
      });
  });

  it("寫入成功時應回傳 note_id", async () => {
    const noteId = await createNote("標題", ["label"], "# h1");
    expect(noteId).toBe("xxx123xxx");
    expect(Temp_Data.some((n) => n.note_id === "xxx123xxx")).toBe(true);
  });

  it("寫入失敗時應回傳 undefined", async () => {
    // 只針對此 case 把 write 變成 reject
    (FileManager.write as jest.Mock).mockRejectedValueOnce(
      new Error("write fail"),
    );

    const noteId = await createNote("標題", ["label"], "# h1");
    expect(noteId).toBeUndefined();
  });
});

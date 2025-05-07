jest.mock("../src/backend/utils/FileManager");


import { RecentlyController } from "../src/backend/controller/RecentlyEditedController";
import { FileManager } from "../src/backend/utils/FileManager";
import {NOTE_TEST_DATA} from "./TestData"

describe("RecentlyController", () => {
  let controller: RecentlyController;

  beforeEach(() => {
    controller = new RecentlyController();
    // mock getAllFileNames 和 read
    (FileManager.getAllFileNames as jest.Mock).mockResolvedValue(
      NOTE_TEST_DATA.map(note => `${note.note_id}.json`)
    );
    (FileManager.read as jest.Mock).mockImplementation(async (fileName: string) => {
      const note = NOTE_TEST_DATA.find(n => `${n.note_id}.json` === fileName);
      if (!note) throw new Error(`File : ${fileName} not found`);
      return note;
    });
  });

  describe("updateEditedNote", () => {
    it("should update note timestamp if note exists", async () => {
      await expect(controller.updateEditedNote("1")).resolves.not.toThrow();
      await expect(controller.updateEditedNote("2")).resolves.not.toThrow();
    });

    it("should throw if note does not exist", async () => {

      // given 
      const notExistFileName = "999";
      (FileManager.read as jest.Mock).mockRejectedValueOnce(new Error(`File : ${notExistFileName}.json not found`));
      await expect(controller.updateEditedNote(notExistFileName)).rejects.toThrow(`File : ${notExistFileName}.json not found`);
    });
  });

  describe("getRecentlyEditedNotes", () => {
    it("should return filenames ordered by last_edit_time (newest first)", async () => {

      // given
      const ground_truth = NOTE_TEST_DATA.sort((a, b) => b.last_edit_time - a.last_edit_time);
      
      // when
      const result = await controller.getRecentlyEditedNotes();
      
      // expected
      expect(result).toEqual(ground_truth);
    });
  });
});

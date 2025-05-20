jest.mock("../backend/model/update");
jest.mock("../backend/model/get");

import { RecentlyController } from "../backend/controller/RecentlyEditedController";
import { updateTimeStamp } from "../backend/model/update";
import { getAllNotes } from "../backend/model/get";
import { NOTE_TEST_DATA } from "./TestData";

describe("RecentlyController", () => {
  let controller: RecentlyController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new RecentlyController();
  });

  describe("updateEditedNote", () => {
    it("should return true when updateTimeStamp resolves true", async () => {
      (updateTimeStamp as jest.Mock).mockResolvedValue(true);

      await expect(controller.updateEditedNote("1")).resolves.toBe(true);
      expect(updateTimeStamp).toHaveBeenCalledWith("1");
    });

    it("should return false when updateTimeStamp resolves false", async () => {
      (updateTimeStamp as jest.Mock).mockResolvedValue(false);

      await expect(controller.updateEditedNote("2")).resolves.toBe(false);
      expect(updateTimeStamp).toHaveBeenCalledWith("2");
    });

  });

  describe("getRecentlyEditedNotes", () => {
    it("should return notes sorted by last_edit_time descending", async () => {
      // Prepare a shuffled array of notes

      (getAllNotes as jest.Mock).mockResolvedValue(NOTE_TEST_DATA);

      const expected = NOTE_TEST_DATA.sort(
        (a, b) => b.last_edit_time - a.last_edit_time
      );

      const result = await controller.getRecentlyEditedNotes();

      expect(getAllNotes).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expected);
    });

    it("should return empty array when getAllNotes returns empty array", async () => {
      (getAllNotes as jest.Mock).mockResolvedValue([]);

      const result = await controller.getRecentlyEditedNotes();

      expect(getAllNotes).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });

    it("should return undefined when getAllNotes returns undefined", async () => {
      (getAllNotes as jest.Mock).mockResolvedValue(undefined);

      const result = await controller.getRecentlyEditedNotes();

      expect(getAllNotes).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });
});
import { RecentlyController } from "../src/backend/controller/RecentlyEditedController";
import { NoteDataModel } from "../src/backend/model/NoteDataModel";

jest.mock("../src/backend/model/NoteDataModel", () => {
  class MockNoteDataModel {
    private notes: Record<number, OtherDataInfo> = {
      0: {
        note_id: 0,
        content_file_name: "note1.md",
        last_edit_time: new Date("2024-01-01").getTime(),
        title: "First Note",
        labels: ["work"],
      },
      1: {
        note_id: 1,
        content_file_name: "note2.md",
        last_edit_time: new Date("2024-01-03").getTime(),
        title: "Second Note",
        labels: ["personal"],
      },
    };

    getAllNotes(): Record<number, OtherDataInfo> {
      // return deep copy of data
      return JSON.parse(JSON.stringify(this.notes));
    }

    updateNoteTimestamp(note_id: number): void {
      // note_id 不存在時拋出例外
      if (!this.notes.hasOwnProperty(note_id)) {
        throw Error(`Note id ${note_id} does not exist`);
      }

      this.notes[note_id].last_edit_time = Date.now();
    }
  }

  return { NoteDataModel: MockNoteDataModel };
});

describe("RecentlyController", () => {
  let controller: RecentlyController;

  beforeEach(() => {
    controller = new RecentlyController();
  });

  describe("test updateEditedNote", () => {
    it("test updateEditedNote that notes contain id", () => {
      // given
      let note_id: number;

      // when & expected
      note_id = 0;
      expect(() => controller.updateEditedNote(note_id)).not.toThrow();
      note_id = 1;
      expect(() => controller.updateEditedNote(note_id)).not.toThrow();
    });

    it("should handle non-existent note ID", () => {
      // given
      let note_id: number = 999;

      // when & expected
      expect(() => controller.updateEditedNote(note_id)).toThrow(`Note id ${note_id} does not exist`);
    });
  });

  describe("test getRecentlyEditedNotes", () => {
    it("should return filenames ordered by last_edit_time (newest first)", () => {
      const result = controller.getRecentlyEditedNotes();

      expect(result).toEqual([
        "note2.md", // Newer note first
        "note1.md", // Older note second
      ]);
    });
  });
});

import { showTitle } from '../backend/controller/ShowTitle';
import *as getNote from '../backend/model/get';
import { NOTE_TEST_DATA } from './TestData';

describe("showTitle", () => {
    it("return title of the note", async () => {
        jest.spyOn(getNote, "getNote").mockResolvedValue(NOTE_TEST_DATA[0]);
        const title = await showTitle("1");
        expect(title).toBe("Test Note 1");
    });
    it("throw an error when note is note found", async () => {
        jest.spyOn(getNote, "getNote").mockResolvedValue(null as any);
        await expect(showTitle("1")).rejects.toThrow("Note not found");
    });
    it("throw an error when note title is empty", async () => {
        jest.spyOn(getNote, "getNote").mockResolvedValue({ title: "" } as Note);
        await expect(showTitle("1")).rejects.toThrow("Note title is empty or only whitespace");
    });
    it("throw an error when note title is only whitespace", async () => {
        jest.spyOn(getNote, "getNote").mockResolvedValue({ title: " " } as Note);
        await expect(showTitle("1")).rejects.toThrow("Note title is empty or only whitespace");
    });
    it("throws an error when getNote throws an exception", async () => {
        jest.spyOn(getNote, "getNote").mockRejectedValue(new Error("Database error"));
        await expect(showTitle("1")).rejects.toThrow("Failed to fetch note");
    });
})

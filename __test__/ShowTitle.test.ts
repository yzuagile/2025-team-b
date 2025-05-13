import { showTitle } from '../src/backend/controller/ShowTitle';
import *as getNote from '../src/backend/model/get';
import { NOTE_TEST_DATA } from './TestData';

describe("showTitle", () => {
    it("return title of the note", async () => {
        jest.spyOn(getNote, "getNote").mockResolvedValue(NOTE_TEST_DATA[0]);
        const title = await showTitle("1");
        expect(title).toBe("Test Note 1");
    })
})

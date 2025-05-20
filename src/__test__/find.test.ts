import { idExist } from "../backend/model/find";
import fs from "fs";
import path from "path";

describe("test find service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("test idExist", () => {
    it("should return true if file exists (mocked)", () => {
      const existingFileName = "createTestFile";

      jest.spyOn(fs, "existsSync").mockReturnValue(true);

      const isIdExist = idExist(existingFileName);

      expect(isIdExist).toBe(true);
      const expectedAbsolutePath = path.join(process.cwd(), 'data', `${existingFileName}.json`);
      expect(fs.existsSync).toHaveBeenCalledWith(expectedAbsolutePath);
    });

    it("should return false if file does not exist (mocked)", () => {
      const nonExistingFileName = "nonExistFile";

      jest.spyOn(fs, "existsSync").mockReturnValue(false);


      const isIdExist = idExist(nonExistingFileName);

      expect(isIdExist).toBe(false);
      const expectedAbsolutePath = path.join(process.cwd(), 'data', `${nonExistingFileName}.json`);
      expect(fs.existsSync).toHaveBeenCalledWith(expectedAbsolutePath);
    });
  });
});
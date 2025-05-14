import { idExist } from "../src/backend/model/find";

describe("test find service", ()=>{

    beforeEach(()=>{
        jest.clearAllMocks();
    })

    describe("test idExist", ()=>{
        
        it("should return true if file exist in data", ()=>{

            // given
            const existingFileName = "createTestFile";

            // when
            const isIsIdExist = idExist(existingFileName);

            // expect
            expect(isIsIdExist).toBe(true);
        })

        it("should return false if file exist in data", ()=>{

            // given
            const nonExistingFileName = "nonExistFile";

            // when
            const isIsIdExist = idExist(nonExistingFileName);

            // expect
            expect(isIsIdExist).toBe(false);
        })
    })
})
import { FileManager } from "../src/backend/utils/FileManager";
import { Note } from "../src/backend/models/Note";
import { NoteOtherData, NoteOtherDataTable } from "../src/backend/models/Note.d";

jest.mock('../src/backend/utils/FileManager');

const mockFileManager = FileManager as jest.Mocked<typeof FileManager>;

describe('RW test for NoteOtherData', () => {
    let note: Note;
    const testNoteId = 1;
    const otherDataPath = './data/NoteOtherData.json';

    const samples: NoteOtherDataTable = {
        1: {
            note_id: 1,
            content_file_name: 'note1.md',
            last_edit_time: 1678886400000,
            title: 'Test Note 1',
            labels: ['test', 'example'],
        },
        2: {
            note_id: 2,
            content_file_name: 'note2.md',
            last_edit_time: 1678886500000,
            title: 'Test Note 2',
            labels: ['jest', 'mocking'],
        }
    };
    const sampleStr = JSON.stringify(samples);

    beforeEach(() => {
        mockFileManager.read.mockClear();
        mockFileManager.write.mockClear();

        note = new Note(testNoteId);
    });

    test('it should return NoteOtherData for Note_id = 1', async () => {
        mockFileManager.read.mockResolvedValue(sampleStr);
        const result = await note.getOtherData();

        // 檢查 FileManager.read 是否被呼叫
        expect(mockFileManager.read).toHaveBeenCalledWith(otherDataPath);
        // 檢查 getOtherData 返回值是否對應 samples 當中的 note_id=1
        expect(result).toEqual(samples[testNoteId]);
    });

    test('should return undefined for a non-existing id', async () => {
        const nonExistingId = 99;
        note = new Note(nonExistingId); // non-existing note
    
        mockFileManager.read.mockResolvedValue(sampleStr);

        const result = await note.getOtherData();
    
        // 檢查 FileManager.read 是否被呼叫
        expect(mockFileManager.read).toHaveBeenCalledWith(otherDataPath);
        // is result equil undefined
        expect(result).toBeUndefined();
    });
    
    test('should return undefined when the data file is empty', async () => {

        mockFileManager.read.mockResolvedValue('{}');
        
        const result = await note.getOtherData(); // note has been set in `beforeEach`

        // 檢查 FileManager.read 是否被呼叫
        expect(mockFileManager.read).toHaveBeenCalledWith(otherDataPath);
        expect(result).toBeUndefined();
    });
    
    test('should throw an error if FileManager.read fails', async () => {
        const readError = new Error('Failed to read file');
        mockFileManager.read.mockRejectedValue(readError);  

        // 預期拋出錯誤
        await expect(note.getOtherData()).rejects.toThrow('Failed to read file');
        expect(mockFileManager.read).toHaveBeenCalledWith(otherDataPath);
    });
    
    test('should throw a SyntaxError if the file content is invalid JSON', async () => {
        mockFileManager.read.mockResolvedValue('hello, im not a json string haha');
        
        // 預期拋出錯誤
        await expect(note.getOtherData()).rejects.toThrow(SyntaxError);
        expect(mockFileManager.read).toHaveBeenCalledWith(otherDataPath);
    });


});
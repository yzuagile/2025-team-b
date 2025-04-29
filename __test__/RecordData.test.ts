import { FileManager } from "../src/backend/utils/FileManager";

import * as fs from 'fs';
import * as path from 'path';

describe('Write/Read Data with Normal Json File', () => {
    test('write data', async () => {

        const fileName = 'createTestFile.json';
        const rawData = {
            'steve_uuid': {
                'name': 'Steve',
                'phone': '55688'
            },
            'alex_uuid': {
                'name': 'Alex',
                'phone': '88655'
            }
        };

        await FileManager.write(fileName, rawData);

        const filePath = path.join(FileManager._PATH, fileName);
        
        try {
            const data = await fs.promises.readFile(filePath, 'utf-8');
            expect(data).toEqual(JSON.stringify(rawData));
        } catch (err) { throw err; }
    });

    test('read data', async () => {
        const fileName = 'readTestFile.json';
        const rawData = {
            'steve_uuid': {
                'name': 'Steve',
                'phone': '55688'
            },
            'alex_uuid': {
                'name': 'Alex',
                'phone': '88655'
            }
        };

        try {
            await FileManager.write(fileName, rawData);
            const data = await FileManager.read(fileName);
            expect(data).toEqual(JSON.stringify(rawData));
        } catch(err) { throw err; }
    });
});
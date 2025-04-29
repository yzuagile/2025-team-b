import { returnNumberTwo } from '../src/number_two';

describe('sum 2 number', () => {
    test("should return 2", () => {
        const result = returnNumberTwo();
        expect(result).toBe(2);
    });
});
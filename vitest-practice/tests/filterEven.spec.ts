import { filterEven } from "../src/filterEven";

describe('filterEven', () => {
    it('should return only the even numbers', () => {
        // Arrange
        const input = [1,2,3,4,5,6];
        const expectedOutput = [2,4,6];
        const expectedLength = 3;

        // Act 
        const result = filterEven(input);

        // Assert
        expect(result).toEqual(expectedOutput);
        expect(result).toHaveLength(expectedLength);
    });
    it('should return the same array', () => {
        // Arrange
        const input = [2,4,6];
        const expectedOutput = [2,4,6];
        const expectedLength = 3;

        // Act 
        const result = filterEven(input);

        // Assert
        expect(result).toEqual(expectedOutput);
        expect(result).toHaveLength(expectedLength);
    });
    it('should return empty with odd numbers', () => {
        // Arrange
        const input = [1,3,5];
        const expectedOutput: number[] = [];
        const expectedLength = 0;

        // Act 
        const result = filterEven(input);

        // Assert
        expect(result).toEqual(expectedOutput);
        expect(result).toHaveLength(expectedLength);
    });
    it('should stay empty', () => {
        // Arrange
        const input: number[] = [];
        const expectedOutput: number[] = [];
        const expectedLength = 0;

        // Act 
        const result = filterEven(input);

        // Assert
        expect(result).toEqual(expectedOutput);
        expect(result).toHaveLength(expectedLength);
    });
    it('should 0 as an even number', () => {
        // Arrange
        const input = [0,1,2];
        const expectedOutput = [0,2];
        const expectedLength = 2;

        // Act 
        const result = filterEven(input);

        // Assert
        expect(result).toEqual(expectedOutput);
        expect(result).toHaveLength(expectedLength);
    });
    it('should return odd negatives as odd', () => {
        // Arrange
        const input = [-2,-1,0,1,2];
        const expectedOutput = [-2,0,2];
        const expectedLength = 3;

        // Act 
        const result = filterEven(input);

        // Assert
        expect(result).toEqual(expectedOutput);
        expect(result).toHaveLength(expectedLength);
    });
})
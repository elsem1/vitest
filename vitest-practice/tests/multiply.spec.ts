import { multiply } from "../src/multiply";

describe('multiply function', () => {
    it('should multiply two positive numbers', () => {
        // Arrange
        const firstNumber = 4;
        const secondNumber = 3;
        const expectedResult = 12;

        // Act 
        const result = multiply(firstNumber, secondNumber);

        // Assert
        expect(result).toBe(expectedResult);
    });
    it('should multiply two negative numbers to a positive', () => {
        // Arrange
        const firstNumber = -4;
        const secondNumber = -5;
        const expectedResult = 20;

        // Act 
        const result = multiply(firstNumber, secondNumber);

        // Assert
        expect(result).toBe(expectedResult);
    });
        it('should multiply negative numbers', () => {
        // Arrange
        const firstNumber = -8;
        const secondNumber = 3;
        const expectedResult = -24;

        // Act 
        const result = multiply(firstNumber, secondNumber);

        // Assert
        expect(result).toBe(expectedResult);
    });
        it('should multiply 0 correct', () => {
        // Arrange
        const firstNumber = 5;
        const secondNumber = 0.0000;
        const expectedResult = 0;

        // Act 
        const result = multiply(firstNumber, secondNumber);

        // Assert
        expect(result).toBe(expectedResult);
    });
        it('should multiply floats', () => {
        // Arrange
        const firstNumber = 6;
        const secondNumber = 5.99999999999;
        const expectedResult = 35.99999999994;

        // Act 
        const result = multiply(firstNumber, secondNumber);

        // Assert
        expect(result).toBe(expectedResult);
    });
        it('should multiply big numbers', () => {
        // Arrange
        const firstNumber = 40000000;
        const secondNumber = 1500000;
        const expectedResult = 60000000000000;

        // Act 
        const result = multiply(firstNumber, secondNumber);

        // Assert
        expect(result).toBe(expectedResult);
    });
});
import {add} from '../src/math';

describe('add function', () => {
    it('should add two positive numbers together', () => {
        // Arrange
        const a = 2;
        const b = 4;

        // Act
        const result = add(a, b);

        // Assert
        expect(result).toBe(6);
    });
    it('should add two negative numbers together', () => {
        // Arrange
        const a = -5;
        const b = -14;

        // Act
        const result = add(a, b);

        // Assert
        expect(result).toBe(-19);
    });
    it('should return 0 when adding 0 to 0', () => {
        // Arrange
        const a = 0;
        const b = 0;

        // Act
        const result = add(a, b);

        // Assert
        expect(result).toBe(0);
    });    
    it('should be able to handle very big numbers', () => {
        // Arrange
        const a = 2000000000000000000000000000000000000;
        const b = 4000000000000000000000000000000000000;

        // Act
        const result = add(a, b);

        // Assert
        expect(result).toBe(6000000000000000000000000000000000000);
    });
    it('should be able to add two floats together', () => {
        // Arrange 
        const a = 5.21;
        const b = 2.54;

        // Act 
        const result = add(a, b);

        // Assert
        expect(result).toBe(7.75);
    })
});
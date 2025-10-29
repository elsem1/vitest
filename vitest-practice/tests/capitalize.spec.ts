import { capitalize } from "../src/capitalize";

describe('capitalize', () => {
    it('should return an empty string when there is no input', ()=> {
        // Arrange
        const string = '';
        const expectedReturn = '';

        // Act
        const result = capitalize(string);

        // Assert
        expect(result).toBe(expectedReturn);
    });
    it('should return the same input as output when string starts with capital', ()=> {
        // Arrange
        const string = 'Hello';
        const expectedReturn = 'Hello';

        // Act
        const result = capitalize(string);

        // Assert
        expect(result).toBe(expectedReturn);
    });
    it('should return a string with the first letter capitalized', ()=> {
        // Arrange
        const string = 'hello';
        const expectedReturn = 'Hello';

        // Act
        const result = capitalize(string);

        // Assert
        expect(result).toBe(expectedReturn);
    });
    it('should return the same output with whitespace kept', ()=> {
        // Arrange
        const string = '    ';
        const expectedReturn = '    ';

        // Act
        const result = capitalize(string);

        // Assert
        expect(result).toBe(expectedReturn);
    });
    it('should return same output when string does not start with a letter', ()=> {
        // Arrange
        const string = '123abc';
        const expectedReturn = '123abc';

        // Act
        const result = capitalize(string);

        // Assert
        expect(result).toBe(expectedReturn);
    });
})
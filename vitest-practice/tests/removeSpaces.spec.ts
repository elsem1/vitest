import { removeSpaces } from "../src/removeSpaces";

describe('removeSpaces', ()=> {
    it('should return a string without spaces', () => {
        // Arrange 
        const input = 'Dit is een string met spaties';
        const expectedOutput = 'Ditiseenstringmetspaties';

        // Act 
        const result = removeSpaces(input);

        //Assert
        expect(result).toBe(expectedOutput);
    });
    it('should not modify a spaceless(?) string', () => {
        // Arrange 
        const input = 'Ditiseenstringzonderspaties';
        const expectedOutput = 'Ditiseenstringzonderspaties';

        // Act 
        const result = removeSpaces(input);

        //Assert
        expect(result).toBe(expectedOutput);
    });
    it('should not modify an empty string', () => {
        // Arrange 
        const input = '';
        const expectedOutput = '';

        // Act 
        const result = removeSpaces(input);

        //Assert
        expect(result).toBe(expectedOutput);
    });
    it('should return an empty string when input is spaces only', () => {
        // Arrange 
        const input = '     ';
        const expectedOutput = '';

        // Act 
        const result = removeSpaces(input);

        //Assert
        expect(result).toBe(expectedOutput);
    });
    it('should return with other whitespaces intact', () => {
        // Arrange 
        const input = '     \t  \n  ';
        const expectedOutput = '\t\n';

        // Act 
        const result = removeSpaces(input);

        //Assert
        expect(result).toBe(expectedOutput);
    });

});
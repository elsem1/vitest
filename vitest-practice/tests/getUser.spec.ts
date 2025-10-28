import { getUser } from "../src/getUser";
import { getAllUsers } from "../src/getUser";

const users = getAllUsers();

describe('getUser', () =>{
    it('should return the user matching the id', () =>{
        // Arrange
        const id = 3;
        const expectedResult = users[2];

        // Act 
        const result = getUser(id);

        // Assert
        expect(result).toMatchObject(expectedResult)
    });
    it('should return undefined when user is not found', () =>{
        // Arrange
        const id = NaN;        

        // Act 
        const result = getUser(id);

        // Assert
        expect(result).toBeUndefined();
    });
    it('should not mutate the array length', () =>{   
        // Arrange 
        const id = 0;
        const users = getAllUsers()
        const length = users.length;
        
        // Act 
        getUser(id);
        const result = getAllUsers();        

        // Assert
        expect(result).toMatchObject(users);
        expect(result).toHaveLength(length);
    });
    it('should return undefined when id is a float', () =>{   
        // Arrange 
        const id = 1.5;
                
        // Act 
        const result = getUser(id);              

        // Assert
        expect(result).toBeUndefined();
    });
    it('should return undefined when user is not found', () =>{
        // Arrange
        const id = -1;        

        // Act 
        const result = getUser(id);

        // Assert
        expect(result).toBeUndefined();
    });

})
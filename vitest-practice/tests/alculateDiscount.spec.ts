import { calculateDiscount } from "../src/calculateDiscount";

describe('calculateDiscount', () => {
    it('should throw an error when price is negative', () => {
        // Arrange
        const price = -1;
        const discount = 10;        

        // Act&Assert 
        expect(() => calculateDiscount(price, discount)).toThrow('Price cannot be negative')
    })
})
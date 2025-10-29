import { calculateDiscount } from "../src/calculateDiscount";

describe('calculateDiscount', () => {
    it('should throw an error when price is negative', () => {
        // Arrange
        const price = -50;
        const discount = 10;        

        // Act & Assert 
        expect(() => calculateDiscount(price, discount)).toThrow('Price cannot be negative')
    });
    it('should throw an error when discount is negative', ()=> {
        // Arrange 
        const price = 100;
        const discount = -10;

        // Act & Assert
        expect(() => calculateDiscount(price, discount)).toThrow('Discount must be between 0 and 100');
    });
    it('should throw an error when discount is >100', ()=> {
        // Arrange 
        const price = 100;
        const discount = 150;

        // Act & Assert
        expect(() => calculateDiscount(price, discount)).toThrow('Discount must be between 0 and 100');
    });
    it('should return the discounted price', () => {
        // Arrange
        const price = 100;
        const discount = 20;
        const discountedPrice = 80;

        // Arrange 
        const result = calculateDiscount(price, discount);

        // Assert
        expect(result).toBe(discountedPrice);
    });
    it('should return the same value for the price and discounted price', () => {
        // Arrange
        const price = 50;
        const discount = 0;
        const discountedPrice = 50;

        // Arrange 
        const result = calculateDiscount(price, discount);

        // Assert
        expect(result).toBe(discountedPrice);
    });
    it('should return a discounted price of 0', () => {
        // Arrange
        const price = 100;
        const discount = 100;
        const discountedPrice = 0;

        // Arrange 
        const result = calculateDiscount(price, discount);

        // Assert
        expect(result).toBe(discountedPrice);
    });
    it('should return a discounted price of 0', () => {
        // Arrange
        const price = 0;
        const discount = 20;
        const discountedPrice = 0;

        // Arrange 
        const result = calculateDiscount(price, discount);

        // Assert
        expect(result).toBe(discountedPrice);
    });

})
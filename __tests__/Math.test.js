const math = require("../lib/math.ts").default

describe('math', () => {



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * floor, ceil, trunc and abs
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    describe('abs', () => {
        it('should return the absolute; value of a positive number', () => {
            const result = math.abs(5)
            expect(result).toBe(5);
        });


        it('should return the absolute value of a negative number', () => {
            const result = math.abs(-5);
            expect(result).toBe(5);
        });

        it('should return 0 for 0', () => {
            const result = math.abs(0);
            expect(result).toBe(0);
        });

    });

    describe('floor', () => {
        it('returns the floor value of a positive number', () => {
            expect(math.floor(4.8)).toBe(4);
            expect(math.floor(10)).toBe(10);
            expect(math.floor(0.3)).toBe(0);
        });

        it('returns the floor value of a negative number', () => {
            expect(math.floor(-2.3)).toBe(-3);
            expect(math.floor(-5)).toBe(-5);
            expect(math.floor(-0.6)).toBe(-1);
        });

        it('returns the same value for zero', () => {
            expect(math.floor(0)).toBe(0);
        });
    });

    // Test for the ceil function
    describe('ceil', () => {
        it('returns the ceiling value of a positive number', () => {
            expect(math.ceil(4.8)).toBe(5);
            expect(math.ceil(10)).toBe(10);
            expect(math.ceil(0.3)).toBe(1);
        });

        it('returns the ceiling value of a negative number', () => {
            expect(math.ceil(-2.3)).toBe(-2);
            expect(math.ceil(-5)).toBe(-5);
            expect(math.ceil(-0.6)).toBe(-0);
        });

        it('returns the same value for zero', () => {
            expect(math.ceil(0)).toBe(0);
        });
    });



    describe('trunc', () => {
        it('should truncate positive numbers correctly', () => {
            expect(math.trunc(4.7)).toBe(4);
            expect(math.trunc(10.2)).toBe(10);
            expect(math.trunc(100.9)).toBe(100);
        });

        it('should truncate negative numbers correctly', () => {
            expect(math.trunc(-2.1)).toBe(-2);
            expect(math.trunc(-5.8)).toBe(-5);
            expect(math.trunc(-99.9)).toBe(-99);
        });

        it('should return the same integer for whole numbers', () => {
            expect(math.trunc(0)).toBe(0);
            expect(math.trunc(10)).toBe(10);
            expect(math.trunc(-5)).toBe(-5);
        });
    });


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Fractional operations
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    describe("fracPart", () => {
        it("should return the fractional part of a positive number", () => {
            expect(math.fracPart(1.22)).toBeCloseTo(0.22);
        });

        it("should return the fractional part of a negative number", () => {
            expect(math.fracPart(-3.456)).toBeCloseTo(0.456);
        });

        it("should return 0 for an integer", () => {
            expect(math.fracPart(5)).toBe(0);
        });

        it("should handle numbers with multiple decimal places", () => {
            expect(math.fracPart(2.3456)).toBeCloseTo(0.3456);
        });
    });



    describe('GCD', () => {
        it('should calculate the greatest common divisor', () => {
            expect(math.GCD(12, 8)).toBe(4);
            expect(math.GCD(17, 23)).toBe(1);
            expect(math.GCD(0, 10)).toBe(10);
        });
    });

    describe('LCD', () => {
        it('should calculate the least common divisor', () => {
            expect(math.LCD(12, 8)).toBe(24);
            expect(math.LCD(17, 23)).toBe(391);
            expect(math.LCD(0, 10)).toBe(0);
        });
    });


    describe('toFixedNumber', () => {
        it('should round a number to the specified number of decimal places', () => {
            expect(math.toFixedNumber(3.14159, 2)).toBe(3.14);
            expect(math.toFixedNumber(2.71828, 3)).toBe(2.718);
            expect(math.toFixedNumber(1.23456789, 4)).toBe(1.2346);
        });

        it('should round a number to the specified number of decimal places using a specified base', () => {
            expect(math.toFixedNumber(3.14159, 2, 2)).toBe(3.25);
            expect(math.toFixedNumber(2.71828, 3, 2)).toBe(2.75);
        });
    });




    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Utility methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    describe("countDecimals", () => {
        it("should return 2", () => {
            expect(math.countDecimals(1.22)).toBe(2);
        });

        it("should return 3", () => {
            expect(math.countDecimals(-3.456)).toBe(3);
        });

        it("should return 0 ", () => {
            expect(math.countDecimals(5)).toBe(0);
        });

        it("should return 4", () => {
            expect(math.countDecimals(2.3456)).toBe(4);
        });
    });



    describe('isPowerOfTwo', () => {
        it('Number is a power of two', () => {
            expect(math.isPowerOfTwo(2)).toBe(true);
            expect(math.isPowerOfTwo(4)).toBe(true);
            expect(math.isPowerOfTwo(8)).toBe(true);
        });

        it('Number is not a power of two', () => {
            expect(math.isPowerOfTwo(3)).toBe(false);
            expect(math.isPowerOfTwo(5)).toBe(false);
            expect(math.isPowerOfTwo(9)).toBe(false);
        });
    });

    describe('nextPowerOfTwo', () => {
        it('The next power of two', () => {
            expect(math.nextPowerOfTwo(2)).toBe(2);
            expect(math.nextPowerOfTwo(5)).toBe(8);
            expect(math.nextPowerOfTwo(10)).toBe(16);
        });
    });

    describe('sign', () => {
        it('should return -1 when the number is negative', () => {
            const result = math.sign(-5);
            expect(result).toBe(-1);
        });

        it('should return 0 when the number is zero', () => {
            const result = math.sign(0);
            expect(result).toBe(0);
        });

        it('should return 1 when the number is positive', () => {
            const result = math.sign(5);
            expect(result).toBe(1);
        });
    });


});


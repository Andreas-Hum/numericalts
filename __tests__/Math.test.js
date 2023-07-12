const math = require("../dist/math").default


describe('math', () => {
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
});


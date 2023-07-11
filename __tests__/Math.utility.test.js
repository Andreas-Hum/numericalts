const importings = require("../dist/utils")
const MathUtils = importings.MathUtils


describe('MathUtils', () => {
    describe('isPowerOfTwo', () => {
        it('Number is a power of two', () => {
            expect(MathUtils.isPowerOfTwo(2)).toBe(true);
            expect(MathUtils.isPowerOfTwo(4)).toBe(true);
            expect(MathUtils.isPowerOfTwo(8)).toBe(true);
        });

        it('Number is not a power of two', () => {
            expect(MathUtils.isPowerOfTwo(3)).toBe(false);
            expect(MathUtils.isPowerOfTwo(5)).toBe(false);
            expect(MathUtils.isPowerOfTwo(9)).toBe(false);
        });
    });

    describe('nextPowerOfTwo', () => {
        it('The next power of two', () => {
            expect(MathUtils.nextPowerOfTwo(2)).toBe(2);
            expect(MathUtils.nextPowerOfTwo(5)).toBe(8);
            expect(MathUtils.nextPowerOfTwo(10)).toBe(16);
        });
    });

    describe('toFixedNumber', () => {
        it('should round a number to the specified number of decimal places', () => {
            expect(MathUtils.toFixedNumber(3.14159, 2)).toBe(3.14);
            expect(MathUtils.toFixedNumber(2.71828, 3)).toBe(2.718);
            expect(MathUtils.toFixedNumber(1.23456789, 4)).toBe(1.2346);
        });

        it('should round a number to the specified number of decimal places using a specified base', () => {
            expect(MathUtils.toFixedNumber(3.14159, 2, 2)).toBe(3.25);
            expect(MathUtils.toFixedNumber(2.71828, 3, 2)).toBe(2.75);
        });
    });
});


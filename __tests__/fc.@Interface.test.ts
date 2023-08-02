import fc from 'fast-check';
import { Numerical } from '../src/@interfaces/numerical'; // Replace 'your-module' with the actual module path
import { math } from '../src/math';
// Helper function to check equality within a tolerance for numbers
import { NumericalNumber, NumericalBigInt } from "../src/@numerical.classes";


describe('Numerical interface', () => {
    // Test numerical operations for 'number' type
    test('Numerical operations - number', () => {
        fc.assert(
            fc.property(fc.float({ min: 1, noDefaultInfinity: true, noNaN: true }), fc.float({ min: 1, noDefaultInfinity: true, noNaN: true }), fc.float({ min: 1, noDefaultInfinity: true, noNaN: true }), fc.float({ min: 1, noDefaultInfinity: true, noNaN: true }), fc.float({ min: 1, noDefaultInfinity: true, noNaN: true }), fc.float({ min: 1, noDefaultInfinity: true, noNaN: true }), (a, b, c, d, e, f) => {
                const numerical: Numerical<number> = new NumericalNumber();
                const tolerance = 1e-6; // Tolerance for approximations

                const addResult = numerical.add(a, b);
                const subtractResult = numerical.subtract(c, d);
                const multiplyResult = numerical.multiply(e, f);
                const divideResult = numerical.divide(a, e);

                // Test numerical addition
                expect(math.equal(addResult, a + b)).toBe(true);

                // Test numerical subtraction
                expect(math.equal(subtractResult, c - d)).toBe(true);

                // Test numerical multiplication
                expect(math.equal(multiplyResult, e * f)).toBe(true);

                // Test numerical division
                expect(math.equal(divideResult, a / e)).toBe(true);
            })
        );
    });

    // Test numerical operations for 'bigint' type
    test('Numerical operations - bigint', () => {
        fc.assert(
            fc.property(fc.bigInt({ min: 1n }), fc.bigInt({ min: 1n }), fc.bigInt({ min: 1n }), fc.bigInt({ min: 1n }), fc.bigInt({ min: 1n }), fc.bigInt({ min: 1n }), (a, b, c, d, e, f) => {
                const numerical: Numerical<bigint> = new NumericalBigInt();

                const addResult = numerical.add(a, b);
                const subtractResult = numerical.subtract(c, d);
                const multiplyResult = numerical.multiply(e, f);
                const divideResult = numerical.divide(a, e);

                // Test numerical addition
                expect(addResult).toEqual(a + b);

                // Test numerical subtraction
                expect(subtractResult).toEqual(c - d);

                // Test numerical multiplication
                expect(multiplyResult).toEqual(e * f);

                // Test numerical division
                expect(divideResult).toEqual(a / e);
            })
        );
    });

    // Test conversion functions 'fromIntegral ' and 'toIntegral'
    test('Conversion functions - number to bigint and vice versa', () => {
        fc.assert(
            fc.property(fc.integer(), (num) => {
                const numericalNumber: Numerical<number> = new NumericalNumber();
                const numericalBigInt: Numerical<bigint> = new NumericalBigInt();

                const bigintfromIntegral = numericalBigInt.fromIntegral(num);
                const numberFromBigint = numericalBigInt.toIntegral(bigintfromIntegral);
                numericalNumber.toIntegral(2)
                expect(numberFromBigint).toBe(num);
            })
        );
    });
});
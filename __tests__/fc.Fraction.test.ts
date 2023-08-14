import fc from 'fast-check';
import { Fraction, math } from '../src/index';

describe('Fraction Class', () => {
    describe('Constructor', () => {
        test('Should correctly initialize with numerator and denominator', () => {
            fc.assert(
                fc.property(fc.integer(), fc.integer({ min: 1 }), (numerator, denominator) => {
                    const fraction: Fraction = new Fraction(numerator, denominator);
                    expect(fraction.numerator).toBe(numerator);
                    expect(fraction.denominator).toBe(denominator);
                })
            );
        });

        test('Should correctly parse fraction string', () => {
            fc.assert(
                fc.property(fc.integer({ max: 100 }), fc.integer({ min: 1, max: 100 }), (numerator, denominator) => {
                    const fractionString: string = `${numerator}/${denominator}`;
                    const fraction: Fraction = new Fraction(fractionString);
                    expect(fraction.numerator).toBe(numerator);
                    expect(fraction.denominator).toBe(denominator);
                })
            );
        });

        test('Should throw an error for invalid arguments', () => {
            fc.assert(
                fc.property(fc.string(), (invalidArg) => {
                    expect(() => new Fraction(invalidArg + "sdsasad")).toThrow(Error);
                    //@ts-ignore
                    expect(() => new Fraction(math)).toThrow(Error);
                })
            );
        });
    });

    describe('fromIntegral method', () => {
        test('Should convert an integral number to a fraction', () => {
            fc.assert(
                fc.property(fc.integer(), (number) => {
                    const fraction: Fraction = Fraction.fromIntegral(number);
                    expect(fraction.numerator).toBe(number);
                    expect(fraction.denominator).toBe(1);
                })
            );
        });

        test('Should convert a decimal number to a simplified fraction', () => {
            fc.assert(
                fc.property(fc.float({ noNaN: true, noDefaultInfinity: true }), (number) => {
                    if (!Number.isInteger(number)) {
                        const fraction: Fraction = Fraction.fromIntegral(number);
                        expect(fraction.numerator / fraction.denominator).toBeCloseTo(number, 6);

                    }
                })
            );
        });
    });

    describe('toIntergral method', () => {
        test('Should convert an integral number to a fraction', () => {
            fc.assert(
                fc.property(fc.integer(), (number) => {
                    const fraction: Fraction = Fraction.fromIntegral(number);
                    expect(Fraction.toIntergral(fraction)).toEqual(number)
                })
            );
        });

        test('Should convert a decimal number to a simplified fraction', () => {
            fc.assert(
                fc.property(fc.float({ noNaN: true, noDefaultInfinity: true }), (number) => {
                    if (!Number.isInteger(number)) {
                        const fraction: Fraction = Fraction.fromIntegral(number);
                        expect(Fraction.toIntergral(fraction)).toBeCloseTo(number, 6);

                    }
                })
            );
        });
    });
});

import { Numerical } from './@interfaces/numerical';
import { math } from "./math"


export class Fraction {
    numerator: number;
    denominator: number;


    constructor(fraction: string);
    constructor(numerator: number, denominator: number);
    constructor(a: string | number, b?: number) {
        if (typeof a === 'string') {
            if (!a.includes("/")) throw new Error("Invalid arguments");
            const split: string[] = a.split("/")
            this.numerator = parseFloat(split[0])
            this.denominator = parseFloat(split[1])

            if (Number.isNaN(this.numerator) || Number.isNaN(this.denominator)) throw new Error("Invalid arguments");

        } else if (typeof a === 'number' && typeof b === 'number') {
            this.numerator = a;
            this.denominator = b;
        } else {
            throw new Error("Invalid arguments");
        }
    }



    /**
     * Creates a new Fraction object from an integral number.
     * @param {number} numberValue - The number to convert to a fraction.
     * @returns A new Fraction object representing the number as a fraction.
     * @example
     * const fraction = Fraction.fromIntegral(1.75);
     * console.log(fraction.numerator, fraction.denominator); // Output: 7 4
     */
    static fromIntegral(numberValue: number): Fraction {
        let numerator: number;
        let denominator: number;

        if (Number.isInteger(numberValue)) {
            numerator = numberValue;
            denominator = 1;
        } else {
            const decimalPlaces: number = math.countDecimals(numberValue);
            const powerOf10: number = Math.pow(10, decimalPlaces);

            numerator = numberValue * powerOf10;
            denominator = powerOf10;
        }

        const gcd: number = math.GCD(numerator, denominator);
        numerator /= gcd;
        denominator /= gcd;

        return new Fraction(numerator, denominator);
    }


    /**
     * Converts the fraction to an integral number.
     *
     * @returns The integral value of the fraction.
     *
     * @example
     * const fraction = new Fraction(5, 2);
     * const integral = fraction.toIntergral();
     * console.log(integral); // Output: 2.5
     */
    static toIntergral(fraction: Fraction): number {
        return fraction.numerator / fraction.denominator;
    }


}
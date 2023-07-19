import { Constants } from "./constants";
import { Numerical } from "./@interfaces/Numerical";






class NumericalNumber implements Numerical<number> {
    zeroValue = 0;
    add = (x: number, y: number): number => x + y;
    subtract = (x: number, y: number): number => x - y;
    multiply = (x: number, y: number): number => x * y;
    divide = (x: number, y: number): number => x / y;
    sqrt = (x: number): number => Math.sqrt(x);
}

class NumericalBigInt implements Numerical<bigint> {
    zeroValue = BigInt(0);
    add = (x: bigint, y: bigint): bigint => x + y;
    subtract = (x: bigint, y: bigint): bigint => x - y;
    multiply = (x: bigint, y: bigint): bigint => x * y;
    divide = (x: bigint, y: bigint): bigint => x / y;
    //@ts-ignore
    sqrt = (x: bigint): bigint => math.sqrt(x)

}

function isNumeric<T>(x: any): x is Numerical<T> {
    return x && 'zeroValue' in x && 'add' in x && 'multiply' in x;
}

export namespace math {




    /**
     * Calculates the dot product of two vectors.
     * @public
     * @static
     * @param {number[]} vector1 - The first vector.
     * @param {number[]} vector2 - The second vector.
     * @returns {number} The dot product of the two vectors.
     */
    export function dot<T>(vector1: T[], vector2: T[], numeric?: Numerical<T>): T {
        let sum: T;
        if (vector1.length === 0 || vector2.length === 0) {
            numeric = new NumericalNumber() as unknown as Numerical<T>;
            return numeric.zeroValue;
        }
        if (typeof vector1[0] === "number") {
            numeric = new NumericalNumber() as unknown as Numerical<T>;
            sum = numeric.zeroValue;
        } else if (typeof vector1[0] === "bigint") {
            numeric = new NumericalBigInt() as unknown as Numerical<T>;
            sum = numeric.zeroValue;
        } else if (numeric && isNumeric(numeric)) {
            sum = numeric.zeroValue;
        } else {

            throw new Error("The vectors are neither numbers nor bigints and no appropriate Numeric implementation was provided.");
        }

        for (let i = 0; i < vector1.length; i++) {
            sum = numeric.add(sum, numeric.multiply(vector1[i], vector2[i]));
        }
        return sum;
    }


    /**
     * Normalizes a vector.
     * @public
     * @static
     * @param {number[]} vector1 - The vector to normalize.
     * @returns {number[]} The normalized vector.
     */
    export function normalize(vector1: number[]): number[] {
        let scalar: number = 1 / (Math.sqrt(vector1.map(x => x ** 2).reduce((acc, x) => acc + x)))
        return vector1.map((entry: number) => entry * scalar)
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * floor, ceil, trunc and abs 
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////




    /**
     * Returns the absolute value of a number.
     *
     * @param {number} num - The number to calculate the absolute value of.
     * @returns The absolute value of the number.
     */
    export function abs(num: number): number {
        if (num < 0) {
            return num * -1;
        } else {
            return num;
        }
    }





    /**
     * Calculates the floor of a number
     * @param {number} num - The number to calculate the floor for.
     * @returns {number} The largest integer less than or equal to the given number.
     */
    export function floor(num: number): number {
        return Math.floor(num)
    }

    /**
     * Calculates the ceil of a number
     * @param {number} num - The number to calculate the ceil for.
     * @returns {number} The smallest integer greater than or equal to the given number.
     */
    export function ceil(num: number): number {
        return Math.ceil(num)
    }

    /**
     * Calculates the truncation of a number
     * @param  {number} num - The number to calculate the truncation for.
     * @returns {number} The integer part of the given number.
     */
    export function trunc(num: number): number {
        return Math.trunc(num)
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Fractional operations
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////



    /**
     * Returns the fractional part of a number.
     * @param {number} num - The number to extract the fractional part from.
     * @returns {number} The fractional part of the number.
     */
    export function fracPart(num: number): number {
        const abs: number = math.abs(num);
        const frac: number = abs - math.trunc(abs);
        return Number(frac.toFixed(math.countDecimals(abs)));
    }

    /**
        Calculates the greatest common divisor (GCD) of two numbers.
        @public
        @static
        @param {number} a - The first number.
        @param {number} b - The second number.
        @returns {number} The GCD of the two numbers. 
    */
    export function GCD(a: number, b: number): number {
        if (b === 0) {
            return a;
        }

        return math.GCD(b, a % b);
    }

    /**
     * Calculates the least common divisor (LCD) of two numbers.
     *  @public
     *  @static
        @param {number} a - The first number.
        @param {number} b - The second number.
        @returns {number} The LCD of the two numbers. 
     */
    export function LCD(a: number, b: number): number {
        // Calculate the GCD (Greatest Common Divisor) using the Euclidean algorithm
        const gcd = math.GCD(a, b);

        // Calculate the LCD using the formula: LCD = (a * b) / GCD
        const lcd = (a * b) / gcd;

        return lcd;
    }


    /**
     * Rounds a number to a specified number of decimal places using a specified base.
     * @public
     * @static
     * @param {number} num - The number to round.
     * @param {number} digits - The number of decimal places to round to.
     * @param {number} base - The base to use for rounding.Defaults to 10 if not provided.
     * @returns {number} The rounded number.
     */
    export function toFixedNumber(num: number, digits: number, base: number = 10): number {
        const pow = Math.pow(base, digits);
        return Math.round(num * pow) / pow;
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Utility functions
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns the number of decimal places in a given number.
     * @param {number} num - The number to count the decimal places of.
     * @returns {number} The number of decimal places in the given number.
     */
    export function countDecimals(num: number): number {
        if (Number.isInteger(num)) {
            return 0;
        } else {
            return num.toString().split(".")[1].length || 0;
        }
    }

    /**
     * Checks if two numbers are approximately equal within a specified tolerance.
     * @param {number} x - The first number to compare.
     * @param {number} y - The second number to compare.
     * @param {number} tolerance - The maximum difference allowed between the numbers. Defaults to Number.EPSILON.
     * @returns {boolean} 'true' if the numbers are approximately equal, 'false' otherwise.
     */
    export function equal(x: number, y: number, tolerance: number = Constants.DELTA): boolean {
        return math.abs(x - y) < tolerance;
    }


    /**
        * Checks if a given number is a power of two
        *  @public
        *  @static
        * @param {number} n The number to check
        * @returns {boolean} 'true' if a power of two 'false' otherwise
        */
    export function isPowerOfTwo(n: number): boolean {
        return (n & (n - 1)) === 0;
    }


    /**
     * Method used to find the next power of two for a given number.
     *  @public
     *  @static
     * @param {number} n - The number for which to find the next power of two.
     * @returns {number} The next power of two for the given number.
     */
    export function nextPowerOfTwo(n: number): number {
        let count: number = 0;

        if (n > 0 && (n & (n - 1)) === 0)
            return n;

        while (n !== 0) {
            n >>= 1;
            count += 1;
        }

        // Return next power of 2
        return 1 << count;
    }



    /**
     * Returns the sign of a number.
       @public
       @static
     * @param {number} num - The number to determine the sign of.
     * @returns {number} The sign of the number: -1 if negative, 0 if zero, 1 if positive.
     */
    export function sign(num: number): number {
        let sign: number = 0;

        if (num < 0) {
            sign = -1;
        } else if (num > 0) {
            sign = 1;
        }

        return sign;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Root operations 
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    /**
     * Calculates the approximate square root of a given bigint value.
     * @param {bigint} x - The bigint value for which to calculate the square root.
     * @returns {bigint} The approximate square root of the given value.
     */
    export function BigSqrt(x: bigint): bigint {
        if (x < 2n) {
            return x;
        }

        if (x < 16n) {
            return BigInt(Math.sqrt(Number(x)) | 0);
        }

        let x0: bigint, x1: bigint;
        if (x < 4503599627370496n) { // 1n << 52n
            x1 = BigInt(Math.sqrt(Number(x)) | 0) - 3n;
        } else {
            let vlen = x.toString().length;
            if (!(vlen & 1)) {
                x1 = 10n ** (BigInt(vlen / 2));
            } else {
                x1 = 4n * 10n ** (BigInt((vlen / 2) | 0));
            }
        }

        do {
            x0 = x1;
            x1 = ((x / x0) + x0) >> 1n;
        } while (x0 !== x1 && x0 !== (x1 - 1n));

        return x0;
    }

    /**
     * Calculates the approximate square root of a given number or bigint value.
     * @param {number | bigint} x - The number or bigint value for which to calculate the square root.
     * @returns {number | bigint} The approximate square root of the given value.
     */
    export function sqrt(x: number | bigint): number | bigint {
        if (typeof x === "number") {
            return Math.sqrt(x) as number;
        } else {
            return BigSqrt(x) as bigint;
        }
    }

}


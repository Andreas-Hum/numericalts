import { Constants } from "./constants";
import { Numerical } from "./@interfaces/numerical";
import { NumericalError } from "./@error.types";






class NumericalNumber implements Numerical<number> {
    zeroValue: number = 0;
    oneValue: number = 1;

    add = (x: number, y: number): number => x + y;
    subtract = (x: number, y: number): number => x - y;
    multiply = (x: number, y: number): number => x * y;
    divide = (x: number, y: number): number => x / y;
    sqrt = (x: number): number => Math.sqrt(x);

    fromInteger(n: number): number {
        return n;
    }


    signOperator(x: number): number {
        return Math.sign(x);
    }
}

class NumericalBigInt implements Numerical<bigint> {
    zeroValue: bigint = BigInt(0);
    oneValue: bigint = BigInt(1);

    add = (x: bigint, y: bigint): bigint => x + y;
    subtract = (x: bigint, y: bigint): bigint => x - y;
    multiply = (x: bigint, y: bigint): bigint => x * y;
    divide = (x: bigint, y: bigint): bigint => x / y;
    //@ts-ignore
    sqrt = (x: bigint): bigint => math.sqrt(x)

    fromInteger(n: number): bigint {
        return BigInt(n);
    }
    signOperator(x: bigint): number {
        return x >= BigInt(0) ? 1 : -1;
    }
}



export namespace math {





    /**
     * Calculates the dot product of two vectors of numbers.
     *
     * The function is an algebraic operation that takes two equal-length sequences of numbers
     * (usually coordinate vectors) and returns a single number.
     *
     * @param {number[]} vector1 - The first vector to calculate the dot product.
     * @param {number[]} vector2 - The second vector to calculate the dot product.
     *
     * @throws {Error} If the vectors' lengths do not match.
     *
     * @returns {number} A number representing the dot product of the two vectors.
     *
     * @example
     *
     *    dot([1, 3, -5], [4, -2, -1]);  // Returns 3
     *
     */
    export function dot(vector1: number[], vector2: number[]): number;

    /**
     * Calculates the dot product of two vectors of bigints.
     *
     * The function is an algebraic operation that takes two equal-length sequences of bigints
     * (usually coordinate vectors) and returns a single bigint.
     *
     *
     * @param {bigint[]} vector1 - The first vector to calculate the dot product.
     * @param {bigint[]} vector2 - The second vector to calculate the dot product.
     *
     * @throws {Error} If the vectors' lengths do not match.
     *
     * @returns {bigint} A bigint representing the dot product of the two vectors.
     *
     * @example
     *
     *    dot([1n, 3n, -5n], [4n, -2n, -1n]);  // Returns 3n
     *
     */
    export function dot(vector1: bigint[], vector2: bigint[]): bigint;

    /**
     * Calculates the dot product of two vectors of a generic type.
     *
     * The function is an algebraic operation that takes two equal-length sequences of generic type
     * (usually coordinate vectors) and returns a single value of type T.
     *
     * @template T - The numeric type of the elements in the vector. T is inferred and doesn't need to be supplied manually.
     *
     * @param {T[]} vector1 - The first vector to calculate the dot product.
     * @param {T[]} vector2 - The second vector to calculate the dot product.
     * @param {Numerical<T>} numerical - (optional) An instance of Numerical interface for the numeric type T. 
     *    - If not provided, it defaults to NumericalNumber if the vectors are of type number[],
     *      or to NumericalBigInt if the vectors are of type bigint[].
     *    - If vectors are neither of type number[] nor bigint[], a Numerical<T> instance must be provided.
     *
     * @throws {NumericalError} If the vectors' type is neither array of numbers nor bigints, and no Numerical<T> instance was provided.
     * @throws {error} If the vectors' lengths do not match.
     *
     * @returns {T} A value of type T, representing the dot product of two vectors.
     *
     * @example
     *
     *    dot([1, 3, -5], [4, -2, -1], new Numerical());  // Where Numerical() is an implementation for type T.
     *
     */
    export function dot<T>(vector1: T[], vector2: T[], numerical: Numerical<T>): T;



    export function dot<T>(vector1: T[], vector2: T[], numerical?: Numerical<T>): T {
        if (!numerical) {
            if (typeof vector1[0] === "number" && typeof vector2[0] === "number") {
                numerical = new NumericalNumber() as unknown as Numerical<T>;
            } else if (typeof vector1[0] === "bigint" && typeof vector2[0] === "bigint") {
                numerical = new NumericalBigInt() as unknown as Numerical<T>;
            } else {
                throw new NumericalError("The vectors are neither numbers nor bigints and no appropriate Numeric implementation was provided.", 901);
            }
        }

        // Ensure vector1 and vector2 have the same length
        if (vector1.length !== vector2.length) {
            throw new Error("Vector lengths do not match.");
        }

        let sum: T = numerical.zeroValue;

        for (let i = 0; i < vector1.length; i++) {
            sum = numerical.add(sum, numerical.multiply(vector1[i], vector2[i]));
        }
        return sum;
    }



    /**
    * Normalizes a vector of numbers.
    *
    * @param {number[]} vector - The vector of numbers to be normalized.
    * @returns {number[]} A new vector that represents the normalized form of the input vector.
    *
    * @example
    *    normalize([3, 4]);  // Returns [0.6, 0.8]
    */
    export function normalize(vector: number[]): number[];

    /**
     * Normalizes a vector of bigints.
     * @param {bigint[]} vector - The vector of bigints to be normalized.
     * @returns {bigint[]} A new vector that represents the normalized form of the input vector.
     *
     * @example
     *    normalize([3n, 4n]);  // Returns [3n, 4n]
     */
    export function normalize(vector: bigint[]): bigint[];

    /**
     * Normalizes a vector of numeric type T.
     *
     * The function computes the length of the vector and divides each element by the length,
     * thus normalizing the vector to a length/magnitude of 1 or -1.
     * The normalization is done based on the provided numeric type (number/bigint or other, with other requiring a Numerical<T> instance)
     *
     * @template T - The numeric type of the elements in the vector. T is inferred and doesn't need to be supplied manually.
     *
     * @param {T[]} vector - The vector to be normalized.
     * @param {Numerical<T>} numerical - (optional) An instance of Numerical interface for the numeric type T. 
     *    - If not provided, it defaults to NumericalNumber if the vector is of type number[],
     *      or to NumericalBigInt if the vector is of type bigint[].
     *    - If vector is neither number[] nor bigint[], a Numerical<T> instance must be provided.
     * 
     * @throws {NumericalError} If the vector's type is neither number[] nor bigint[], and no Numerical<T> instance was provided.
     *
     * @returns {T[]} A new vector that represents the normalized form of the input vector.
     *
     * @example
     *
     *    normalize([3, 4]);                  // Returns [0.6, 0.8]
     *    normalize([3n, 4n]);                // Returns [3n, 4n]
     *    normalize([3, 4], new Numerical()); // Where Numerical() is an implementation for type T.
     *
     */
    export function normalize<T>(vector: T[], numerical?: Numerical<T>): T[]


    export function normalize<T>(vector: T[], numerical?: Numerical<T>): T[] {
        if (!numerical) {
            if (typeof vector[0] === "number") {
                numerical = new NumericalNumber() as unknown as Numerical<T>;
            } else if (typeof vector[0] === "bigint") {
                numerical = new NumericalBigInt() as unknown as Numerical<T>;
            } else {
                throw new Error("The vectors are neither numbers nor bigints and no appropriate Numeric implementation was provided.");
            }
        }
        let scalar: T = numerical.divide(numerical.oneValue, numerical.sqrt(vector.map((x: T) => numerical.multiply(x, x)).reduce((acc: T, x: T) => numerical.add(acc, x), numerical.zeroValue)))
        return vector.map((entry: T) => numerical.multiply(entry, scalar))
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * floor, ceil, trunc and abs 
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////



    /**
     * Returns the absolute value of a number.
     *
     * @param num - The number to calculate the absolute value of.
     * @returns The absolute value of the number.
     *
     * @example
     *    abs(-5);   // Returns 5
     */
    export function abs(num: number): number

    /**
     * Returns the absolute value of a bigint.
     *
     * @param num - The bigint to calculate the absolute value of.
     * @returns The absolute value of the bigint.
     *
     * @example
     *    abs(-5n);   // Returns 5n
     */
    export function abs(num: bigint): bigint

    /**
     * Returns the absolute value of a number of type T.
     *
     * @typeparam T - The data type for the numeric operations.
     * @param {T} num - The number to calculate the absolute value of.
     * @param {Numerical<T>} numerical - An instance of Numerical<T> interface for the numeric type T.
     * @returns {T} The absolute value of the number of type T.
     *
     * @example
     *    abs(-5);                        // Returns 5
     *    abs(-5n);                       // Returns 5n
     *    abs(-5, new Numerical<number>()); // Where Numerical<number>() is an implementation for numbers.
     */
    export function abs<T>(num: T, numerical?: Numerical<T>): T


    export function abs<T>(num: T, numerical?: Numerical<T>): T {

        if (!numerical) {
            if (typeof num === "number") {
                numerical = new NumericalNumber() as unknown as Numerical<T>;
            } else if (typeof num === "bigint") {
                numerical = new NumericalBigInt() as unknown as Numerical<T>;
            } else {
                throw new Error("The vectors are neither numbers nor bigints and no appropriate Numeric implementation was provided.");
            }
        }
        const sign: number = numerical.signOperator(num);

        //if sign is -1, multiply num by -1 to get positive value, otherwise leave num as it is
        return sign === -1 ? numerical.multiply(num, numerical.fromInteger(-1)) : num;
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


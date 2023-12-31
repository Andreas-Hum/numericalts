import { ComplexNumber, } from './complex';
import { Constants } from "./constants";
import { Numerical } from "./@interfaces/numerical";
import { NumericalError } from "./@error.types";

import { NumericalNumber, NumericalBigInt, NumericalComplex } from "../src/@numerical.classes";

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
        // Ensure vector1 and vector2 have the same length
        if (vector1.length !== vector2.length) {
            throw new Error("Vector lengths do not match.");
        } else if (vector1.length === 0) {
            throw new Error("Vector length can't be 0.")
        }

        if (!numerical) {
            if (typeof vector1[0] === "number" && typeof vector2[0] === "number") {
                numerical = new NumericalNumber() as unknown as Numerical<T>;
            } else if (typeof vector1[0] === "bigint" && typeof vector2[0] === "bigint") {
                numerical = new NumericalBigInt() as unknown as Numerical<T>;
            } else {
                throw new NumericalError("The vectors are neither numbers nor bigints and no appropriate Numeric implementation was provided.", 901);
            }
        }


        let sum: T = numerical.zeroValue;

        for (let i = 0; i < vector1.length; i++) {
            sum = numerical.add(sum, numerical.multiply(vector1[i], vector2[i]));
        }
        return sum;
    }



    /**
     * Returns the maximum value from an array of numbers.
     *
     * @param {number[]} arr - The array of numbers.
     * @returns {number} The maximum value from the array.
     *
     * @throws {Error} Throws an error if the array length is 0.
     *
     * @example
     * const numbers = [1, 3, 2, 5, 4];
     * const maxNumber = max(numbers);
     * console.log(maxNumber);
     * // Output: 5
     */
    export function max(arr: number[]): number;

    /**
     * Returns the maximum value from an array of bigints.
     *
     * @param {bigint[]} arr - The array of bigints.
     * @returns {bigint} The maximum value from the array.
     *
     * @throws {Error} Throws an error if the array length is 0.
     *
     * @example
     * const bigints = [BigInt(1), BigInt(3), BigInt(2), BigInt(5), BigInt(4)];
     * const maxBigInt = max(bigints);
     * console.log(maxBigInt);
     * // Output: 5n
     */
    export function max(arr: bigint[]): bigint;

    /**
     * Returns the maximum value from an array using a custom numerical implementation.
     *
     * @template T - The type of the elements in the array.
     * @param {T[]} arr - The array of elements.
     * @param {Numerical<T>} [numerical] - The numerical implementation to use.
     * @returns {T} The maximum value from the array.
     *
     * @throws {Error} Throws an error if the array length is 0 or if no appropriate numerical implementation is provided.
     *
     * @example
     * const array = [1, 3, 2, 5, 4];
     * const maxElement = max(array, new NumericalNumber());
     * console.log(maxElement);
     * // Output: 5
     */
    export function max<T>(arr: T[], numerical?: Numerical<T>): T

    export function max<T>(arr: T[], numerical?: Numerical<T>): T {
        if (arr.length === 0) {
            throw new Error("array length can't be 0.")
        }
        if (!numerical) {
            if (typeof arr[0] === "number") {

                numerical = new NumericalNumber() as unknown as Numerical<T>;
                return Math.max(...arr as number[]) as T
            } else if (typeof arr[0] === "bigint") {
                numerical = new NumericalBigInt() as unknown as Numerical<T>;
                let max: bigint = arr[0]
                for (let i = 1; i < arr.length; i++) {
                    if (max < (arr[i] as bigint)) {
                        (max as bigint) = (arr[i] as bigint)
                    }
                }
                return max as T
            } else {
                throw new NumericalError("The vector is either a number array nor a bigint array and no appropriate Numeric implementation was provided.", 901);
            }
        }

        let max: T = arr[0]
        for (let i = 1; i < arr.length; i++) {
            if (numerical.toIntegral(max) < numerical.toIntegral(arr[i])) {
                max = arr[i]
            }
        }
        return max;
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
        if (vector.length === 0) {
            throw new Error("Vector length can't be 0.")
        }

        if (!numerical) {
            if (typeof vector[0] === "number") {
                numerical = new NumericalNumber() as unknown as Numerical<T>;
            } else if (typeof vector[0] === "bigint") {
                numerical = new NumericalBigInt() as unknown as Numerical<T>;
            } else {
                throw new NumericalError("The vector is either a number array nor a bigint array and no appropriate Numeric implementation was provided.", 901);
            }
        }
        let squaredValues: T[] = vector.map((value: T) => numerical!.multiply(value, value));
        let sumOfSquares: T = squaredValues.reduce((acc: T, value: T) => numerical!.add(acc, value), numerical.zeroValue);
        if (sumOfSquares === numerical.zeroValue) {
            throw new Error("Can't normalize a zero vector")
        }
        let scalar: T = numerical.divide(numerical.oneValue, numerical.sqrt(sumOfSquares));
        return vector.map((entry: T) => numerical!.multiply(entry, scalar));
    }

    /**
     * Calculates the nth root of a number.
     *
     * @param {number} base - The base number.
     * @param {number} root - The root to calculate.
     * @returns {number} The result of calculating the nth root.
     *
     * @example
     * const result = nthRoot(27, 3);
     * console.log(result);
     * // Output: 3
     */
    export function nthRoot(base: number, root: number): number;

    /**
     * Calculates the nth root of a bigint.
     *
     * @param {bigint} base - The base bigint.
     * @param {number} root - The root to calculate.
     * @returns {bigint} The result of calculating the nth root.
     *
     * @example
     * const result = nthRoot(BigInt(27), 3);
     * console.log(result);
     * // Output: 3n
     */
    export function nthRoot(base: bigint, root: number): bigint;

    /**
     * Calculates the nth root of a value using a custom numerical implementation.
     *
     * @template T - The type of the base value.
     * @param {T} base - The base value.
     * @param {number} root - The root to calculate.
     * @param {Numerical<T>} [numerical] - The numerical implementation to use.
     * @returns {T} The result of calculating the nth root.
     *
     * @throws {NumericalError} Throws an error if no appropriate numerical implementation is provided.
     *
     * @example
     * const result = nthRoot(27, 3, new NumericalNumber());
     * console.log(result);
     * // Output: 3
     */
    export function nthRoot<T>(base: T, root: number, numerical?: Numerical<T>): T {
        if (!numerical) {
            if (typeof base === "number") {
                numerical = new NumericalNumber() as unknown as Numerical<T>;
            } else if (typeof base === "bigint") {
                numerical = new NumericalBigInt() as unknown as Numerical<T>;
            } else {
                throw new NumericalError(
                    "The base is neither a number nor a bigint array and no appropriate Numeric implementation was provided.",
                    901
                );
            }
        }

        return numerical.fromIntegral(Math.pow(numerical.toIntegral(base), 1 / root))
    }




    /**
     * Computes the product of a number array.
     *
     * @param {number[]} array - The array of numbers.
     * @returns {number} The product of all numbers in the array.
     *
     * @example
     *    prod([3, 4]);  // Returns 12
     */
    export function prod(array: number[]): number;

    /**
     * Computes the product of a bigint array.
     *
     * @param {bigint[]} array - The array of bigints.
     * @returns {bigint} The product of all bigints in the array.
     *
     * @example
     *    prod([3n, 4n]);  // Returns 12n
     */
    export function prod(array: bigint[]): bigint;

    /**
     * Computes the product of an array of numeric type T.
     *
     * @template T - The numeric type of the elements in the array. T is inferred and doesn't need to be supplied manually.
     *
     * @param {T[]} array - The array of elements.
     * @param {Numerical<T>} numerical - (optional) An instance of Numerical interface for the numeric type T. 
     *    - If not provided, it defaults to NumericalNumber if the array is of type number[],
     *      or to NumericalBigInt if the array is of type bigint[].
     *    - If array is neither number[] nor bigint[], a Numerical<T> instance must be provided.
     * 
     * @throws {NumericalError} If the array's type is neither number[] nor bigint[], and no Numerical<T> instance was provided.
     *
     * @returns {T} The product of all elements in the array.
     *
     * @example
     *
     *    prod([3, 4]);                  // Returns 12
     *    prod([3n, 4n]);                // Returns 12n
     *    prod([3, 4], new Numerical()); // Where Numerical() is an implementation for type T.
     *
     */
    export function prod<T>(array: T[], numerical?: Numerical<T>): T

    export function prod<T>(array: T[], numerical?: Numerical<T>): T {
        if (array.length === 0) {
            throw new Error("array length can't be 0.")
        }

        if (!numerical) {
            if (typeof array[0] === "number") {
                numerical = new NumericalNumber() as unknown as Numerical<T>;
            } else if (typeof array[0] === "bigint") {
                numerical = new NumericalBigInt() as unknown as Numerical<T>;
            } else {
                throw new NumericalError("The array is either a number array nor a bigint array and no appropriate Numeric implementation was provided.", 901);
            }
        }

        if (array.length === 1) return array[0]
        return array.reduce((acc: T, cur: T) => numerical!.multiply(acc, cur), numerical.oneValue);
    }


    /**
     * Calculates the power of a number to the specified exponent.
     *
     * @param {number} base - The base number.
     * @param {number} exponent - The exponent to raise the base to.
     * @returns {number} The result of raising the base to the exponent.
     *
     * @example
     * const result = pow(2, 3);
     * console.log(result);
     * // Output: 8
     */
    export function pow(base: number, exponent: number): number;

    /**
     * Calculates the power of a bigint to the specified exponent.
     *
     * @param {bigint} base - The base bigint.
     * @param {number} exponent - The exponent to raise the base to.
     * @returns {bigint} The result of raising the base to the exponent.
     *
     * @example
     * const result = pow(BigInt(2), 3);
     * console.log(result);
     * // Output: 8n
     */
    export function pow(base: bigint, exponent: number): bigint;

    /**
     * Calculates the power of a value to the specified exponent using a custom numerical implementation.
     *
     * @template T - The type of the base value.
     * @param {T} base - The base value.
     * @param {number} exponent - The exponent to raise the base to.
     * @param {Numerical<T>} [numerical] - The numerical implementation to use.
     * @returns {T} The result of raising the base to the exponent.
     *
     * @throws {NumericalError} Throws an error if no appropriate numerical implementation is provided.
     *
     * @example
     * const result = pow(2, 3, new NumericalNumber());
     * console.log(result);
     * // Output: 8
     */
    export function pow<T>(base: T, exponent: number, numerical?: Numerical<T>): T

    export function pow<T>(base: T, exponent: number, numerical?: Numerical<T>): T {
        if (!numerical) {
            if (typeof base === "number") {
                numerical = new NumericalNumber() as unknown as Numerical<T>;
            } else if (typeof base === "bigint") {
                numerical = new NumericalBigInt() as unknown as Numerical<T>;
            } else {
                throw new NumericalError(
                    "The base is neither a number nor a bigint array and no appropriate Numeric implementation was provided.",
                    901
                );
            }
        }

        return numerical.fromIntegral(Math.pow(numerical.toIntegral(base), exponent))
    }





    /**
     * Computes the sum of a number array.
     *
     * @param {number[]} array - The array of numbers.
     * @returns {number} The sum of all numbers in the array.
     *
     * @throws {Error} If the array length is 0.
     *
     * @example
     * sum([1, 2, 3]);  // Returns 6
     */
    export function sum(array: number[]): number;

    /**
     * Computes the sum of a bigint array.
     *
     * @param {bigint[]} array - The array of bigints.
     * @returns {bigint} The sum of all bigints in the array.
     *
     * @throws {Error} If the array length is 0.
     *
     * @example
     * sum([1n, 2n, 3n]);  // Returns 6n
     */
    export function sum(array: bigint[]): bigint;

    /**
     * Computes the sum of an array of type T using the provided numerical implementation.
     *
     * @template T - The type of elements in the array.
     *
     * @param {T[]} array - The array of elements.
     * @param {Numerical<T>} [numerical] - (Optional) An instance of the Numerical interface for type T.
     *                                    If not provided, a default numerical implementation will be used based on the type of the array elements.
     *                                    If the array is neither number[] nor bigint[], a numerical instance must be provided.
     *
     * @throws {Error} If the array length is 0.
     * @throws {NumericalError} If the array type is not number[] or bigint[] and no numerical implementation is provided.
     *
     * @returns {T} The sum of all elements in the array.
     *
     * @example
     * sum([1, 2, 3]);                            // Returns 6
     * sum([1n, 2n, 3n]);                          // Returns 6n
     * sum([1, 2, 3], new NumericalNumber());      // Returns 6 using NumericalNumber implementation
     * sum([1n, 2n, 3n], new NumericalBigInt());   // Returns 6n using NumericalBigInt implementation
     */
    export function sum<T>(array: T[], numerical?: Numerical<T>): T

    export function sum<T>(array: T[], numerical?: Numerical<T>): T {
        if (array.length === 0) {
            throw new Error("array length can't be 0.")
        }

        if (!numerical) {
            if (typeof array[0] === "number") {
                numerical = new NumericalNumber() as unknown as Numerical<T>;
            } else if (typeof array[0] === "bigint") {
                numerical = new NumericalBigInt() as unknown as Numerical<T>;
            } else {
                throw new NumericalError("The array is either a number array nor a bigint array and no appropriate Numeric implementation was provided.", 901);
            }
        }

        if (array.length === 1) return array[0]
        return array.reduce((acc: T, cur: T) => numerical!.add(acc, cur), numerical.zeroValue);

    }



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * floor, ceil, trunc and abs
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////



    /**
     * Returns the absolute value of a number.
     *
     * @param {number} x - The number to calculate the absolute value of.
     * @returns {number} The absolute value of the number.
     *
     * @example
     *    abs(-5);   // Returns 5
     */
    export function abs(x: number): number

    /**
     * Returns the absolute value of a bigint.
     *
     * @param {bigint} x - The bigint to calculate the absolute value of.
     * @returns {bigint} The absolute value of the bigint.
     *
     * @example
     *    abs(-5n);   // Returns 5n
     */
    export function abs(x: bigint): bigint

    /**
     * Returns the absolute value of a number of type T.
     *
     * @typeparam T - The data type for the numeric operations.
     * @param {T} x - The number to calculate the absolute value of.
     * @param {Numerical<T>} numerical - An instance of Numerical<T> interface for the numeric type T.
     * @returns {T} The absolute value of the number of type T.
     * @throws {NumericalError} If x's type is neither number nor bigint, and no Numerical<T> instance was provided.
     *
     * @example
     *    abs(-5);                        // Returns 5
     *    abs(-5n);                       // Returns 5n
     *    abs(-5, new Numerical<number>()); // Where Numerical<number>() is an implementation for numbers.
     */
    export function abs<T>(x: T, numerical?: Numerical<T>): T


    export function abs<T>(x: T, numerical?: Numerical<T>): T {

        if (!numerical) {
            if (typeof x === "number") {
                numerical = new NumericalNumber() as unknown as Numerical<T>;
            } else if (typeof x === "bigint") {
                numerical = new NumericalBigInt() as unknown as Numerical<T>;
            } else {
                throw new NumericalError("x is neither a number nor a bigint and no appropriate Numeric implementation was provided.", 901);
            }
        }
        const sign: number = numerical.signOperator(x);

        return sign === -1 ? numerical.multiply(x, numerical.fromIntegral(-1)) : x;
    }



    //TODO: Figure out a way to use these dynamically

    /**
     * Calculates the floor of a number
     * @param {number} num - The number to calculate the floor for.
     * @returns {number} The largest integer less than or equal to the given number.
     * @example
     *    floor(-4.6);                // Returns -4
     *    floor(10.5);                // Returns 10
     */
    export function floor(num: number): number {
        return Math.floor(num)
    }

    /**
     * Calculates the ceil of a number
     * @param {number} num - The number to calculate the ceil for.
     * @returns {number} The smallest integer greater than or equal to the given number.
      * @example
     *    ceil(-4.6);                // Returns -5
     *    ceil(10.5);                // Returns 11
     */
    export function ceil(num: number): number {
        return Math.ceil(num)
    }

    /**
     * Calculates the truncation of a number
     * @param  {number} num - The number to calculate the truncation for.
     * @returns {number} The integer part of the given number.
     * @example
     *    trunc(-4.6);             // Returns -4
     *    trunc(10.5);             // Returns 10
     */
    export function trunc(num: number): number {
        return Math.trunc(num)
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Fractional operations
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    //TODO: Figure out a way to use these dynamically

    /**
     * Returns the fractional part of a number.
     * @param {number} num - The number to extract the fractional part from.
     * @returns {number} The fractional part of the number.
     * @example
     *    fracPart(-4.6);        // Returns 0.6
     *    fracPart(10.5);        // Returns 0.5
     */
    export function fracPart(num: number): number {
        const abs: number = math.abs(num);
        const frac: number = abs - math.trunc(abs);
        return Number(frac.toFixed(math.countDecimals(abs)));
    }

    /**
        Calculates the greatest common divisor (GCD) of two numbers.
        *@param {number} a - The first number.
        *@param {number} b - The second number.
        *@returns {number} The GCD of the two numbers.
        * @example
        *    GCD(12, 18);    // Returns 6
        *    GCD(24, 36);    // Returns 12
    */
    export function GCD(a: number, b: number): number {
        if (b === 0) {
            return a;
        }

        return math.GCD(b, a % b);
    }

    /**
     * Calculates the least common divisor (LCD) of two numbers.
     * @public
     * @static
     * @param {number} a - The first number.
     * @param {number} b - The second number.
     * @returns {number} The LCD of the two numbers.
     * @example
     *    LCD(12, 18);    // Returns 36
     *    LCD(24, 36);    // Returns 72
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
     * @param {number} base - The base to use for rounding. Defaults to 10 if not provided.
     * @returns {number} The rounded number.
     * @example
     *    toFixedNumber(3.14159, 2);    // Returns 3.14
     *    toFixedNumber(2.71828, 3, 2); // Returns 2.75
     */
    export function toFixedNumber(num: number, digits: number, base: number = 10): number {
        const pow: number = Math.pow(base, digits);
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
    * @param {number} tolerance - The maximum difference allowed between the numbers. Defaults to Constants.DELTA (for regular numbers) or 0n (for bigints).
    * @returns {boolean} 'true' if the numbers are approximately equal, 'false' otherwise.
    * @example
    *    equal(3.14159, 3.14, 0.01);    // Returns true
    *    equal(10, 15, 0.1);            // Returns false
    */
    export function equal(x: number, y: number, tolerance?: number): boolean

    /**
    * Checks if two bigints are approximately equal within a specified tolerance.
    * @param {bigint} x - The first bigint to compare.
    * @param {bigint} y - The second bigint to compare.
    * @param {bigint} tolerance - The maximum difference allowed between the numbers. Defaults to 0n .
    * @returns {boolean} 'true' if the bigint are approximately equal, 'false' otherwise.
    * @example
    *    equal(2233n, 2233n, 0n);        // Returns true
    *    equal(10n, 15n, 1n);            // Returns false
    */
    export function equal(x: bigint, y: bigint, tolerance?: bigint): boolean


    /**
     * Checks if two numbers (or bigints) are approximately equal within a specified tolerance.
     * @param {number | bigint} x - The first number to compare.
     * @param {number | bigint} y - The second number to compare.
     * @param {number | bigint} tolerance - The maximum difference allowed between the numbers. Defaults to Constants.DELTA (for regular numbers) or 0n (for bigints).
     * @returns {boolean} 'true' if the numbers are approximately equal, 'false' otherwise.
     * @example
     *    equal(3.14159, 3.14, 0.01);     // Returns true
     *    equal(10, 15, 0.1);             // Returns false
     *    equal(2233n, 2233n, 0n);        // Returns true
     *    equal(10n, 15n, 1n);            // Returns false
     */
    export function equal(x: number | bigint, y: number | bigint, tolerance: number | bigint = Constants.DELTA): boolean {
        if (typeof x === 'bigint' && typeof y === 'bigint') {
            return math.abs(x - y) < (typeof tolerance === 'bigint' ? tolerance : 0n);
        }

        return Math.abs(Number(x) - Number(y)) < (typeof tolerance === 'number' ? tolerance : Constants.DELTA);
    }
    /**
     * Checks if a given number is a power of two.
     * @public
     * @static
     * @param {number} n - The number to check.
     * @returns {boolean} 'true' if the number is a power of two, 'false' otherwise.
     * @example
     *    isPowerOfTwo(4);     // Returns true
     *    isPowerOfTwo(10);    // Returns false
     */
    export function isPowerOfTwo(n: number): boolean;

    /**
     * Checks if a given bigint is a power of two.
     * @public
     * @static
     * @param {bigint} n - The bigint to check.
     * @returns {boolean} 'true' if the bigint is a power of two, 'false' otherwise.
     * @example
     *    isPowerOfTwo(4n);     // Returns true
     *    isPowerOfTwo(10n);    // Returns false
     */
    export function isPowerOfTwo(n: bigint): boolean;

    /**
     * Checks if a given number (or bigint) is a power of two.
     * @public
     * @static
     * @param {number | bigint} n - The number to check.
     * @returns {boolean} 'true' if the number is a power of two, 'false' otherwise.
     * @example
     *    isPowerOfTwo(4);     // Returns true
     *    isPowerOfTwo(10);    // Returns false
     *    isPowerOfTwo(4n);    // Returns true
     *    isPowerOfTwo(10n);   // Returns false
     */
    export function isPowerOfTwo(n: number | bigint): boolean {
        if (typeof n === 'bigint') {
            return (n & (n - 1n)) === 0n;
        }

        return (n & (n - 1)) === 0;
    }



    /**
     * Method used to find the next power of two for a given number.
     * @public
     * @static
     * @param {number} n - The number for which to find the next power of two.
     * @returns {number} The next power of two for the given number.
     * @example
     *    nextPowerOfTwo(6);     // Returns 8
     *    nextPowerOfTwo(15);    // Returns 16
     */
    export function nextPowerOfTwo(n: number): number;

    /**
     * Method used to find the next power of two for a given bigint.
     * @public
     * @static
     * @param {bigint} n - The bigint for which to find the next power of two.
     * @returns {bigint} The next power of two for the given bigint.
     * @example
     *    nextPowerOfTwo(6n);     // Returns 8n
     *    nextPowerOfTwo(15n);    // Returns 16n
     */
    export function nextPowerOfTwo(n: bigint): bigint;

    /**
     * Method used to find the next power of two for a given number (or bigint).
     * @public
     * @static
     * @param {number | bigint} n - The number for which to find the next power of two.
     * @returns {number | bigint} The next power of two for the given number (or bigint).
     * @example
     *    nextPowerOfTwo(6);     // Returns 8
     *    nextPowerOfTwo(15);    // Returns 16
     *    nextPowerOfTwo(6n);    // Returns 8n
     *    nextPowerOfTwo(15n);   // Returns 16n
     */
    export function nextPowerOfTwo(n: number | bigint): number | bigint {
        let count: number = 0;

        if (typeof n === 'bigint') {
            if (n > 0n && (n & (n - 1n)) === 0n) {
                return n;
            }

            while (n !== 0n) {
                n >>= 1n;
                count += 1;
            }

            // Return next power of 2 as bigint
            return 1n << BigInt(count);
        }

        if (n > 0 && (n & (n - 1)) === 0) {
            return n;
        }

        while (n !== 0) {
            n >>= 1;
            count += 1;
        }

        // Return next power of 2 as number
        return 1 << count;
    }

    /**
     * Returns the sign of a number.
     * @public
     * @static
     * @param {number} num - The number to determine the sign of.
     * @returns {number} The sign of the number: -1 if negative, 0 if zero, 1 if positive.
     * @example
     *    sign(-5);    // Returns -1
     *    sign(0);     // Returns 0
     *    sign(10);    // Returns 1
     */
    export function sign(num: number): number;

    /**
     * Returns the sign of a bigint.
     * @public
     * @static
     * @param {bigint} num - The bigint to determine the sign of.
     * @returns {number} The sign of the bigint: -1 if negative, 0 if zero, 1 if positive.
     * @example
     *    sign(-5n);    // Returns -1
     *    sign(0n);     // Returns 0
     *    sign(10n);    // Returns 1
     */
    export function sign(num: bigint): number;

    /**
     * Returns the sign of a number (or bigint).
     * @public
     * @static
     * @param {number | bigint} num - The number to determine the sign of.
     * @returns {number} The sign of the number (or bigint): -1 if negative, 0 if zero, 1 if positive.
     * @example
     *    sign(-5);     // Returns -1
     *    sign(0);      // Returns 0
     *    sign(10);     // Returns 1
     *    sign(-5n);    // Returns -1
     *    sign(0n);     // Returns 0
     *    sign(10n);    // Returns 1
     */
    export function sign(num: number | bigint): number {
        if (typeof num === 'bigint') {
            if (num === 0n) {
                return 0;
            } else if (num > 0n) {
                return 1;
            } else {
                return -1;
            }
        }

        if (num === 0) {
            return 0;
        } else if (num > 0) {
            return 1;
        } else {
            return -1;
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Signal processing
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Calculates the Discrete Fourier Transform (DFT) of a sequence.
     * @remark This is only defined for sequences of numbers at the moment 
     * @param {number[]} sequence - The input sequence for which to calculate the DFT.
     * @returns {ComplexNumber[]} An array of complex numbers representing the DFT coefficients.
     *
     * @example
     * const sequence = [1, 2, 3, 2, 1];
     * const result = dft(sequence);
     * console.log(result);
     * // Output:
     *  [
     *      { real: 9, imaginary: 0 },
     *      { real: -2.118033988749895, imaginary: -1.538841768587627 },
     *      { real: 0.11803398874989479, imaginary: 0.36327126400268017 },
     *      { real: 0.11803398874989524, imaginary: -0.3632712640026805 },
     *      { real: -2.118033988749895, imaginary: 1.5388417685876252 }
     *   ]
     */
    export function dft(sequence: number[]): ComplexNumber[] {
        const N: number = sequence.length;
        const dftResult: ComplexNumber[] = [];

        for (let k = 0; k < N; k++) {
            let real: number = 0;
            let imaginary: number = 0;

            for (let n = 0; n < N; n++) {
                const angle: number = (2 * Math.PI * k * n) / N;
                const cos: number = Math.cos(angle);
                const sin: number = Math.sin(angle);

                real += sequence[n] * cos;
                imaginary -= sequence[n] * sin;
            }

            dftResult.push({ real, imaginary });
        }

        return dftResult;
    }

    /**
     * Calculates the Fast Fourier Transform (FFT) of a sequence.
     * @remark This is only defined for sequences of numbers at the moment it is a basic implementation and i plan on improving it in the future
     * @param {number[]} sequence - The input sequence for which to calculate the FFT.
     * @returns {ComplexNumber[]} An array of complex numbers representing the FFT coefficients.
     *
     * @example
     * const sequence = [1, 2, 3, 2];
     * const result = fft(sequence);
     * console.log(result);
     * // Output:
     *   [
     *      { real: 8, imaginary: 0 },
     *      { real: -1.2246467991473532e-16, imaginary: 2 },
     *      { real: 0, imaginary: 0 },
     *      { real: -1.2246467991473532e-16, imaginary: 2 }
     *   ]
     */
    export function fft(sequence: number[]): ComplexNumber[] {
        const numerical: NumericalComplex = new NumericalComplex()
        const N = sequence.length;

        // Base case: if the sequence has only one element, return it as the FFT coefficient
        if (N === 1) {
            return [{ real: sequence[0], imaginary: 0 }];
        }

        if (!isPowerOfTwo(N)) {
            throw new Error('Size of input must be a power of 2')
        }
        // Split the sequence into even and odd indices
        const even: number[] = sequence.filter((_, index) => index % 2 === 0);
        const odd: number[] = sequence.filter((_, index) => index % 2 !== 0);

        // Recursively calculate the FFT for the even and odd sequences
        const evenCoefficients: ComplexNumber[] = fft(even);
        const oddCoefficients: ComplexNumber[] = fft(odd);

        // Combine the even and odd coefficients using the butterfly operation
        const fftResult: ComplexNumber[] = [];
        for (let k = 0; k < N / 2; k++) {
            const angle: number = (2 * Math.PI * k) / N;
            const twiddle: ComplexNumber = { real: Math.cos(angle), imaginary: -Math.sin(angle) };

            const evenTerm: ComplexNumber = numerical.multiply(evenCoefficients[k], twiddle);
            const oddTerm: ComplexNumber = numerical.multiply(oddCoefficients[k], twiddle);

            fftResult[k] = numerical.add(evenTerm, oddTerm)
            fftResult[k + N / 2] = numerical.subtract(evenTerm, oddTerm)

        }

        return fftResult;
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
     * @example
     *    BigSqrt(9n);     // Returns 3n
     *    BigSqrt(100n);   // Returns 10n
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
     * Calculates the square root of a given number.
     * @param {number} x - The number for which to calculate the square root.
     * @returns {number} The square root of the given number.
     * @example
     *    sqrt(9);     // Returns 3
     *    sqrt(100);   // Returns 10
     */
    export function sqrt(x: number): number;

    /**
     * Calculates the square root of a given bigint value.
     * @param {bigint} x - The bigint value for which to calculate the square root.
     * @returns {bigint} The square root of the given value.
     * @example
     *    sqrt(9n);     // Returns 3n
     *    sqrt(100n);   // Returns 10n
     */
    export function sqrt(x: bigint): bigint;

    /**
     * Calculates the square root of a given value using the provided numerical implementation.
     * @template T - The type of the value.
     * @param {T} x - The value for which to calculate the square root.
     * @param {Numerical<T>} numerical - The numerical implementation to use. Defaults to NumericalNumber if not provided.
     * @returns {T} The square root of the given value.
     * @throws {NumericalError} If x's type is neither number nor bigint, and no Numerical<T> instance was provided.
     * @example
     *    sqrt(9);   // Returns 3
     *    sqrt(9n);  // Returns 3n
     *    sqrt(9, new Numerical<number>()); // Where Numerical<number>() is an implementation for numbers.
     */
    export function sqrt<T>(x: T, numerical?: Numerical<T>): T

    export function sqrt<T>(x: T, numerical?: Numerical<T>): T {
        if (!numerical) {
            if (typeof x === "number") {
                numerical = new NumericalNumber() as unknown as Numerical<T>;
            } else if (typeof x === "bigint") {
                numerical = new NumericalBigInt() as unknown as Numerical<T>;
            } else {
                throw new NumericalError("x is neither a number nor a bigint and no appropriate Numeric implementation was provided.", 901);
            }
        }

        if (numerical.zeroValue === x) {
            return numerical.zeroValue;
        }

        return numerical.sqrt(x);
    }

}


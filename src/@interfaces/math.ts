export { math as mathInterface }


/**
 * Represents a utility class for mathematical operations.
 */
interface math {
    /**
     * Calculates the dot product of two vectors.
     * @param {number[]} vector1 - The first vector.
     * @param {number[]} vector2 - The second vector.
     * @returns {number} The dot product of the two vectors.
     */
    dot(vector1: number[], vector2: number[]): number;

    /**
     * Normalizes a vector.
     * @param {number[]} vector1 - The vector to normalize.
     * @returns {number[]} The normalized vector.
     */
    normalize(vector1: number[]): number[];

    /**
     * Returns the absolute value of a number.
     * @param {number} num - The number to calculate the absolute value of.
     * @returns {number} The absolute value of the number.
     */
    abs(num: number): number;

    /**
     * Calculates the floor of a number.
     * @param {number} num - The number to calculate the floor for.
     * @returns {number} The largest integer less than or equal to the given number.
     */
    floor(num: number): number;

    /**
     * Calculates the ceil of a number.
     * @param {number} num - The number to calculate the ceil for.
     * @returns {number} The smallest integer greater than or equal to the given number.
     */
    ceil(num: number): number;

    /**
     * Calculates the truncation of a number.
     * @param {number} num - The number to calculate the truncation for.
     * @returns {number} The integer part of the given number.
     */
    trunc(num: number): number;

    /**
     * Returns the fractional part of a number.
     * @param {number} num - The number to extract the fractional part from.
     * @returns {number} The fractional part of the number.
     */
    fracPart(num: number): number;

    /**
     * Calculates the greatest common divisor (GCD) of two numbers.
     * @param {number} a - The first number.
     * @param {number} b - The second number.
     * @returns {number} The GCD of the two numbers.
     */
    GCD(a: number, b: number): number;

    /**
     * Calculates the least common divisor (LCD) of two numbers.
     * @param {number} a - The first number.
     * @param {number} b - The second number.
     * @returns {number} The LCD of the two numbers.
     */
    LCD(a: number, b: number): number;

    /**
     * Rounds a number to a specified number of decimal places using a specified base.
     * @param {number} num - The number to round.
     * @param {number} digits - The number of decimal places to round to.
     * @param {number} base - The base to use for rounding. Defaults to 10 if not provided.
     * @returns {number} The rounded number.
     */
    toFixedNumber(num: number, digits: number, base?: number): number;

    /**
     * Returns the number of decimal places in a given number.
     * @param {number} num - The number to count the decimal places of.
     * @returns {number} The number of decimal places in the given number.
     */
    countDecimals(num: number): number;

    /**
     * Checks if two numbers are approximately equal within a specified tolerance.
     * @param {number} x - The first number to compare.
     * @param {number} y - The second number to compare.
     * @param {number} tolerance - The maximum difference allowed between the numbers. Defaults to Number.EPSILON.
     * @returns {boolean} `true` if the numbers are approximately equal, `false` otherwise.
     */
    equal(x: number, y: number, tolerance?: number): boolean;

    /**
     * Checks if a given number is a power of two.
     * @param {number} n - The number to check.
     * @returns {boolean} `true` if the number is a power of two, `false` otherwise.
     */
    isPowerOfTwo(n: number): boolean;

    /**
     * Finds the next power of two for a given number.
     * @param {number} n - The number for which to find the next power of two.
     * @returns {number} The next power of two for the given number.
     */
    nextPowerOfTwo(n: number): number;

    /**
     * Returns the sign of a number.
     * @param {number} num - The number to determine the sign of.
     * @returns {number} The sign of the number: -1 if negative, 0 if zero, 1 if positive.
     */
    sign(num: number): number;
}
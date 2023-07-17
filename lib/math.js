"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class math {
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Vector operations
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /**
    * Calculates the dot product of two vectors.
    * @public
    * @static
    * @param {number[]} vector1 - The first vector.
    * @param {number[]} vector2 - The second vector.
    * @returns {number} The dot product of the two vectors.
    */
    static dot(vector1, vector2) {
        let dotProduct = 0;
        for (let i = 0; i < vector1.length; i++) {
            dotProduct += vector1[i] * vector2[i];
        }
        return dotProduct;
    }
    /**
     * Normalizes a vector.
     * @public
     * @static
     * @param {number[]} vector1 - The vector to normalize.
     * @returns {number[]} The normalized vector.
     */
    static normalize(vector1) {
        let scalar = 1 / (Math.sqrt(vector1.map(x => Math.pow(x, 2)).reduce((acc, x) => acc + x)));
        return vector1.map((entry) => entry * scalar);
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
    static abs(num) {
        if (num < 0) {
            return num * -1;
        }
        else {
            return num;
        }
    }
    /**
     * Calculates the floor of a number
     * @param {number} num - The number to calculate the floor for.
     * @returns {number} The largest integer less than or equal to the given number.
     */
    static floor(num) {
        return Math.floor(num);
    }
    /**
     * Calculates the ceil of a number
     * @param {number} num - The number to calculate the ceil for.
     * @returns {number} The smallest integer greater than or equal to the given number.
     */
    static ceil(num) {
        return Math.ceil(num);
    }
    /**
     * Calculates the truncation of a number
     * @param  {number} num - The number to calculate the truncation for.
     * @returns {number} The integer part of the given number.
     */
    static trunc(num) {
        return Math.trunc(num);
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
    static fracPart(num) {
        const abs = this.abs(num);
        const frac = abs - this.trunc(abs);
        return Number(frac.toFixed(this.countDecimals(abs)));
    }
    /**
        Calculates the greatest common divisor (GCD) of two numbers.
        @public
        @static
        @param {number} a - The first number.
        @param {number} b - The second number.
        @returns {number} The GCD of the two numbers.
    */
    static GCD(a, b) {
        if (b === 0) {
            return a;
        }
        return this.GCD(b, a % b);
    }
    /**
     * Calculates the least common divisor (LCD) of two numbers.
     *  @public
     *  @static
        @param {number} a - The first number.
        @param {number} b - The second number.
        @returns {number} The LCD of the two numbers.
     */
    static LCD(a, b) {
        // Calculate the GCD (Greatest Common Divisor) using the Euclidean algorithm
        const gcd = this.GCD(a, b);
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
    static toFixedNumber(num, digits, base = 10) {
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
    static countDecimals(num) {
        if (Number.isInteger(num)) {
            return 0;
        }
        else {
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
    static equal(x, y, tolerance = constants_1.default.DELTA) {
        return this.abs(x - y) < tolerance;
    }
    /**
        * Checks if a given number is a power of two
        *  @public
        *  @static
        * @param {number} n The number to check
        * @returns {boolean} 'true' if a power of two 'false' otherwise
        */
    static isPowerOfTwo(n) {
        return (n & (n - 1)) === 0;
    }
    /**
     * Method used to find the next power of two for a given number.
     *  @public
     *  @static
     * @param {number} n - The number for which to find the next power of two.
     * @returns {number} The next power of two for the given number.
     */
    static nextPowerOfTwo(n) {
        let count = 0;
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
    static sign(num) {
        let sign = 0;
        if (num < 0) {
            sign = -1;
        }
        else if (num > 0) {
            sign = 1;
        }
        return sign;
    }
}
exports.default = math;
//# sourceMappingURL=math.js.map
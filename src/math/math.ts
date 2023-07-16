
export default class math {



    /**
     * Returns the absolute value of a number.
     *
     * @param {number} num - The number to calculate the absolute value of.
     * @returns The absolute value of the number.
     */
    public static abs(num: number): number {
        if (num < 0) {
            return num * -1;
        } else {
            return num;
        }
    }






    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * floor, ceil and trunc
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Calculates the floor of a number
     * @param {number} num - The number to calculate the floor for.
     * @returns {number} The largest integer less than or equal to the given number.
     */
    public static floor(num: number): number {
        return Math.floor(num)
    }

    /**
     * Calculates the ceil of a number
     * @param {number} num - The number to calculate the ceil for.
     * @returns {number} The smallest integer greater than or equal to the given number.
     */
    public static ceil(num: number): number {
        return Math.ceil(num)
    }

    /**
     * Calculates the truncation of a number
     * @param  {number} num - The number to calculate the truncation for.
     * @returns {number} The integer part of the given number.
     */
    public static trunc(num: number): number {
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
    public static fracPart(num: number): number {
        const abs: number = this.abs(num)
        return abs - this.trunc(abs)
    }

    /**
        Calculates the greatest common divisor (GCD) of two numbers.
        @public
        @static
        @param {number} a - The first number.
        @param {number} b - The second number.
        @returns {number} The GCD of the two numbers. 
    */
    public static GCD(a: number, b: number): number {
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
    public static LCD(a: number, b: number): number {
        // Calculate the GCD (Greatest Common Divisor) using the Euclidean algorithm
        const gcd = this.GCD(a, b);

        // Calculate the LCD using the formula: LCD = (a * b) / GCD
        const lcd = (a * b) / gcd;

        return lcd;
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Utility functions
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Checks if two numbers are approximately equal within a specified tolerance.
     * @param {number} x - The first number to compare.
     * @param {number} y - The second number to compare.
     * @param {number} tolerance - The maximum difference allowed between the numbers. Defaults to Number.EPSILON.
     * @returns {boolean} 'true' if the numbers are approximately equal, 'false' otherwise.
     */
    public static equal(x: number, y: number, tolerance: number = Number.EPSILON): boolean {
        return this.abs(x - y) < tolerance;
    }


    /**
        * Checks if a given number is a power of two
        *  @public
        *  @static
        * @param {number} n The number to check
        * @returns {boolean} 'true' if a power of two 'false' otherwise
        */
    public static isPowerOfTwo(n: number): boolean {
        return (n & (n - 1)) === 0;
    }


    /**
     * Method used to find the next power of two for a given number.
     *  @public
     *  @static
     * @param {number} n - The number for which to find the next power of two.
     * @returns {number} The next power of two for the given number.
     */
    public static nextPowerOfTwo(n: number): number {
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
     * Rounds a number to a specified number of decimal places using a specified base.
     * @public
     * @static
     * @param {number} num - The number to round.
     * @param {number} digits - The number of decimal places to round to.
     * @param {number} base - The base to use for rounding.Defaults to 10 if not provided.
     * @returns {number} The rounded number.
     */
    public static toFixedNumber(num: number, digits: number, base: number = 10): number {
        const pow = Math.pow(base, digits);
        return Math.round(num * pow) / pow;
    }



    /**
     * Returns the sign of a number.
       @public
       @static
     * @param {number} num - The number to determine the sign of.
     * @returns {number} The sign of the number: -1 if negative, 0 if zero, 1 if positive.
     */
    public static sign(num: number): number {
        let sign: number = 0;

        if (num < 0) {
            sign = -1;
        } else if (num > 0) {
            sign = 1;
        }

        return sign;
    }




}
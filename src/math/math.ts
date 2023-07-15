
export default class math {

    /**
     * Checks if a given number is a power of two
     * @param {number} n The number to check
     * @returns {boolean} 'true' if a power of two 'false' otherwise
     */
    public static isPowerOfTwo(n: number): boolean {
        return (n & (n - 1)) === 0;
    }


    /**
     * Method used to find the next power of two for a given number.
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
     * @param {number} num - The number to round.
     * @param {number} digits - The number of decimal places to round to.
     * @param {number} base - The base to use for rounding.Defaults to 10 if not provided.
     * @returns {number} The rounded number.
     */
    public static toFixedNumber(num: number, digits: number, base: number = 10): number {
        const pow = Math.pow(base, digits);
        return Math.round(num * pow) / pow;
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Utility methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
        Calculates the greatest common divisor (GCD) of two numbers.
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




}
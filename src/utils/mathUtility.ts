
class MathUtility {

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

}

declare module "Matrix" {

    /**
     * Represents a matrix of type T.
     * @template T - The type of the matrix elements.
     */
    export interface Matrix<T> {
        /**
          * The shape of the matrix.
          * @type {string}
          */
        shape: string;
        /**
         * Indicates whether the matrix is square.
         * @type {boolean}
         */
        isSquare: boolean;
        /**
         * Indicates whether the matrix is tall (more rows than columns).
         * @type {boolean}
         */
        isTall: boolean;
        /**
         * Indicates whether the matrix is wide (more columns than rows).
         * @type {boolean}
         */
        isWide: boolean;
        /**
         * The number of rows in the matrix.
         * @type {number}
         */
        rows: number;
        /**
         * The number of columns in the matrix.
         * @type {number}
         */
        columns: number;
        /**
         * The total number of elements in the matrix.
         * @type {number}
         */
        size: number;
        /**
         * The elements of the matrix.
         * @type {Array<T>}
         */
        mElements: Array<T>;
        /**
         * The data type of the matrix elements.
         * @type {string}
         */
        dataType: string;


        /**
         * Constructs a matrix object.
         * @param {T[][] | T[]} entries - The entries of the matrix.
         * @param {number} rows - The number of rows in the matrix.
         * @param {number} columns - The number of columns in the matrix.
         */
        constructor(entries: T[][] | T[], rows?: number, columns?: number): Matrix<T>

        /**
        * Gets the value of an element in the matrix.
        * @public
       * @param {number} row - The row index of the element starts from zero.
        * @param {number} column - The row index of the element starts from zero.
        * @returns {T} The value of the element.
        * @throws {MatrixError} - If index is out of bounds
        */
        getElement(row: number, column: number): T;
        /**
         * Gets a specific row of the matrix.
         * @public
         * @param {number} rowIndex - The index of the row to retrieve (starting from 1).
         * @returns {T[]} An array representing the specified row of the matrix.
         * @throws {MatrixError} If the rowIndex is out of bounds.
         */
        getRow(rowIndex: number): T[];
        /**
         * Gets a specific column of the matrix.
         * @public
         * @param {number} columnIndex - The index of the column to retrieve (starting from 1).
         * @returns {T[]} An array representing the specified column of the matrix.
         * @throws {MatrixError} If the columnIndex is out of bounds.
         */
        getColumn(columnIndex: number): T[];
        /**
         * Sets the value of an element in the matrix.
         * @public
         * @param {number} row - The row index of the element starts from zero.
         * @param {number} column - The row index of the element starts from zero.
         * @param {T} value - The value to set.
         * @returns {void}
         * @throws {MatrixError} - If the value is an invalid element or index is out of bounds
         */
        setElement(row: number, column: number, value: T): void;
        /**
         * Retrieves a submatrix from the current matrix.
         * @public
         * @param {number} startRow - The starting row index of the submatrix.
         * @param {number} startCol - The starting column index of the submatrix.
         * @param {number} endRow - The ending row index of the submatrix (exclusive).
         * @param {number} endCol - The ending column index of the submatrix (exclusive).
         * @returns {Matrix<T>} A new Matrix object representing the submatrix.
         */
        getSubMatrix(startRow: number, endRow: number, startCol: number, endCol: number): Matrix<T>;
        /**
        * @public
        * @param {number} startRow - The starting row index of the submatrix.
          @param {number} endRow - The ending row index of the submatrix.
        * @param {number} startCol - The starting column index of the submatrix.
        * @param {number} endCol - The ending column index of the submatrix.
        * @param {Matrix<T>} subMatrix - The elements of the submatrix to be set.
        */
        setSubMatrix(startRow: number, endRow: number, startCol: number, endCol: number, subMatrix: Matrix<T>): void;
        /**
         * Adds another matrix to this matrix.
         * @public
         * @param { Matrix<number> } B - The matrix to add.
         * @returns {Matrix<number>} The resulting matrix.
         */
        add(B: Matrix<number>): Matrix<number>;
        /**
             * Performs the Gram-Schmidt process for the columns of the given matrix. The process is an algorithm
             * to orthonormalize a set of vectors in an inner product space, generally Euclidean n-space.
             *
             * The method takes the columns (considered as vectors) of the current matrix instance and generates an orthogonal
             * set of vectors that spans the same column space as the original set. The set of orthonormal vectors is computed
             * sequentially by subtracting the projections of a matrix column vector onto the previously computed orthogonal
             * vectors from the column vector itself.
             *
             * @returns {Matrix<number>} A new Matrix instance constructed using the orthonormal vectors as columns.
             *
             * @throws {MatrixError} If any column obtained during the process is nearly zero (having euclidean norm lesser than a small
             * constant - `DELTA`). In this case, this means that the provided set is not linearly independent.
             *
             * @public
             */
        gramSmith(): Matrix<number>;
        /**
         * Multiplies this matrix with another matrix using the naive algorithm
         * @public
         * @param {Matrix<number>} B - The matrix to multiply with.
         * @returns {Matrix<number>} The resulting matrix.
         */
        multiply(B: Matrix<number>): Matrix<number>;
        /**
         * Raises the matrix to the power of `exp`.
         *
         * @param exp - The exponent to raise the matrix to.
         * @returns { Matrix<number>} The resulting matrix after raising it to the power of `exp`.
         * @throws {MatrixError} if the matrix is not square.
         */
        pow(exp: number): Matrix<number>;
        /**
         * Scales the matrix and returns a new matrix with the result of the scaling
         * @public
         * @param {number} scalar - The scalar to scale the matrix with
         * @returns { Matrix<number>} The scaled matrix
         */
        scale(scalar: number): Matrix<number>;
        /**
           * Performs matrix multiplication using the Strassen's algorithm.
           * @public
           * @param { Matrix<number>} B - The matrix to multiply with.
           * @returns { Matrix<number>} The result of matrix multiplication.
           */
        strassenMultiply(B: Matrix<number>): Matrix<number>;
        /**
         * Subtracts another matrix from this matrix.
         * @public
         * @param { Matrix<number>} B - The matrix to subtract.
         * @returns { Matrix<number>} The resulting matrix.
         */
        subtract(B: Matrix<number>): Matrix<number>;
        /**
         * Performs vector-matrix multiplication by multiplying each element of the matrix by the corresponding element in the input vector.
         * @param {number[]} vector - The input vector.
         * @returns {Matrix<number>} A new matrix resulting from the vector-matrix multiplication.
         * @throws {MatrixError} If the input vector is not an array or if its length doesn't match the number of columns in the matrix.
         */
        vMultiply(vector: number[]): Matrix<number>;
        /**
         * Performs back-substitution on an upper triangular matrix to solve
         * a system of linear equations.
         * @public
         * @returns {number[]} Solution to the system of linear equations
         *
         * @throws {MatrixError} if the matrix is not upper traiangluar, if b is not an array or if the matrix contains a zero on the diagonal (unsolvable system)
         */
        backSubstitution(b: number[]): number[];
        /**
         * Performs forward-substitution on an lower triangular matrix to solve
         * a system of linear equations.
         * @public
         *
         * @returns {number[]} Solution to the system of linear equations
         * @throws {MatrixError} if the matrix is not lowerf traiangluar, if b is not an array or if the matrix contains a zero on the diagonal (unsolvable system)
         */
        forwardSubstitution(b: number[]): number[];
  /**
   * Converts the matrix to Reduced Row Echelon Form (RREF).
   * This method does not modify the original matrix.
   * @public
   * @param {Object} options - The options for the Gauss-Jordan elimination.
   * @param {boolean} options.solve - Indicates whether to solve the system of equations after performing Gauss-Jordan elimination. Default is false.
   * @returns {Matrix<number> | number[]} A new matrix that is the REF of the original matrix if `options.solve` is false. If `options.solve` is true, it returns the solution to the system of equations as an array.
  */ gaussianElimination(options?: {
            solve?: boolean;
        }): Matrix<number> | number[];
  /**
   * Converts the matrix to Reduced Row Echelon Form (RREF).
   * This method does not modify the original matrix.
   * @public
    * @param {boolean} options.solve - Indicates whether to solve the system of equations after performing Gauss-Jordan elimination. Default is false.
   * @returns { Matrix<number>  | number[]} A new matrix that is the REF of the original matrix if `options.solve` is false. If `options.solve` is true, it returns the solution to the system of equations as an array.
  */ gaussJordan(options?: {
            solve?: boolean;
        }): Matrix<number> | number[];
        /**
         * Performs QR decomposition on the matrix.
         * @returns { { Q: Matrix, R: Matrix } } An object containing the Q and R matrices.
         */
        QRDecomposition(): {
            Q: Matrix<number>;
            R: Matrix<number>;
        };
        /**
         * Augments the current matrix with another matrix.
         * @param {Matrix<T>} B  - The matrix to be augmented with.
         * @returns {Matrix<T>} A new matrix that is the result of augmenting the current matrix with the provided matrix.
         * @throws {MatrixError} If the argument is not an instance of Matrix, or if the current matrix and the provided matrix do not have the same number of rows.
         */
        augment(B: Matrix<T>): Matrix<T>;
        /**
         * Transposes a matrix.
         * @public
         * @returns {Matrix<T>} The transposed matrix.
         */
        transpose(): Matrix<T>;
        /**
        Inverts a square matrix.
        @returns { Matrix<number>} The inverse of the square matrix.
        @throws {MatrixError} If the matrix is not square.
        */
        invertSquare(): Matrix<number>;
        /**
         * Inverts an upper triangular matrix.
         *
         * This function computes the inverse of an upper triangular matrix. If the matrix
         * is not square (meaning, the number of rows doesn't match the number of columns),
         * an error is thrown. To perform this inversion, an identity matrix is created
         * first. Then the function applies back substitution on each element in the
         * identity matrix, storing the results in a separate array. These results are
         * transposed, reversed, and returned
         *
         * @returns { Matrix<number>} The inverted upper triangular matrix.
         *
         * @throws {MatrixError} If the original matrix is not square or an upper triangular matrix, an error is thrown.
         */
        invertUpper(): Matrix<number>;
        /**
         * Inverts a lower triangular matrix.
         *
         * This function computes the inverse of an upper lower matrix. If the matrix
         * is not square (meaning, the number of rows doesn't match the number of columns),
         * an error is thrown. To perform this inversion, an identity matrix is created
         * first. Then the function applies foward substitution on each element in the
         * identity matrix, storing the results in a separate array. These results are
         * transposed, reversed, and returned.
         *
         * @returns { Matrix<number>} The inverted lower triangular matrix.
         *
         * @throws {MatrixError} If the original matrix is not square or a lower triangular matrix , an error is thrown.
         */
        invertLower(): Matrix<number>;
        /**
         * Checks if the current matrix is equal to another matrix.
         * @param {Matrix<T>} B - The matrix to compare with.
         * @returns {boolean} 'true' if the matrices are equal, 'false' otherwise.
         */
        equal(B: Matrix<T>): boolean;
        /**
         * Prints the matrix in a formatted way.
         * @public
         * @returns {void}
         */
        print(): void;
        /**
         * Converts the matrix to a 2D array.
         * @public
         * @returns {TexImageSource[][]} The matrix as a 2D array.
         */
        toArray(): T[][];
        /**
         * Converts the matrix to a printable string
         * @public
         * @returns {string} The printable matrix in a nice format
         */
        toString(): string;
        /**
         * Reshapes a 1D array into a matrix with the specified number of rows and columns.
         * @public
         * @static
         * @param {any[]} array - The 1D array to reshape.
         * @param {number} newRows - The number of rows in the reshaped matrix.
         * @param {number} newColumns - The number of columns in the reshaped matrix.
         * @returns {Matrix<any>} The reshaped matrix.
         * @throws {MatrixError} - If the length of the array is not equal to newRows * newColumns.
         */

    }

}


declare module "math" {
    /**
     * Represents a utility class for mathematical operations.
     */
    export interface math {
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



}

declare module "Constants" {
    /**
 * A class that contains various mathematical constants.
 */
    export interface Constants {
        /**
         * A small value used for comparing floating-point numbers.
         * Can be used for precision comparisons in mathematical calculations.
         */
        readonly DELTA: number;
        /**
         * The mathematical constant pi (approximately 3.14159).
         * Can be used for calculations involving circles, angles, and trigonometry.
         */
        readonly PI: number;
        /**
         * The mathematical constant tau, which is equal to 2 * pi (approximately 6.28318).
         * Can be used as a more convenient representation of the circle constant.
         */
        readonly TAU: number;
        /**
         * The mathematical constant e (approximately 2.71828).
         * Can be used for calculations involving exponential growth and decay.
         */
        readonly E: number;
        /**
         * The square root of 5 (approximately 2.23607).
         * Can be used in calculations involving the golden ratio and Fibonacci numbers.
         */
        readonly SQRT5: number;
        /**
         * The square root of 3 (approximately 1.73205).
         * Can be used in calculations involving equilateral triangles and hexagons.
         */
        readonly SQRT3: number;
        /**
         * The square root of 2 (approximately 1.41421).
         * Can be used in calculations involving right triangles and diagonal lengths.
         */
        readonly SQRT2: number;
        /**
         * The square root of 1/2 (approximately 0.70711).
         * Can be used in calculations involving scaling and normalization.
         */
        readonly SQRT1_2: number;
        /**
         * The twelfth root of 12 (approximately 1.05946).
         * Can be used in calculations involving musical intervals and pitch ratios.
         */
        readonly TWELFTH_SQRT12: number;
        /**
         * The cube root of 3 (approximately 1.44225).
         * Can be used in calculations involving exponential functions and logarithms.
         */
        readonly CSQRT3: number;
        /**
         * The cube root of 2 (approximately 1.25992).
         * Can be used in calculations involving exponential functions and logarithms.
         */
        readonly CSQRT2: number;
        /**
         * The super golden ratio (approximately 1.46557).
         * Can be used in calculations involving aesthetics and design.
         */
        readonly SUPER_GOLDEN_RATIO: number;
        /**
         * The golden ratio (approximately 1.61803).
         * Can be used in calculations involving aesthetics, design, and proportions.
         */
        readonly GOLDEN_RATIO: number;
        /**
         * The silver ratio (approximately 2.41421).
         * Can be used in calculations involving aesthetics, design, and proportions.
         */
        readonly SILVER_RATIO: number;
    }

}
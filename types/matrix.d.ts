import { MatrixTypes } from "./@interfaces";
export default class Matrix<T> implements MatrixTypes<T> {
    shape: string;
    isSquare: boolean;
    isTall: boolean;
    isWide: boolean;
    rows: number;
    columns: number;
    size: number;
    mElements: T[];
    dataType: string;
    /**
     * Constructs a matrix object.
     * @param {T[][] | T[]} entries - The entries of the matrix.
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix.
     */
    constructor(entries: T[][] | T[], rows?: number, columns?: number);
    /**
        Retrieves the name of the interface or class of a given value.
        @template {T} T - The type of the value.
        @param {T} value - The value to retrieve the interface or class name from.
        @returns {string} The name of the interface or class.
    */
    private getInterfaceName;
    /**
        Retrieves the type of a given value.
        @template T - The type of the value.
        @param value - The value to retrieve the type from.
        @returns The type of the value.
    */
    private getType;
    /**
    Checks if the given entries are a one-dimensional array of a specific type.
    @template T - The type of the array elements.
    @param entries - The entries to check.
    @returns True if the entries are a one-dimensional array of type T, false otherwise.
    */
    private is1dArray;
    /**
     * Validates the entries of a 1d T array to ensure they are valid.
     * @private
     * @param {T} entries - The entries of the matrix.
     * @returns {void}
     */ private valida1Dentries;
    /**
    * Updates all aspects of Matrix.
    * @private
    * @returns {void}
    */
    private updateMatrix;
    /**
     * Updates matrix-related specifcation
     * @private
     * @returns {void}
     */
    private updateSpecification;
    /**
     * Updates the shape of the Matrix.
     * @private
     * @returns {void}
     */
    private updateShape;
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
    static reshape(array: any[], newRows: number, newColumns: number): Matrix<any>;
    /**
    * Clones the matrix instance and returns the clone
    * @public
    * @static
    * @returns {Matrix<any>} The cloned matrix
    */
    static clone(A: Matrix<any>): Matrix<any>;
    /**
     * Method used to pad the matrix dimensions to the nearest power of two.
     * @public
     * @static
     * @param {Matrix<number>} A - The matrix to pad
     * @returns {Matrix<number>} The padded matrix with dimensions as a power of two.
     */
    static padMatrixToPowerOfTwo(A: Matrix<number>): Matrix<number>;
    /**
     * Rounds values close to zero in the given array and modifies the matrix in place
     * @public
     * @static
     * @param { Matrix<number>} A - Matrix consisting of numbers
     * @param {number} threshold - The threshold value for rounding to zero. Default is 1e-7.
     * @returns {void}
     */
    static roundMatrixToZero(A: Matrix<number>, threshold?: number): void;
    /**
     * Rounds all elements of a matrix in place to a specified number of decimal places using a specified base.
     * @public
     * @static
     * @param {Matrix} A - The matrix to round.
     * @param {number} digits - The number of decimal places to round to.
     * @param {number} base - The base to use for rounding. Defaults to 10 if not provided.
     * @returns {void}
     */
    static toFixedMatrix(A: Matrix<number>, digits: number, base?: number): void;
    /**
     * Creates an identity matrix with the specified dimension.
     * @public
     * @static
     * @param {number} dimension - The dimension of the identity matrix.
     * @returns {Matrix} The identity matrix.
     * @throws {MatrixError} - If the dimension is less than or equal to 0.
     */
    static identity(dimension: number): Matrix<number>;
    /**
     * Creates a matrix filled with ones with the specified number of rows and columns.
     * @public
     * @static
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix.
     * @returns {Matrix} - The matrix filled with ones.
     * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
     */
    static ones(rows: number, columns: number): Matrix<number>;
    /**
     * Creates a random matrix with the specified number of rows and columns.
     * @public
     * @static
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix
     * @returns {Matrix} The randomized matrix
     * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
     */
    static random(rows: number, columns: number): Matrix<number>;
    /**
     * Creates a matrix filled with zeros with the specified number of rows and columns.
     * @public
     * @static
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix.
     * @returns {Matrix} - The matrix filled with zeros.
     * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
     */
    static zeros(rows: number, columns: number): Matrix<number>;
    /**
     * Checks if a given matrix contains only integer elements.
     * @param A - The matrix to check.
     * @returns True if all elements in the matrix are integers, false otherwise.
     * @throws {MatrixError} If the argument is not an instance of Matrix.
     */
    static isIntMatrix(A: Matrix<number>): boolean;
    /**
    * This method checks if the matrix is lower triangular.
    * A matrix is said to be lower triangular if all its entries above the main diagonal are zero.
    * @public
    * @static
    * @param {Matrix} A - The matrix to checkF
    * @return {Boolean} - Returns true if the matrix is lower triangular, false otherwise.
    */
    static isLowerTriangular(A: Matrix<any>): Boolean;
    /**

    /**
     * This method checks if the given matrix is upper triangular.
     * A matrix is said to be upper triangular if all its entries below the main diagonal are zero.
     * @public
     * @static
     * @param {Matrix} A - The matrix to checkF
     * @return {Boolean}  Returns true if the matrix is upper triangular, false otherwise.
     */
    static isUpperTriangular(A: Matrix<any>): boolean;
}

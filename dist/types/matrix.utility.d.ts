import Matrix from "./matrix";
export default class MatrixUtils {
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
}

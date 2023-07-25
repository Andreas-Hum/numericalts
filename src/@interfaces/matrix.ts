import { Numerical } from "./numerical"

export { Matrix as MatrixInterface }
interface Matrix<T> {
    /*
    * The shape of the matrix.
    * @type {string}
    */
    shape: string
    /**
     * Indicates whether the matrix is square.
     * @type {boolean}
     */
    isSquare: boolean
    /**
     * Indicates whether the matrix is tall (more rows than columns).
     * @type {boolean}
     */
    isTall: boolean
    /**
     * Indicates whether the matrix is wide (more columns than rows).
     * @type {boolean}
     */
    isWide: boolean
    /**
     * The number of rows in the matrix.
     * @type {number}
     */
    rows: number
    /**
     * The number of columns in the matrix.
     * @type {number}
     */
    columns: number
    /**
     * The total number of elements in the matrix.
     * @type {number}
     */
    size: number
    /**
     * The elements of the matrix.
     * @type {Array<T>}
     */
    mElements: Array<T>
    /**
     * The data type of the matrix elements.
     * @type {string}
     */
    dataType: string

    /**
     * The numercal class to use for calculations
     * @type {Numerical<T>}
     */
    numerical: Numerical<T>

    add(B: Matrix<T>): Matrix<T>
    multiply(B: Matrix<T>): Matrix<T>
    pow(exp: number): Matrix<T>
    scale(scalar: number): Matrix<T>
    subtract(B: Matrix<T>): Matrix<T>
    vMultiply(vector: T[]): Matrix<T>
    backSubstitution(b: T[]): T[]
    forwardSubstitution(b: T[]): T[]
    gaussianElimination(options: { solve?: boolean }): Matrix<T> | T[]
    gaussJordan(options: { solve?: boolean }): Matrix<T> | T[]
    QRDecomposition(): { Q: Matrix<T>, R: Matrix<T> }
    invertSquare(): Matrix<T>
    invertUpper(): Matrix<T>
    invertLower(): Matrix<T>
    augment(B: Matrix<T>): Matrix<T>
    equal(B: Matrix<T>): boolean
    gramSmith(): Matrix<T>
    print(): void
    toArray(): T[][]
    transpose(): Matrix<T>
    toString(): string

}

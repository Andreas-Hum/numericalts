export {Matrix as MatrixInterface}
interface Matrix<T>  {
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

    add(B: Matrix<number>): Matrix<number>
    multiply(B: Matrix<number>): Matrix<number>
    pow(exp: number): Matrix<number>
    scale(scalar: number): Matrix<number>
    subtract(B: Matrix<number>): Matrix<number>
    vMultiply(vector: number[]): Matrix<number>
    backSubstitution(b: number[]): number[]
    forwardSubstitution(b: number[]): number[]
    gaussianElimination(options: { solve?: boolean }): Matrix<number> | number[]
    gaussJordan(options: { solve?: boolean }): Matrix<number> | number[]
    QRDecomposition(): { Q: Matrix<number>, R: Matrix<number> }
    invertSquare(): Matrix<number>
    invertUpper(): Matrix<number>
    invertLower(): Matrix<number>
    augment(B: Matrix<T>): Matrix<T>
    equal(B: Matrix<T>): boolean
    gramSmith(): Matrix<number>
    print(): void
    toArray(): T[][]
    transpose(): Matrix<T>
    toString(): string

}

// Interface import
import { MatrixInterface } from "./@interfaces/matrix";


// Error import
import { MatrixError, NumericalError } from "./@error.types/index";

// Math class  import
import { math } from "./math";

// Utility import
import { Constants } from "./constants";

//Numerical interface/classes
import { Numerical, NumericalBigInt, NumericalNumber } from "./@interfaces";





export class Matrix<T>{


    /**
    * The shape of the matrix.
    * @type {string}
    */
    shape: string = "0"
    /**
     * Indicates whether the matrix is square.
     * @type {boolean}
     */
    isSquare: boolean = false
    /**
     * Indicates whether the matrix is tall (more rows than columns).
     * @type {boolean}
     */
    isTall: boolean = false
    /**
     * Indicates whether the matrix is wide (more columns than rows).
     * @type {boolean}
     */
    isWide: boolean = false
    /**
     * The number of rows in the matrix.
     * @type {number}
     */
    rows: number = Infinity
    /**
     * The number of columns in the matrix.
     * @type {number}
     */
    columns: number = Infinity
    /**
     * The total number of elements in the matrix.
     * @type {number}
     */
    size: number = Infinity
    /**
     * The elements of the matrix.
     * @type {Array<T>}
     */
    mElements: Array<T> = []
    /**
     * The data type of the matrix elements.
     * @type {string}
     */
    dataType: string = ""


    /**
     * The numercal class to use for calculations
     * @type {Numerical<T>}
     */
    numerical: Numerical<T>


    /**
     * Constructs a matrix object.
     * @param {T[][] | T[]} entries - The entries of the matrix.
     * @param {{ rows?: number, columns?: number, numerical?: Numerical<T> }} options - The options for the matrix class
     * @param {number} options.rows - The number of rows in the matrix.
     * @param {number} options.columns - The number of columns in the matrix.
     */
    constructor(entries: T[][] | T[], options?: { rows?: number, columns?: number, numerical?: Numerical<T> }) {
        if (!Array.isArray(entries)) {
            throw new MatrixError("Matrix has to be an array", 801, { entries });
        }

        if (this.is1dArray(entries)) {
            const rows: number | undefined = options.rows;
            const columns: number | undefined = options.columns;

            if (rows === undefined || columns === undefined || typeof (rows) !== "number" || typeof (columns) !== "number" || columns <= 0 || rows <= 0) {
                throw new MatrixError("Rows and columns must be defined for 1D array entries, rows and columns must be of type number and not be 0 or negative", 804);
            }

            if (entries.length !== rows * columns) {
                throw new MatrixError("Rows and columns multiplied together has to equal the length of the 1d array", 804);
            }
            this.valida1Dentries(entries);
            this.mElements = entries;
            this.rows = rows;
            this.columns = columns;
            this.size = rows * columns;
        } else {

            if (!entries.every((entry: T[]) => Array.isArray(entry))) {
                throw new MatrixError("Invalid Matrix format", 804);
            }

            if (entries.some((entry: T[]) => entry.length !== entries[0].length)) {
                throw new MatrixError("Matrix rows are now of the same length", 804);
            }

            const numRows: number = entries.length;
            const numCols: number = entries[0].length;

            this.mElements = entries.flat();

            if (this.mElements.some((entry: T) => Array.isArray(entry))) {
                throw new MatrixError("Matrix cannot be of a depth greater than one", 804);
            }

            this.valida1Dentries(this.mElements);

            this.rows = numRows;
            this.columns = numCols;
            this.size = numRows * numCols;
        }

        if (options === undefined || options.numerical === undefined) {
            if (this.dataType === "number") {
                this.numerical = new NumericalNumber() as unknown as Numerical<T>;
            } else if (this.dataType === "bigint") {
                this.numerical = new NumericalBigInt() as unknown as Numerical<T>;
            } else {
                //TODO: Maybe fix this to throw error instead
                throw new NumericalError("Matrix datatype is neither a number nor a bigint and no appropriate Numeric implementation was provided.", 901);
            }



        }


        this.updateMatrix()
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Typeguards
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    /**
        Retrieves the name of the interface or class of a given value.
        @template {T} T - The type of the value.
        @param {T} value - The value to retrieve the interface or class name from.
        @returns {string} The name of the interface or class. 
    */
    private getInterfaceName<T>(value: T): string {
        //@ts-ignore
        return (value.constructor as { name: string }).name;
    }

    /**
        Retrieves the type of a given value.
        @template T - The type of the value.
        @param value - The value to retrieve the type from.
        @returns The type of the value.
    */
    private getType<T>(value: T): string {
        return typeof value
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Validation and updating
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    /**
    Checks if the given entries are a one-dimensional array of a specific type.
    @template {T} T - The type of the array elements.
    @param {any} entries - The entries to check.
    @returns 'true' if the entries are a one-dimensional array of type T, 'false' otherwise. 
    */
    private is1dArray(entries: any): entries is T[] {
        return !(entries.some((entry: T) => Array.isArray(entry)))
    }


    /**
     * Validates the entries of a 1d T array to ensure they are valid.
     * @private
     * @param {T} entries - The entries of the matrix.
     * @returns {void}
     */ //TODO: make better typecheck
    private valida1Dentries(entries: T[]): void {
        let typeName: string;
        if (typeof entries[0] === "object") {
            typeName = this.getInterfaceName(entries[0])
            for (let i = 0; i < entries.length; i++) {
                if (this.getInterfaceName(entries[i]) !== typeName) {
                    throw new MatrixError("Invalid entries not of the same type", 805, { entry: entries[i] });
                }
            }
        } else {
            typeName = this.getType(entries[0])
            for (let i = 0; i < entries.length; i++) {
                if (this.getType(entries[i]) !== typeName) {
                    throw new MatrixError("Invalid entries not of the same type", 805, { entry: entries[i] });
                }
            }
        }

        this.dataType = typeName;

    }


    /**
    * Updates all aspects of Matrix.
    * @private
    * @returns {void}
    */
    private updateMatrix(): void {
        this.updateSpecification()
        this.updateShape()
    }

    /**
     * Updates matrix-related specifcation
     * @private
     * @returns {void}
     */
    private updateSpecification(): void {
        if (this.rows > this.columns) {
            this.isTall = !this.isTall
        } else if (this.columns > this.rows) {
            this.isWide = !this.isWide
        } else {
            this.isSquare = !this.isSquare
        }
    }


    /**
     * Updates the shape of the Matrix.
     * @private
     * @returns {void}
     */
    private updateShape(): void {
        this.shape = `(${this.rows},${this.columns})`;
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Set- and getter methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
    * Gets the value of an element in the matrix.
    * @public
   * @param {number} row - The row index of the element starts from zero.
    * @param {number} column - The row index of the element starts from zero.
    * @returns {T} The value of the element.
    * @throws {MatrixError} - If index is out of bounds
    */
    public getElement(row: number, column: number): T {
        if (typeof row !== "number" || typeof column !== "number") throw new MatrixError("Invalid arugment", 606, { row, column })
        const index: number = row * this.columns + column;
        if (index > this.size || index < 0) throw new MatrixError("Index out of bounds", 800, { row, column });
        return this.mElements[index];
    }


    /**
     * Gets a specific row of the matrix.
     * @public
     * @param {number} rowIndex - The index of the row to retrieve (starting from 1).
     * @returns {T[]} An array representing the specified row of the matrix.
     * @throws {MatrixError} If the rowIndex is out of bounds.
     */
    public getRow(rowIndex: number): T[] {
        if (typeof rowIndex !== "number")
            throw new MatrixError("Invalid argument", 606, { rowIndex });
        if (rowIndex <= 0 || rowIndex > this.rows)
            throw new MatrixError("Row index out of bounds", 800, { rowIndex });

        const row: T[] = [];
        const startIndex: number = (rowIndex - 1) * this.columns;
        const endIndex: number = startIndex + this.columns;

        for (let i = startIndex; i < endIndex; i++) {
            row.push(this.mElements[i]);
        }

        return row;
    }

    /**
     * Gets a specific column of the matrix.
     * @public
     * @param {number} columnIndex - The index of the column to retrieve (starting from 1).
     * @returns {T[]} An array representing the specified column of the matrix.
     * @throws {MatrixError} If the columnIndex is out of bounds.
     */
    public getColumn(columnIndex: number): T[] {
        if (typeof columnIndex !== "number")
            throw new MatrixError("Invalid argument", 606, { columnIndex });
        if (columnIndex <= 0 || columnIndex > this.columns)
            throw new MatrixError("Column index out of bounds", 800, { columnIndex });

        const column: T[] = [];
        const startIndex: number = columnIndex - 1;
        const endIndex: number = this.rows * this.columns + (columnIndex - 1);

        for (let i = startIndex; i < endIndex; i += this.columns) {
            column.push(this.mElements[i]);
        }

        return column;
    }
    /**
     * Sets the value of an element in the matrix.
     * @public
     * @param {number} row - The row index of the element starts from zero.
     * @param {number} column - The row index of the element starts from zero.
     * @param {T} value - The value to set.
     * @returns {void}
     * @throws {MatrixError} - If the value is an invalid element or index is out of bounds
     */
    public setElement(row: number, column: number, value: T): void {
        if (typeof value !== this.dataType || typeof row !== "number" || typeof column !== "number") throw new MatrixError("Invalid arugment", 606, { value, row, column })
        const index: number = row * this.columns + column;
        if (index > this.size || index < 0) throw new MatrixError("Index out of bounds", 800, { row, column });
        this.mElements[index] = value;
    }

    /**
     * Retrieves a submatrix from the current matrix.
     * @public
     * @param {number} startRow - The starting row index of the submatrix.
     * @param {number} startCol - The starting column index of the submatrix.
     * @param {number} endRow - The ending row index of the submatrix (exclusive).
     * @param {number} endCol - The ending column index of the submatrix (exclusive).
     * @returns {Matrix<T>} A new Matrix object representing the submatrix.
     */
    public getSubMatrix(startRow: number, endRow: number, startCol: number, endCol: number): Matrix<T> {
        if (typeof startRow !== "number" || typeof endRow !== "number" || typeof startCol !== "number" || typeof endCol !== "number") {
            throw new MatrixError("Invalid arugment", 606, { startRow, endRow, startCol, endCol })
        }

        const numRows: number = endRow - startRow;
        const numCols: number = endCol - startCol;
        const submatrixElements: Array<T> = new Array<T>(numRows * numCols);
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                const index: number = i * numCols + j;
                const originalIndex: number = (startRow + i) * this.columns + (startCol + j);
                submatrixElements[index] = this.mElements[originalIndex];
            }
        }
        return new Matrix(submatrixElements, { rows: numRows, columns: numCols });
    }

    /**
    * @public
    * @param {number} startRow - The starting row index of the submatrix.
      @param {number} endRow - The ending row index of the submatrix.
    * @param {number} startCol - The starting column index of the submatrix.
    * @param {number} endCol - The ending column index of the submatrix.
    * @param {Matrix<T>} subMatrix - The elements of the submatrix to be set.
    */
    public setSubMatrix(startRow: number, endRow: number, startCol: number, endCol: number, subMatrix: Matrix<T>): void {
        if (startRow < 0 || startRow >= this.rows || endRow < 0 || endRow >= this.rows || startCol < 0 || startCol >= this.columns || endCol < 0 || endCol >= this.columns) {
            throw new MatrixError("Invalid submatrix indices", 805);
        }

        const subMatrixRows: number = endRow - startRow + 1;
        const subMatrixColumns: number = endCol - startCol + 1;

        if (subMatrixRows !== subMatrix.rows || subMatrixColumns !== subMatrix.columns) {
            throw new MatrixError("Submatrix dimensions do not match", 806);
        }

        const subMatrixElements: Array<T> = subMatrix.mElements;

        for (let i = startRow; i <= endRow; i++) {
            for (let j = startCol; j <= endCol; j++) {
                const subMatrixRowIndex = i - startRow;
                const subMatrixColumnIndex = j - startCol;
                const subMatrixValue = subMatrixElements[subMatrixRowIndex * subMatrix.columns + subMatrixColumnIndex];
                const index = i * this.columns + j;
                this.mElements[index] = subMatrixValue;
            }
        }
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Mathematical operations, example, add, subtract, multiply and so forth
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Adds another matrix to this matrix.
     * @public
     * @param { Matrix<T> } B - The matrix to add.
     * @returns {Matrix<T>} The resulting matrix.
     */
    public add(B: Matrix<T>): Matrix<T> {
        if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for addition", 805, { ARows: this.rows, AColumns: this.columns, BRows: B.rows, BColumns: B.columns });
        if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { B });


        const resultElements: Array<T> = JSON.parse(JSON.stringify(this.mElements));
        const size: number = this.size;

        for (let i = 0; i < size; i++) {
            resultElements[i] = this.numerical.add(resultElements[i], B.mElements[i])
        }
        return new Matrix(resultElements, { rows: this.rows, columns: this.columns });

    }


    // /**
    //  * Adds another matrix to this matrix. is async and faster
    //  * @public
    //  * @param {Matrix} B - The matrix to add.
    //  * @returns {Matrix} The resulting matrix.
    //  */
    // public async addasync(B: Matrix): Promise<Matrix> {
    //     if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for addition", 805, { ARows: this.rows, AColumns: this.columns, BRows: B.rows, BColumns: B.columns });
    //     if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { B });

    //     const resultElements: Float32Array = new Float32Array(this.mElements);
    //     const size: number = this.size;

    //     // Calculate the chunk size based on the number of available processors
    //     const numProcessors: number = os.cpus().length;
    //     const chunkSize: number = Math.ceil(size / numProcessors);

    //     const promises: any[] = [];

    //     for (let i = 0; i < numProcessors; i++) {
    //         const start: number = i * chunkSize;
    //         const end: number = Math.min(start + chunkSize, size);

    //         promises.push(
    //             new Promise<void>((resolve) => {
    //                 // Perform addition in parallel for the chunk
    //                 for (let j = start; j < end; j++) {
    //                     resultElements[j] += B.mElements[j];
    //                 }
    //                 resolve();
    //             })
    //         );
    //     }

    //     // Wait for all promises to resolve
    //     await Promise.all(promises);
    //     return new Matrix(resultElements, this.rows, this.columns);
    // }


    /**
         * Performs the Gram-Schmidt process for the columns of the given matrix. The process is an algorithm
         * to orthonormalize a set of vectors in an inner product space, generally Euclidean n-space.
         *
         * The method takes the columns (considered as vectors) of the current matrix instance and generates an orthogonal
         * set of vectors that spans the same column space as the original set. The set of orthonormal vectors is computed
         * sequentially by subtracting the projections of a matrix column vector onto the previously computed orthogonal
         * vectors from the column vector itself.
         *
         * @returns {Matrix<T>} A new Matrix instance constructed using the orthonormal vectors as columns.
         *
         * @throws {MatrixError} If any column obtained during the process is nearly zero (having euclidean norm lesser than a small
         * constant - `DELTA`). In this case, this means that the provided set is not linearly independent.
         *
         * @public
         */
    public gramSmith(): Matrix<T> {

        //Deprecated
        // if (this.dataType !== "number") {
        //     throw new MatrixError("Can't perform the gramSmith algorithm on a non numeric matrix", 807, { AType: this.dataType });
        // }

        const orthogonalColumns: T[][] = []

        orthogonalColumns.push((this as Matrix<T>).getColumn(1));

        const columns: number = this.columns;


        for (let i = 1; i < columns; i++) {
            let orthogonalProjection: T[] = [...(this as Matrix<T>).getColumn(i + 1)]; // Initialize orthogonalProjection as a copy of the current column

            for (let j = 0; j < i; j++) {
                let u: T[] = orthogonalColumns[j]
                let v: T[] = (this as Matrix<T>).getColumn(i + 1)
                let uv: T = math.dot(u, v, this.numerical)
                let uu: T = math.dot(u, u, this.numerical)
                let scalar: T = this.numerical.divide(uv, uu);

                let projectionOf_I_onto_J: T[] = u.map((entry: T) => this.numerical.multiply(entry, scalar));

                orthogonalProjection = orthogonalProjection.map((entry: T, index: number) => this.numerical.subtract(entry, projectionOf_I_onto_J[index]))

            }
            if ((this.numerical.toNumber(this.numerical.sqrt(orthogonalProjection.map((x: T) => this.numerical.multiply(x, x)).reduce((acc: T, x: T) => this.numerical.add(acc, x))))) < Constants.DELTA) {
                throw new MatrixError("Cannot normalize a nearly-zero column. The given columns are not linearly independent.", 704);
            }
            orthogonalColumns.push(orthogonalProjection)

        }

        const normalizedColumns: T[][] = orthogonalColumns.map((column: T[]) => math.normalize(column, this.numerical))
        const transposedArray: T[][] = normalizedColumns[0].map((_, colIndex) => normalizedColumns.map(row => row[colIndex]));
        return new Matrix<T>(transposedArray);
    }

    /**
     * Multiplies this matrix with another matrix using the naive algorithm
     * @public
     * @param {Matrix<T>} B - The matrix to multiply with.
     * @returns {Matrix<T>} The resulting matrix.
     */
    public multiply(B: Matrix<T>): Matrix<T> {
        if (this.columns !== B.rows) {
            throw new MatrixError("Invalid matrix dimensions for multiplication", 807, { rows: B.rows, columns: this.columns });
        }


        //Deprecated
        // if (B.dataType !== "number" || this.dataType !== "number") {
        //     throw new MatrixError("Can't multiply non numeric matricies", 807, { AType: this.dataType, BType: B.dataType });
        // }

        const rows: number = this.rows;
        const columns: number = this.columns;
        const matrixColumns: number = B.columns;
        const multipliersA: T[] = JSON.parse(JSON.stringify(this.mElements));;
        const multipliersB: T[] = B.transpose().mElements;

        const result: T[] = new Array<T>(rows * matrixColumns);

        const unrollingFactor: number = Math.min(columns, 16);

        for (let i = 0; i < rows; i++) {
            const rowOffsetA: number = i * columns;
            const rowOffsetResult: number = i * matrixColumns;

            for (let j = 0; j < matrixColumns; j++) {
                let sum: T = this.numerical.zeroValue;
                const colOffsetB: number = j * unrollingFactor;

                for (let k = 0; k < columns; k += unrollingFactor) {
                    const limit: number = Math.min(k + unrollingFactor, columns);

                    for (let u = k; u < limit; u++) {
                        sum = this.numerical.add(sum, this.numerical.multiply(multipliersA[rowOffsetA + u], multipliersB[colOffsetB + u]));
                    }
                }
                result[rowOffsetResult + j] = sum;
            }
        }

        return new Matrix(result, { rows, columns: matrixColumns });;
    }


    //TODO: fix the negative pow
    /**
     * Raises the matrix to the power of `exp`.
     * 
     * @param exp - The exponent to raise the matrix to.
     * @returns { Matrix<T>} The resulting matrix after raising it to the power of `exp`.
     * @throws {MatrixError} if the matrix is not square.
     */
    public pow(exp: number): Matrix<T> {



        if (!this.isSquare) {
            throw new MatrixError("Can't multiply a non-square matrix with itself.", 810, { A: this.isSquare });
        }


        if (exp === 0) {
            // Return the identity matrix if the exponent is 0
            return Matrix.identity(this.rows);
        }

        if (exp === 1) {
            // Return the matrix itself if the exponent is 1
            return this as Matrix<T>;
        }

        if (exp % 2 === 0) {
            // If the exponent is even, recursively calculate the square root of the matrix
            const sqrtMatrix = this.pow(exp / 2);
            return sqrtMatrix.multiply(sqrtMatrix);
        } else {
            // If the exponent is odd, recursively calculate the square root of the matrix and multiply it with the matrix itself
            const sqrtMatrix = this.pow((exp - 1) / 2);
            return this.multiply(sqrtMatrix.multiply(sqrtMatrix));
        }
    }


    /**
     * Scales the matrix and returns a new matrix with the result of the scaling
     * @public
     * @param {number} scalar - The scalar to scale the matrix with
     * @returns { Matrix<T>} The scaled matrix
     */
    public scale(scalar: T): Matrix<T> {

        //Deprecated soon maybe
        if (scalar === this.numerical.oneValue) {
            return this as Matrix<T>
        } else if (scalar === this.numerical.zeroValue) {
            return Matrix.zeros(this.rows, this.columns, this.numerical)
        }
        const scaledMatrix: Matrix<T> = Matrix.clone(this);
        scaledMatrix.mElements = scaledMatrix.mElements.map((entry: T) => this.numerical.multiply(entry, scalar))
        return scaledMatrix;
    }




    /**
       * Performs matrix multiplication using the Strassen's algorithm.
       * @public
       * @param { Matrix<T>} B - The matrix to multiply with.
       * @returns { Matrix<T>} The result of matrix multiplication.
       */
    public strassenMultiply(B: Matrix<T>): Matrix<T> {


        if (!this.isSquare && !B.isSquare) {
            throw new MatrixError(
                "Both matrices has to be square",
                810,
                { A: this.isSquare, B: B.isSquare }
            );
        }

        // Base case: If matrices are 1x1, perform simple multiplication
        if (this.rows === 1 && this.columns === 1 && B.rows === 1 && B.columns === 1) {
            const resultElement: T = this.numerical.multiply(this.mElements[0] as T, B.mElements[0]);
            return new Matrix([resultElement], { rows: 1, columns: 1 })
        }

        // Pad matrices to the nearest power of two
        const A = Matrix.padMatrixToPowerOfTwo(this as Matrix<T>);
        const C = Matrix.padMatrixToPowerOfTwo(B);

        const n: number = A.rows;
        const halfN: number = n / 2;

        // Create submatrices for A and B
        const A11 = A.getSubMatrix(0, halfN, 0, halfN);
        const A12 = A.getSubMatrix(0, halfN, halfN, n);
        const A21 = A.getSubMatrix(halfN, n, 0, halfN);
        const A22 = A.getSubMatrix(halfN, n, halfN, n);
        const B11 = C.getSubMatrix(0, halfN, 0, halfN);
        const B12 = C.getSubMatrix(0, halfN, halfN, n);
        const B21 = C.getSubMatrix(halfN, n, 0, halfN);
        const B22 = C.getSubMatrix(halfN, n, halfN, n);

        // Compute intermediate matrices
        const P1 = A11.strassenMultiply(B12.subtract(B22));
        const P2 = A11.add(A12).strassenMultiply(B22);
        const P3 = A21.add(A22).strassenMultiply(B11);
        const P4 = A22.strassenMultiply(B21.subtract(B11));
        const P5 = A11.add(A22).strassenMultiply(B11.add(B22));
        const P6 = A12.subtract(A22).strassenMultiply(B21.add(B22));
        const P7 = A11.subtract(A21).strassenMultiply(B11.add(B12));

        // Compute submatrices of the result
        const C11 = P5.add(P4).subtract(P2).add(P6);
        const C12 = P1.add(P2);
        const C21 = P3.add(P4);
        const C22 = P5.add(P1).subtract(P3).subtract(P7);

        // Create the result matrix
        const result = new Matrix(new Array(n * n), { rows: n, columns: n, numerical: this.numerical });
        result.setSubMatrix(0, halfN - 1, 0, halfN - 1, C11);
        result.setSubMatrix(0, halfN - 1, halfN, n - 1, C12);
        result.setSubMatrix(halfN, n - 1, 0, halfN - 1, C21);
        result.setSubMatrix(halfN, n - 1, halfN, n - 1, C22);


        return result.getSubMatrix(0, this.rows, 0, B.columns);
    }



    /**
     * Subtracts another matrix from this matrix.
     * @public
     * @param { Matrix<T>} B - The matrix to subtract.
     * @returns { Matrix<T>} The resulting matrix.
     */
    public subtract(B: Matrix<T>): Matrix<T> {
        if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for subtraction", 805, { ARows: this.rows, AColumns: this.columns, BRows: B.rows, BColumns: B.columns })
        if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { B });


        const resultElements: T[] = JSON.parse(JSON.stringify(this.mElements as T[]));
        const size: number = this.size;

        for (let i = 0; i < size; i++) {
            resultElements[i] = this.numerical.subtract(resultElements[i], B.mElements[i]);
        }

        return new Matrix(resultElements, { rows: this.rows, columns: this.columns });
    }
    //TODO: FROM HERE TYPE
    /**
     * Performs vector-matrix multiplication by multiplying each element of the matrix by the corresponding element in the input vector.
     * @param {T[]} vector - The input vector.
     * @returns {Matrix<T>} A new matrix resulting from the vector-matrix multiplication.
     * @throws {MatrixError} If the input vector is not an array or if its length doesn't match the number of columns in the matrix.
     */
    public vMultiply(vector: T[]): Matrix<T> {
        if (!Array.isArray(vector)) throw new MatrixError("The input vector is not an array", 606, { vector });
        if (vector.length !== this.columns) throw new MatrixError("The length of the input vector must be equal to the number of columns in the matrix", 802, { matrixColumns: this.columns, vectorLength: vector.length });

        let resultMatrix: Matrix<T> = Matrix.clone(this);
        const rows: number = resultMatrix.rows;
        const columns: number = resultMatrix.columns;

        for (let i = 0; i < columns; i++) {
            let multiplier: T = vector[i];
            for (let j = 0; j < rows; j++) {
                resultMatrix.mElements[j * columns + i] = this.numerical.multiply(resultMatrix.mElements[j * columns + i], multiplier);
            }
        }

        return resultMatrix;
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Solving systems
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    /**
     * Performs back-substitution on an upper triangular matrix to solve
     * a system of linear equations.
     * @public
     * @returns {number[]} Solution to the system of linear equations
     *
     * @throws {MatrixError} if the matrix is not upper traiangluar, if b is not an array or if the matrix contains a zero on the diagonal (unsolvable system)
     */
    public backSubstitution(b: T[]): T[] {
        if (!Matrix.isUpperTriangular(this)) throw new MatrixError("Matrix is not upper triangular", 815, { matrix: this });
        if (!Array.isArray(b)) throw new MatrixError("b is not an array", 606, { b });
        if (b.length !== this.rows) throw new MatrixError("b does not have the same number of entries as the amount of rows of the matrix A", 802, { rowsOfA: this.rows, entriesOfb: b.length })

        const sol: T[] = [];
        const rows: number = this.rows;
        const columns: number = this.columns;


        for (let i = rows - 1; i >= 0; i--) {
            let currentDiag: T = (this as Matrix<T>).getElement(i, i)
            if (currentDiag === this.numerical.zeroValue) throw new MatrixError("Unsolvable system: zero on diagonal", 814, { matrix: this });
            let sum: T = this.numerical.zeroValue
            for (let j = columns - 1; j > i; j--) {
                sum = this.numerical.add(sum, this.numerical.multiply(sol[j], (this as Matrix<T>).getElement(i, j)))
            }
            sol[i] = this.numerical.divide(this.numerical.subtract(b[i], sum), currentDiag)
        }
        return sol;


    }


    /**
     * Performs forward-substitution on an lower triangular matrix to solve
     * a system of linear equations.
     * @public
     *  
     * @returns {T[]} Solution to the system of linear equations
     * @throws {MatrixError} if the matrix is not lowerf traiangluar, if b is not an array or if the matrix contains a zero on the diagonal (unsolvable system)
     */
    public forwardSubstitution(b: T[]): T[] {
        if (!Matrix.isLowerTriangular(this)) throw new MatrixError("Matrix is not lower triangular", 816, { matrix: this });
        if (!Array.isArray(b)) throw new MatrixError("b is not an array", 606, { b });
        if (b.length !== this.rows) throw new MatrixError("b does not have the same number of entries as the amount of rows of the matrix A", 802, { rowsOfA: this.rows, entriesOfb: b.length })

        const sol: T[] = [];
        const rows: number = this.rows;


        for (let i = 0; i < rows; i++) {
            let currentDiag: T = (this as Matrix<T>).getElement(i, i)
            if (currentDiag === this.numerical.zeroValue) throw new MatrixError("Unsolvable system: zero on diagonal", 814, { matrix: this });
            let sum: T = this.numerical.zeroValue
            for (let j = 0; j < i; j++) {
                sum = this.numerical.add(sum, this.numerical.multiply(sol[j], (this as Matrix<T>).getElement(i, j)))
            }
            sol[i] = this.numerical.divide(this.numerical.subtract(b[i], sum), currentDiag)
        }
        return sol;


    }



    /**
     * Converts the matrix to Reduced Row Echelon Form (RREF).
     * This method does not modify the original matrix.
     * @public
     * @param {Object} options - The options for the Gauss-Jordan elimination.
     * @param {boolean} options.solve - Indicates whether to solve the system of equations after performing Gauss-Jordan elimination. Default is false.
     * @returns {Matrix<number> | number[]} A new matrix that is the REF of the original matrix if `options.solve` is false. If `options.solve` is true, it returns the solution to the system of equations as an array. 
    */ //TODO: lav en type til normale options
    public gaussianElimination(options: { solve?: boolean } = { solve: false }): Matrix<T> | T[] {

        let lead: number = 0;
        let matrixClone: T[] | Matrix<T> = [...this.mElements as T[]]; // clone the matrix

        let rows: number = this.rows;
        let columns: number = this.columns;

        for (let r = 0; r < rows; r++) {
            if (columns <= lead) {
                break;
            }

            let i: number = r;
            while (matrixClone[i * columns + lead] === this.numerical.zeroValue) {
                i++;

                if (rows === i) {
                    i = r;
                    lead++;

                    if (columns === lead) {
                        return new Matrix<T>([...matrixClone], { rows, columns });
                    }
                }
            }

            // Swap rows i and r
            //TODO: hehehehehehhehehehheehehehehehehe
            let tmp: T[] = matrixClone.slice(i * columns, (i + 1) * columns);
            matrixClone.splice(i * columns, columns, ...matrixClone.slice(r * columns, (r + 1) * columns));
            matrixClone.splice(r * columns, columns, ...tmp);

            // Subtract multiples of row r from the other rows to make the rest of the entries of the current column as zero
            for (let i = r + 1; i < rows; i++) {
                let val = this.numerical.divide(matrixClone[i * columns + lead], matrixClone[r * columns + lead]);

                for (let j = 0; j < columns; j++) {
                    matrixClone[i * columns + j] = this.numerical.subtract(matrixClone[i * columns + j], this.numerical.multiply(val, matrixClone[r * columns + j]))
                }
            }

            lead++;
        }


        matrixClone = new Matrix<T>([...matrixClone], { rows, columns })
        Matrix.roundMatrixToZero(matrixClone)


        if (options.solve) {
            const augmentedColumn: T[] = matrixClone.getColumn(columns)
            return matrixClone.getSubMatrix(0, rows, 0, columns - 1).backSubstitution(augmentedColumn)
        }

        return matrixClone;
    }

    /**
     * Converts the matrix to Reduced Row Echelon Form (RREF).
     * This method does not modify the original matrix.
     * @public
      * @param {boolean} options.solve - Indicates whether to solve the system of equations after performing Gauss-Jordan elimination. Default is false.
     * @returns { Matrix<T>  | T[]} A new matrix that is the REF of the original matrix if `options.solve` is false. If `options.solve` is true, it returns the solution to the system of equations as an array.
    */ //TODO: lav en type til normale options
    public gaussJordan(options: { solve?: boolean } = { solve: false }): Matrix<T> | T[] {
        let lead: number = 0;
        let matrixClone: Array<T> | Matrix<T> = [...this.mElements as T[]]; // clone the matrix

        let rows: number = this.rows;
        let columns: number = this.columns;

        for (let r = 0; r < rows; r++) {
            if (columns <= lead) {
                break;
            }

            let i: number = r;
            while (matrixClone[i * columns + lead] === 0) {
                i++;

                if (rows === i) {
                    i = r;
                    lead++;

                    if (columns === lead) {
                        return new Matrix<number>(Array.from(matrixClone), { rows, columns });;
                    }
                }
            }

            // Swap rows i and r
            // TODO: heheheheheheheheheheasdiashduhasdhlsdahadhjhjiasdjasdjioajadjda
            let tmp: Float64Array = matrixClone.subarray(i * columns, (i + 1) * columns);
            matrixClone.set(matrixClone.subarray(r * columns, (r + 1) * columns), i * columns);
            matrixClone.set(tmp, r * columns);

            let val: number = matrixClone[r * columns + lead];

            // Scale row r to make the leading coefficient = 1
            for (let j = 0; j < columns; j++) {
                matrixClone[r * columns + j] /= val;
            }

            // Subtract multiples of row r from the other rows to make the rest of the entries of current column as zero
            for (let i = 0; i < rows; i++) {
                if (i === r) continue;

                val = matrixClone[i * columns + lead];

                for (let j = 0; j < columns; j++) {
                    matrixClone[i * columns + j] -= val * matrixClone[r * columns + j];
                }
            }

            lead++;
        }

        matrixClone = new Matrix<number>(Array.from(matrixClone), { rows, columns })
        Matrix.roundMatrixToZero(matrixClone)


        if (options.solve) {
            return matrixClone.getColumn(columns);
        }

        return matrixClone;
    }



    /**
     * Performs QR decomposition on the matrix.
     * @returns { { Q: Matrix, R: Matrix } } An object containing the Q and R matrices.
     */
    public QRDecomposition(): { Q: Matrix<T>, R: Matrix<T> } {
        const Q: Matrix<T> = this.gramSmith();
        const QT: Matrix<T> = Q.transpose();
        const R: Matrix<T> = QT.multiply(this as Matrix<T>);
        Matrix.roundMatrixToZero(this as Matrix<number>)
        return { Q: Q, R: R };
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Reshapeing
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Augments the current matrix with another matrix.
     * @param {Matrix<T>} B  - The matrix to be augmented with.
     * @returns {Matrix<T>} A new matrix that is the result of augmenting the current matrix with the provided matrix.
     * @throws {MatrixError} If the argument is not an instance of Matrix, or if the current matrix and the provided matrix do not have the same number of rows.
     */
    public augment(B: Matrix<T>): Matrix<T> {
        if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { B });
        if (B.rows !== this.rows) throw new MatrixError("A and B does not have the same number of rows", 802, { ARows: this.rows, BRows: B.rows });
        let AA: T[][] = this.toArray()
        let BA: T[][] = B.toArray()
        return new Matrix(AA.map((row: T[], index: number) => row.concat(BA[index])))
    }



    /**
     * Transposes a matrix.
     * @public
     * @returns {Matrix<T>} The transposed matrix.
     */
    public transpose(): Matrix<T> {

        const transposedMatrix: Matrix<T> = Matrix.clone(this)
        const rows: number = transposedMatrix.rows;
        const columns: number = transposedMatrix.columns;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                transposedMatrix.mElements[j * rows + i] = this.mElements[i * columns + j];
            }
        }
        transposedMatrix.rows = columns;
        transposedMatrix.columns = rows;

        if (transposedMatrix.isTall) {
            transposedMatrix.isTall = false;
            transposedMatrix.isWide = true;
        } else if (transposedMatrix.isWide) {
            transposedMatrix.isTall = true;
            transposedMatrix.isWide = false;
        }

        transposedMatrix.updateShape()

        return transposedMatrix;
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Inverting
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
    Inverts a square matrix.
    @returns { Matrix<number>} The inverse of the square matrix.
    @throws {MatrixError} If the matrix is not square.
    */
    public invertSquare(): Matrix<number> {
        if (!this.isSquare) throw new MatrixError("Can't use this method for inverting a non square matrix, see the inverse method instead", 812, { isSquare: this.isSquare });
        const squareIdentity: Matrix<number> = Matrix.identity(this.rows)
        const augmented: Matrix<number> = (this as Matrix<number>).augment(squareIdentity)
        const inverse: Matrix<number> = augmented.gaussJordan() as Matrix<number>
        return inverse.getSubMatrix(0, this.rows, this.columns, inverse.columns)
    }


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
    public invertUpper(): Matrix<T> {
        //TODO: Psudo inverse
        if (!this.isSquare) throw new MatrixError("Can't use this method for inverting a non square matrix, see the inverse method instead", 812, { matrix: this });
        if (!Matrix.isUpperTriangular(this)) throw new MatrixError("Matrix is not upper triangular", 815, { matrix: this });


        const identityMatrix: Matrix<T> = Matrix.identity(this.rows, this.numerical);
        let invertedMatrixElements: T[][] = [];

        for (let i = this.rows - 1; i >= 0; i--) {
            invertedMatrixElements[i] = this.backSubstitution(identityMatrix.getRow(this.rows - i));
        }

        invertedMatrixElements.reverse()


        return new Matrix<T>(invertedMatrixElements).transpose();
    }

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
     * @returns { Matrix<T>} The inverted lower triangular matrix.
     *
     * @throws {MatrixError} If the original matrix is not square or a lower triangular matrix , an error is thrown.
     */
    public invertLower(): Matrix<T> {
        //TODO: Psudo inverse
        if (!this.isSquare) throw new MatrixError("Can't use this method for inverting a non square matrix, see the inverse method instead", 812, { matrix: this });
        if (!Matrix.isLowerTriangular(this)) throw new MatrixError("Matrix is not lower triangular", 815, { matrix: this });


        const identityMatrix: Matrix<T> = Matrix.identity(this.rows, this.numerical);
        let invertedMatrixElements: T[][] = [];

        for (let i = 0; i < this.rows; i++) {
            invertedMatrixElements[i] = this.forwardSubstitution(identityMatrix.getRow(i + 1));
        }

        // invertedMatrixElements.reverse()


        return new Matrix<T>(invertedMatrixElements).transpose();
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Utility methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////



    /**
     * Checks if the current matrix is equal to another matrix.
     * @param {Matrix<T>} B - The matrix to compare with.
     * @returns {boolean} 'true' if the matrices are equal, 'false' otherwise.
     */
    public equal(B: Matrix<T>): boolean {
        if (B.dataType !== this.dataType || B.shape !== this.shape) return false;
        if (B.dataType === "number") { //TODO: Check the equal
            return (this.mElements as number[]).every((entry: number, index: number) => math.equal(entry, (B.mElements as number[])[index]))
        }
        return this.mElements.every((entry: T, index: number) => entry === B.mElements[index])
    }


    /**
     * Prints the matrix in a formatted way.
     * @public
     * @returns {void}
     */
    public print(): void {
        const shape: number[] = [this.rows, this.columns];

        function col(mat: T[][], i: number): T[] {
            return mat.map(row => row[i]);
        }

        const colMaxes: number[] = [];
        for (let i = 0; i < shape[1]; i++) {
            //@ts-ignore
            colMaxes.push(Math.max(...col((this as Matrix<T>).toArray(), i).map(n => n.toString().length)));
        }

        this.toArray().forEach(row => {
            console.log(
                ...row.map((val, j) => {
                    return (
                        //@ts-ignore
                        new Array(colMaxes[j] - val.toString().length + 1).join(" ") +
                        //@ts-ignore

                        val.toString() +
                        "  "
                    );
                })
            );
        });
    }




    /**
     * Converts the matrix to a 2D array.
     * @public
     * @returns {TexImageSource[][]} The matrix as a 2D array.
     */
    public toArray(): T[][] {
        const array: T[][] = [];

        for (let i = 0; i < this.rows; i++) {
            const row: T[] = [];
            for (let j = 0; j < this.columns; j++) {
                const value = this.getElement(i, j);
                row.push(value);
            }
            array.push(row);
        }

        return array;
    }




    /**
     * Converts the matrix to a printable string
     * @public
     * @returns {string} The printable matrix in a nice format
     */
    public toString(): string {
        const shape: number[] = [this.rows, this.columns];

        function col(mat: T[][], i: number): T[] {
            return mat.map(row => row[i]);
        }

        const colMaxes: number[] = [];
        for (let i = 0; i < shape[1]; i++) {
            //@ts-ignore
            colMaxes.push(Math.max(...col((this as Matrix<T>).toArray(), i).map(n => n.toString().length)));
        }

        let output: string = "";
        this.toArray().forEach(row => {
            output += row
                .map((val, j) => {
                    return (
                        //@ts-ignore
                        new Array(colMaxes[j] - val.toString().length + 1).join(" ") +
                        //@ts-ignore

                        val.toString() +
                        "  "
                    );
                })
                .join("") + "\n";
        });

        return output;
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Static methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////




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
    public static reshape(array: any[], newRows: number, newColumns: number): Matrix<any> {
        if (array.length !== newRows * newColumns) throw new MatrixError("Invalid reshape dimensions", 806, { newRows, newColumns });
        if (!Array.isArray(array) || typeof newRows !== "number" || typeof newColumns !== "number") throw new MatrixError("Invalid argument", 606, { array, newRows, newColumns });


        const newEntries: number[][] = [];
        let rowIndex: number = 0;
        let colIndex: number = 0;

        for (let i = 0; i < array.length; i++) {
            if (colIndex === newColumns) {
                rowIndex++;
                colIndex = 0;
            }

            if (!newEntries[rowIndex]) newEntries[rowIndex] = [];

            newEntries[rowIndex][colIndex] = array[i];
            colIndex++;
        }

        return new Matrix(newEntries);
    }


    /**
    * Clones the matrix instance and returns the clone
    * @public
    * @static
    * @returns {Matrix<any>} The cloned matrix
    */
    public static clone(A: Matrix<any>): Matrix<any> {

        return new Matrix(A.toArray())


    }

    /**
     * Method used to pad the matrix dimensions to the nearest power of two.
     * @public
     * @static
     * @param {Matrix<T>} A - The matrix to pad
     * @returns {Matrix<T>} The padded matrix with dimensions as a power of two.
     */
    public static padMatrixToPowerOfTwo<T>(A: Matrix<T>, numerical?: Numerical<T>): Matrix<T> {

        if (!numerical) {
            numerical = new NumericalNumber() as unknown as Numerical<T>;
        }
        const rows: number = A.rows;
        const columns: number = A.columns
        const maxDimension: number = Math.max(rows, columns);
        const nextPower: number = math.nextPowerOfTwo(maxDimension);

        if (nextPower === rows && nextPower === columns) {
            return A; // No padding required as the matrix is already a power of two.
        }

        const paddedMatrix: T[] = Array<T>(nextPower * nextPower).fill(numerical.zeroValue);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                paddedMatrix[i * nextPower + j] = A.mElements[i * columns + j];
            }
        }

        return new Matrix(paddedMatrix, { rows: nextPower, columns: nextPower });
    }


    /**
     * Rounds values close to zero in the given array and modifies the matrix in place
     * @public
     * @static
     * @param { Matrix<T>} A - Matrix to round
     * @returns {void}
     */
    public static roundMatrixToZero<T>(A: Matrix<T>, options: { threshold: number, numerical?: Numerical<T> } = { threshold: Constants.DELTA }): void {
        const size: number = A.size;

        if (!options || !options.numerical) {
            options.numerical = new NumericalNumber() as unknown as Numerical<T>;
        }
        for (let i = 0; i < size; i++) {
            if (options.numerical.toNumber(math.abs(A.mElements[i])) < Constants.DELTA) {
                A.mElements[i] = options.numerical.zeroValue;
            }
        }
    }


    /**
     * Rounds all elements of a matrix in place to a specified number of decimal places using a specified base.
     * @public
     * @static
     * @param {Matrix} A - The matrix to round.
     * @param {number} digits - The number of decimal places to round to.
     * @param {number} base - The base to use for rounding. Defaults to 10 if not provided.
     * @returns {void}
     */
    public static toFixedMatrix(A: Matrix<number>, digits: number, base: number = 10): void {
        A.mElements = A.mElements.map((entry: number) => math.toFixedNumber(entry, digits, base))
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Static factory methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Creates an identity matrix with the specified dimension.
     * @public
     * @static
     * @param {number} dimension - The dimension of the identity matrix.
     * @returns {Matrix} The identity matrix.
     * @throws {MatrixError} - If the dimension is less than or equal to 0.
     */
    public static identity<T>(dimension: number, numerical?: Numerical<T>): Matrix<T> {
        if (dimension <= 0 || typeof dimension !== "number") throw new MatrixError("Invalid argument", 606, { dimension });

        if (!numerical) {
            numerical = new NumericalNumber() as unknown as Numerical<T>;
        }

        const entries: T[][] = [];

        for (let i = 0; i < dimension; i++) {
            const row: T[] = [];
            for (let j = 0; j < dimension; j++) {
                if (i === j) {
                    row.push(numerical.oneValue);
                } else {
                    row.push(numerical.zeroValue);
                }
            }
            entries.push(row);
        }

        return new Matrix<T>(entries)
    }

    /**
     * Creates a matrix filled with ones with the specified number of rows and columns.
     * @public
     * @static
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix.
     * @returns {Matrix} - The matrix filled with ones.
     * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
     */
    public static ones(rows: number, columns: number): Matrix<number> {
        if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, { rows, columns });
        return new Matrix<number>(new Array(rows).fill(1).map(() => new Array(columns).fill(1)))
    }


    /**
     * Creates a random matrix with the specified number of rows and columns.
     * @public
     * @static
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix
     * @returns {Matrix} The randomized matrix
     * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
     */
    public static random(rows: number, columns: number): Matrix<number> {
        if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, { rows, columns });

        const entries: number[][] = [];

        for (let i = 0; i < rows; i++) {
            const row: number[] = [];
            for (let j = 0; j <
                columns; j++) {
                const randomValue: number = Math.floor(Math.random() * 100);
                row.push(randomValue);
            }
            entries.push(row);
        }

        return new Matrix<number>(entries);
    }


    /**
     * Creates a matrix filled with zeros with the specified number of rows and columns.
     * @public
     * @static
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix.
     * @returns {Matrix} - The matrix filled with zero elements.
     * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
     */
    public static zeros<T>(rows: number, columns: number, numerical?: Numerical<T>): Matrix<T> {
        if (!numerical) {
            numerical = new NumericalNumber() as unknown as Numerical<T>;
        }
        if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, { rows, columns });
        return new Matrix<T>(new Array(rows).fill(numerical.zeroValue).map(() => new Array(columns).fill(0)))
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Static boolean methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////



    /**
     * Checks if a given matrix contains only integer elements.
     * @param A - The matrix to check.
     * @returns True if all elements in the matrix are integers, false otherwise.
     * @throws {MatrixError} If the argument is not an instance of Matrix.
     */
    public static isIntMatrix(A: Matrix<number>): boolean {
        if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { A });

        return A.mElements.every((entry: number) => Number.isInteger(entry));
    }


    /**
    * This method checks if the matrix is lower triangular.
    * A matrix is said to be lower triangular if all its entries above the main diagonal are zero.
    * @public
    * @static
    * @param {Matrix} A - The matrix to checkF
    * @return {Boolean} - Returns true if the matrix is lower triangular, false otherwise.
    */
    public static isLowerTriangular(A: Matrix<any>): Boolean {
        if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { A });
        const columns: number = A.columns;
        for (let i = 1; i < columns; i++) {
            for (let j = 0; j < i; j++) {
                if (A.getElement(j, i) !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**

    /**
     * This method checks if the given matrix is upper triangular.
     * A matrix is said to be upper triangular if all its entries below the main diagonal are zero.
     * @public
     * @static
     * @param {Matrix} A - The matrix to checkF
     * @return {Boolean}  Returns true if the matrix is upper triangular, false otherwise.
     */
    public static isUpperTriangular(A: Matrix<any>): boolean {
        if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { A });
        const columns: number = A.columns;
        for (let i = 1; i < columns; i++) {
            for (let j = 0; j < i; j++) {
                if (A.getElement(i, j) !== 0) {
                    return false;
                }
            }
        }
        return true;
    }



}


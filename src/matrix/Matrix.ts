// Interface import
import { MatrixTypes } from "../@interfaces";


// Error import
import { MatrixError } from "../errors";

// Utility import
import { Constants, MatrixUtils } from "../utils";


// Node import
import * as fs from "fs"
import * as os from 'os';



export default class Matrix implements MatrixTypes {

    public shape: string = "0";
    public isSquare: boolean = false;
    public isTall: boolean = false;
    public isWide: boolean = false;

    public rows: number = Infinity;
    public columns: number = Infinity;
    public size: number = Infinity;
    public mElements: Float32Array;

    /**
     * Constructs a matrix object.
     * @param {number[][] | Float32Array} entries - The entries of the matrix.
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix.
     */
    constructor(entries: number[][] | Float32Array, rows?: number, columns?: number) {
        if (entries instanceof Float32Array) {
            if (rows === undefined || columns === undefined || typeof (rows) !== "number" || typeof (columns) !== "number" || columns <= 0 || rows <= 0) {
                throw new MatrixError("Rows and columns must be defined for Float32Array entries, be of type number and not be 0 or negative", 804);
            }


            this.validateFloatArray(entries);
            this.mElements = entries;
            this.rows = rows;
            this.columns = columns;
            this.size = rows * columns;
        } else {
            if (!this.validateMatrixEntries(entries)) {
                throw new MatrixError("Invalid matrix entries", 803);
            }

            const numRows: number = entries.length;
            const numCols: number = entries[0].length;
            this.mElements = new Float32Array(numRows * numCols);

            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numCols; j++) {
                    const index: number = i * numCols + j;
                    this.mElements[index] = entries[i][j];
                }
            }

            this.rows = numRows;
            this.columns = numCols;
            this.size = numRows * numCols;
        }

        this.updateMatrix()
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Validation and updataers
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////s

    /**
     * Validates the entries of a matrix to ensure they are of the correct form.
     * @private
     * @param {number[][]} entries - The entries of the matrix.
     * @returns {boolean} True if the entries are valid, false otherwise.
     */
    private validateMatrixEntries(entries: number[][]): boolean {
        const numRows: number = entries.length;
        if (numRows === 0) {
            return false;
        }

        const numCols: number = entries[0].length;
        if (numCols === 0) {
            return false;
        }

        for (let i = 0; i < numRows; i++) {
            if (!Array.isArray(entries[i]) || entries[i].length !== numCols) {
                return false;
            }

            for (let j = 0; j < numCols; j++) {
                if (typeof entries[i][j] !== 'number' || isNaN(entries[i][j])) {
                    return false;
                }
            }
        }

        return true;
    }


    /**
     * Validates the entries of a Float32Array to ensure they are valid.
     * @private
     * @param {Float32Array} entries - The entries of the matrix.
     * @returns {void}
     */
    private validateFloatArray(entries: Float32Array): void {
        for (let i = 0; i < entries.length; i++) {
            if (typeof entries[i] !== 'number' || isNaN(entries[i])) {
                throw new MatrixError("Invalid Float32Array entries", 805, { entry: entries[i] });
            }
        }
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
    * @returns {number} The value of the element.
    * @throws {MatrixError} - If index is out of bounds
    */
    public getElement(row: number, column: number): number {
        if (typeof row !== "number" || typeof column !== "number") throw new MatrixError("Invalid arugment", 606, { row, column })
        const index: number = row * this.columns + column;
        if (index > this.size || index < 0) throw new MatrixError("Index out of bounds", 800, { row, column });
        return this.mElements[index];
    }


    /**
     * Gets a specific row of the matrix.
     * @public
     * @param {number} rowIndex - The index of the row to retrieve (starting from 1).
     * @returns {number[]} An array representing the specified row of the matrix.
     * @throws {MatrixError} If the rowIndex is out of bounds.
     */
    public getRow(rowIndex: number): number[] {
        if (typeof rowIndex !== "number")
            throw new MatrixError("Invalid argument", 606, { rowIndex });
        if (rowIndex <= 0 || rowIndex > this.rows)
            throw new MatrixError("Row index out of bounds", 800, { rowIndex });

        const row: number[] = [];
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
     * @returns {number[]} An array representing the specified column of the matrix.
     * @throws {MatrixError} If the columnIndex is out of bounds.
     */
    public getColumn(columnIndex: number): number[] {
        if (typeof columnIndex !== "number")
            throw new MatrixError("Invalid argument", 606, { columnIndex });
        if (columnIndex <= 0 || columnIndex > this.columns)
            throw new MatrixError("Column index out of bounds", 800, { columnIndex });

        const column: number[] = [];
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
     * @param {number} value - The value to set.
     * @returns {void}
     * @throws {MatrixError} - If the value is an invalid element or index is out of bounds
     */
    public setElement(row: number, column: number, value: number): void {
        if (typeof value !== "number" || typeof row !== "number" || typeof column !== "number") throw new MatrixError("Invalid arugment", 606, { value, row, column })
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
     * @returns {Matrix} A new Matrix object representing the submatrix.
     */
    public getSubMatrix(startRow: number, endRow: number, startCol: number, endCol: number): Matrix {
        const numRows: number = endRow - startRow;
        const numCols: number = endCol - startCol;
        const submatrixElements: Float32Array = new Float32Array(numRows * numCols);
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                const index: number = i * numCols + j;
                const originalIndex: number = (startRow + i) * this.columns + (startCol + j);
                submatrixElements[index] = this.mElements[originalIndex];
            }
        }
        return new Matrix(submatrixElements, numRows, numCols);
    }

    /**
    * @public
    * @param {number} startRow - The starting row index of the submatrix.
    * @param {number} startCol - The starting column index of the submatrix.
    * @param {number} endRow - The ending row index of the submatrix.
    * @param {number} endCol - The ending column index of the submatrix.
    * @param {number[]} submatrixElements - The elements of the submatrix to be set.
    */
    public setSubMatrix(startRow: number, endRow: number, startColumn: number, endColumn: number, subMatrix: Matrix): void {
        if (startRow < 0 || startRow >= this.rows || endRow < 0 || endRow >= this.rows || startColumn < 0 || startColumn >= this.columns || endColumn < 0 || endColumn >= this.columns) {
            throw new MatrixError("Invalid submatrix indices", 805);
        }

        const subMatrixRows = endRow - startRow + 1;
        const subMatrixColumns = endColumn - startColumn + 1;

        if (subMatrixRows !== subMatrix.rows || subMatrixColumns !== subMatrix.columns) {
            throw new MatrixError("Submatrix dimensions do not match", 806);
        }

        const subMatrixElements = subMatrix.mElements;

        for (let i = startRow; i <= endRow; i++) {
            for (let j = startColumn; j <= endColumn; j++) {
                const subMatrixRowIndex = i - startRow;
                const subMatrixColumnIndex = j - startColumn;
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
     * @param {Matrix} B - The matrix to add.
     * @returns {Matrix} The resulting matrix.
     */
    public add(B: Matrix): Matrix {
        if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for addition", 805, { ARows: this.rows, AColumns: this.columns, BRows: B.rows, BColumns: B.columns });
        if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { B });

        const resultElements: Float32Array = new Float32Array(this.mElements);
        const size: number = this.size;

        for (let i = 0; i < size; i++) {
            resultElements[i] += B.mElements[i];
        }

        return new Matrix(resultElements, this.rows, this.columns);
    }


    /**
     * Adds another matrix to this matrix. is async and faster
     * @public
     * @param {Matrix} B - The matrix to add.
     * @returns {Matrix} The resulting matrix.
     */
    public async addasync(B: Matrix): Promise<Matrix> {
        if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for addition", 805, { ARows: this.rows, AColumns: this.columns, BRows: B.rows, BColumns: B.columns });
        if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { B });

        const resultElements: Float32Array = new Float32Array(this.mElements);
        const size: number = this.size;

        // Calculate the chunk size based on the number of available processors
        const numProcessors: number = os.cpus().length;
        const chunkSize: number = Math.ceil(size / numProcessors);

        const promises: any[] = [];

        for (let i = 0; i < numProcessors; i++) {
            const start: number = i * chunkSize;
            const end: number = Math.min(start + chunkSize, size);

            promises.push(
                new Promise<void>((resolve) => {
                    // Perform addition in parallel for the chunk
                    for (let j = start; j < end; j++) {
                        resultElements[j] += B.mElements[j];
                    }
                    resolve();
                })
            );
        }

        // Wait for all promises to resolve
        await Promise.all(promises);
        return new Matrix(resultElements, this.rows, this.columns);
    }



    /**
     * Multiplies this matrix with another matrix using the naive algorithm
     * @public
     * @param {Matrix} B - The matrix to multiply with.
     * @returns {Matrix} The resulting matrix.
     */
    public multiply(B: Matrix): Matrix {
        if (this.columns !== B.rows) {
            throw new MatrixError("Invalid matrix dimensions for multiplication", 807, { rows: B.rows, columns: this.columns });
        }

        const rows: number = this.rows;
        const columns: number = this.columns;
        const matrixColumns: number = B.columns;
        const multipliersA: Float32Array = this.mElements;
        const multipliersB: Float32Array = B.transpose().mElements;

        const result: Float32Array = new Float32Array(rows * matrixColumns);

        const unrollingFactor: number = Math.min(columns, 16);

        for (let i = 0; i < rows; i++) {
            const rowOffsetA: number = i * columns;
            const rowOffsetResult: number = i * matrixColumns;

            for (let j = 0; j < matrixColumns; j++) {
                let sum: number = 0;
                const colOffsetB: number = j * unrollingFactor;

                for (let k = 0; k < columns; k += unrollingFactor) {
                    const limit: number = Math.min(k + unrollingFactor, columns);

                    for (let u = k; u < limit; u++) {
                        sum += multipliersA[rowOffsetA + u] * multipliersB[colOffsetB + u];
                    }
                }
                result[rowOffsetResult + j] = sum;
            }
        }

        return new Matrix(result, rows, matrixColumns);
    }

    //TODO: fix the negative pow
    /**
     * Raises the matrix to the power of `exp`.
     * 
     * @param exp - The exponent to raise the matrix to.
     * @returns The resulting matrix after raising it to the power of `exp`.
     * @throws {MatrixError} if the matrix is not square.
     */
    public pow(exp: number): Matrix {
        if (!this.isSquare) {
            throw new MatrixError("Can't multiply a non-square matrix with itself.", 810, { A: this.isSquare });
        }

        if (exp === 0) {
            // Return the identity matrix if the exponent is 0
            return MatrixUtils.identity(this.rows);
        }

        if (exp === 1) {
            // Return the matrix itself if the exponent is 1
            return this;
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
     * @returns {matrix} The scaled matrix
     */
    public scale(scalar: number): Matrix {
        if (typeof scalar !== "number") throw new MatrixError("Invalid scalar", 606, { scalar });
        const scaledMatrix: Matrix = MatrixUtils.clone(this);
        scaledMatrix.mElements = scaledMatrix.mElements.map((entry: number) => entry * scalar)
        return scaledMatrix;
    }



    /**
     * Performs matrix multiplication using Strassen's algorithm.
     * @param {Matrix} B - The matrix to multiply with.
     * @returns {Matrix} - The resulting matrix.
     */

    // Pseudo code at: https://en.wikipedia.org/wiki/Strassen_algorithm

    /**
       * Performs matrix multiplication using the Strassen's algorithm.
       * @public
       * @param {Matrix} B - The matrix to multiply with.
       * @returns {Matrix} The result of matrix multiplication.
       */
    public strassenMultiply(B: Matrix): Matrix {
        if (!this.isSquare && !B.isSquare) {
            throw new MatrixError(
                "Both matrices has to be square",
                810,
                { A: this.isSquare, B: B.isSquare }
            );
        }

        // Base case: If matrices are 1x1, perform simple multiplication
        if (this.rows === 1 && this.columns === 1 && B.rows === 1 && B.columns === 1) {
            const resultElement = this.mElements[0] * B.mElements[0];
            return new Matrix(new Float32Array([resultElement]), 1, 1);
        }

        // Pad matrices to the nearest power of two
        const A = MatrixUtils.padMatrixToPowerOfTwo(this);
        const C = MatrixUtils.padMatrixToPowerOfTwo(B);

        const n = A.rows;
        const halfN = n / 2;

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
        const result = new Matrix(new Float32Array(n * n), n, n);
        result.setSubMatrix(0, halfN - 1, 0, halfN - 1, C11);
        result.setSubMatrix(0, halfN - 1, halfN, n - 1, C12);
        result.setSubMatrix(halfN, n - 1, 0, halfN - 1, C21);
        result.setSubMatrix(halfN, n - 1, halfN, n - 1, C22);


        return result.getSubMatrix(0, this.rows, 0, B.columns);
    }


    /**
     * Subtracts another matrix from this matrix.
     * @public
     * @param {Matrix} B - The matrix to subtract.
     * @returns {Matrix} The resulting matrix.
     */
    public subtract(B: Matrix): Matrix {
        if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for subtraction", 805, { ARows: this.rows, AColumns: this.columns, BRows: B.rows, BColumns: B.columns })
        if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { B });

        const resultElements: Float32Array = new Float32Array(this.mElements);
        const size: number = this.size;

        for (let i = 0; i < size; i++) {
            resultElements[i] -= B.mElements[i];
        }

        return new Matrix(resultElements, this.rows, this.columns);
    }

    /**
     * Performs vector-matrix multiplication by multiplying each element of the matrix by the corresponding element in the input vector.
     * @param vector - The input vector.
     * @returns A new matrix resulting from the vector-matrix multiplication.
     * @throws {MatrixError} If the input vector is not an array or if its length doesn't match the number of columns in the matrix.
     */
    public vMultiply(vector: number[]): Matrix {
        if (!Array.isArray(vector)) throw new MatrixError("The input vector is not an array", 606, { vector });
        if (vector.length !== this.columns) throw new MatrixError("The length of the input vector must be equal to the number of columns in the matrix", 802, { matrixColumns: this.columns, vectorLength: vector.length });

        let resultMatrix: Matrix = MatrixUtils.clone(this);
        const rows: number = resultMatrix.rows;
        const columns: number = resultMatrix.columns;

        for (let i = 0; i < columns; i++) {
            let multiplier: number = vector[i];
            for (let j = 0; j < rows; j++) {
                resultMatrix.mElements[j * columns + i] = resultMatrix.mElements[j * columns + i] * multiplier;
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
    public backSubstitution(b: number[]): number[] {
        if (!Matrix.isUpperTriangular(this)) throw new MatrixError("Matrix is not upper triangular", 815, { matrix: this });
        if (!Array.isArray(b)) throw new MatrixError("b is not an array", 606, { b });
        if (b.length !== this.rows) throw new MatrixError("b does not have the same number of entries as the amount of rows of the matrix A", 802, { rowsOfA: this.rows, entriesOfb: b.length })

        const sol: number[] = [];
        const rows: number = this.rows;
        const columns: number = this.columns;


        for (let i = rows - 1; i >= 0; i--) {
            let currentDiag: number = this.getElement(i, i)
            if (currentDiag === 0) throw new MatrixError("Unsolvable system: zero on diagonal", 814, { matrix: this });
            let sum: number = 0
            for (let j = columns - 1; j > i; j--) {
                sum += sol[j] * this.getElement(i, j)
            }
            sol[i] = (b[i] - sum) / currentDiag
        }
        return sol;


    }


    /**
     * Performs forward-substitution on an lower triangular matrix to solve
     * a system of linear equations.
     * @public
     *  
     * @returns {number[]} Solution to the system of linear equations
     * @throws {MatrixError} if the matrix is not lowerf traiangluar, if b is not an array or if the matrix contains a zero on the diagonal (unsolvable system)
     */
    public forwardSubstitution(b: number[]): number[] {
        if (!Matrix.isLowerTriangular(this)) throw new MatrixError("Matrix is not lower triangular", 816, { matrix: this });
        if (!Array.isArray(b)) throw new MatrixError("b is not an array", 606, { b });
        if (b.length !== this.rows) throw new MatrixError("b does not have the same number of entries as the amount of rows of the matrix A", 802, { rowsOfA: this.rows, entriesOfb: b.length })

        const sol: number[] = [];
        const rows: number = this.rows;


        for (let i = 0; i < rows; i++) {
            let currentDiag: number = this.getElement(i, i)
            if (currentDiag === 0) throw new MatrixError("Unsolvable system: zero on diagonal", 814, { matrix: this });
            let sum: number = 0
            for (let j = 0; j < i; j++) {
                sum += sol[j] * this.getElement(i, j)
            }
            sol[i] = (b[i] - sum) / currentDiag
        }
        return sol;


    }



    /**
     * Converts the matrix to Reduced Row Echelon Form (RREF).
     * This method does not modify the original matrix.
     * @public
     * @param {Object} options - The options for the Gauss-Jordan elimination.
     * @param {boolean} options.solve - Indicates whether to solve the system of equations after performing Gauss-Jordan elimination. Default is false.
     * @returns {Matrix | number[]} A new matrix that is the REF of the original matrix if `options.solve` is false. If `options.solve` is true, it returns the solution to the system of equations as an array. If `options.fractionless` is true, the result matrix will be returned without fractions.
    */ //TODO: lav en type til normale options
    public gaussianElimination(options: { solve?: boolean } = { solve: false }): Matrix | number[] {
        let lead: number = 0;
        let matrixClone: Matrix = MatrixUtils.clone(this); // clone the matrix

        let rows: number = this.rows;
        let columns: number = this.columns;

        for (let r = 0; r < rows; r++) {
            if (columns <= lead) {
                break;
            }

            let i: number = r;
            while (matrixClone.mElements[i * columns + lead] === 0) {
                i++;

                if (rows === i) {
                    i = r;
                    lead++;

                    if (columns === lead) {
                        return matrixClone;
                    }
                }
            }

            // Swap rows i and r
            let tmp: Float32Array = matrixClone.mElements.subarray(i * columns, (i + 1) * columns);
            matrixClone.mElements.set(matrixClone.mElements.subarray(r * columns, (r + 1) * columns), i * columns);
            matrixClone.mElements.set(tmp, r * columns);

            // Subtract multiples of row r from the other rows to make the rest of the entries of the current column as zero
            for (let i = r + 1; i < rows; i++) {
                let val = matrixClone.mElements[i * columns + lead] / matrixClone.mElements[r * columns + lead];

                for (let j = 0; j < columns; j++) {
                    matrixClone.mElements[i * columns + j] -= val * matrixClone.mElements[r * columns + j];
                }
            }

            lead++;
        }


        MatrixUtils.roundMatrixToZero(matrixClone)

        if (options.solve) {
            const augmentedColumn: number[] = matrixClone.getColumn(columns)
            return matrixClone.getSubMatrix(0, rows, 0, columns - 1).backSubstitution(augmentedColumn)
        }

        return matrixClone;
    }

    /**
     * Converts the matrix to Reduced Row Echelon Form (RREF).
     * This method does not modify the original matrix.
     * @public
      * @param {boolean} options.solve - Indicates whether to solve the system of equations after performing Gauss-Jordan elimination. Default is false.
     * @returns {Matrix | number[]} A new matrix that is the REF of the original matrix if `options.solve` is false. If `options.solve` is true, it returns the solution to the system of equations as an array. If `options.fractionless` is true, the result matrix will be returned without fractions.
    */ //TODO: lav en type til normale options
    public gaussJordan(options: { solve?: boolean } = { solve: false }): Matrix | number[] {
        let lead: number = 0;
        let matrixClone: Matrix = MatrixUtils.clone(this); // clone the matrix

        let rows: number = this.rows;
        let columns: number = this.columns;

        for (let r = 0; r < rows; r++) {
            if (columns <= lead) {
                break;
            }

            let i: number = r;
            while (matrixClone.mElements[i * columns + lead] === 0) {
                i++;

                if (rows === i) {
                    i = r;
                    lead++;

                    if (columns === lead) {
                        return matrixClone;
                    }
                }
            }

            // Swap rows i and r
            let tmp: Float32Array = matrixClone.mElements.subarray(i * columns, (i + 1) * columns);
            matrixClone.mElements.set(matrixClone.mElements.subarray(r * columns, (r + 1) * columns), i * columns);
            matrixClone.mElements.set(tmp, r * columns);

            let val: number = matrixClone.mElements[r * columns + lead];

            // Scale row r to make the leading coefficient = 1
            for (let j = 0; j < columns; j++) {
                matrixClone.mElements[r * columns + j] /= val;
            }

            // Subtract multiples of row r from the other rows to make the rest of the entries of current column as zero
            for (let i = 0; i < rows; i++) {
                if (i === r) continue;

                val = matrixClone.mElements[i * columns + lead];

                for (let j = 0; j < columns; j++) {
                    matrixClone.mElements[i * columns + j] -= val * matrixClone.mElements[r * columns + j];
                }
            }

            lead++;
        }

        MatrixUtils.roundMatrixToZero(matrixClone)


        if (options.solve) {
            return matrixClone.getColumn(columns);
        }

        return matrixClone;
    }



    /**
     * Performs QR decomposition on the matrix.
     * @returns { { Q: Matrix, R: Matrix } } An object containing the Q and R matrices.
     */
    public QRDecomposition(): { Q: Matrix, R: Matrix } {
        const Q: Matrix = this.gramSmith();
        const QT: Matrix = Q.transpose();
        const R: Matrix = QT.multiply(this);
        MatrixUtils.roundMatrixToZero(this)
        return { Q: Q, R: R };
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Inverting
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


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
     * @returns {Matrix} The inverted upper triangular matrix.
     *
     * @throws {MatrixError} If the original matrix is not square or an upper triangular matrix, an error is thrown.
     */
    public invertUpper(): Matrix {
        //TODO: Psudo inverse
        if (!this.isSquare) throw new MatrixError("Can't use this method for inverting a non square matrix, see the inverse method instead", 812, { matrix: this });
        if (!Matrix.isUpperTriangular(this)) throw new MatrixError("Matrix is not upper triangular", 815, { matrix: this });


        const identityMatrix: Matrix = MatrixUtils.identity(this.rows);
        let invertedMatrixElements: number[][] = [];

        for (let i = this.rows - 1; i >= 0; i--) {
            invertedMatrixElements[i] = this.backSubstitution(identityMatrix.getRow(this.rows - i));
        }

        invertedMatrixElements.reverse()


        return new Matrix(invertedMatrixElements).transpose();
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
     * @returns {Matrix} The inverted lower triangular matrix.
     *
     * @throws {MatrixError} If the original matrix is not square or a lower triangular matrix , an error is thrown.
     */
    public invertLower(): Matrix {
        //TODO: Psudo inverse
        if (!this.isSquare) throw new MatrixError("Can't use this method for inverting a non square matrix, see the inverse method instead", 812, { matrix: this });
        if (!Matrix.isLowerTriangular(this)) throw new MatrixError("Matrix is not lower triangular", 815, { matrix: this });


        const identityMatrix: Matrix = MatrixUtils.identity(this.rows);
        let invertedMatrixElements: number[][] = [];

        for (let i = 0; i < this.rows; i++) {
            invertedMatrixElements[i] = this.forwardSubstitution(identityMatrix.getRow(i + 1));
        }

        // invertedMatrixElements.reverse()


        return new Matrix(invertedMatrixElements).transpose();
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Utility methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Augments the current matrix with another matrix.
     * @param {Matrix} B  - The matrix to be augmented with.
     * @returns {Matrix} A new matrix that is the result of augmenting the current matrix with the provided matrix.
     * @throws {MatrixError} If the argument is not an instance of Matrix, or if the current matrix and the provided matrix do not have the same number of rows.
     */
    public augment(B: Matrix): Matrix {
        if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { B });
        if (B.rows !== this.rows) throw new MatrixError("A and B does not have the same number of rows", 802, { ARows: this.rows, BRows: B.rows });
        let AA: number[][] = this.toArray()
        let BA: number[][] = B.toArray()
        return new Matrix(AA.map((row: number[], index: number) => row.concat(BA[index])))
    }

    /**
     * Performs the Gram-Schmidt process for the columns of the given matrix. The process is an algorithm
     * to orthonormalize a set of vectors in an inner product space, generally Euclidean n-space.
     *
     * The method takes the columns (considered as vectors) of the current matrix instance and generates an orthogonal
     * set of vectors that spans the same column space as the original set. The set of orthonormal vectors is computed
     * sequentially by subtracting the projections of a matrix column vector onto the previously computed orthogonal
     * vectors from the column vector itself.
     *
     * @returns {Matrix} A new Matrix instance constructed using the orthonormal vectors as columns.
     *
     * @throws {MatrixError} If any column obtained during the process is nearly zero (having euclidean norm lesser than a small
     * constant - `DELTA`). In this case, this means that the provided set is not linearly independent.
     *
     * @public
     */
    public gramSmith(): Matrix {
        const orthogonalColumns: number[][] = []

        orthogonalColumns.push(this.getColumn(1));

        const columns: number = this.columns;


        for (let i = 1; i < columns; i++) {
            let orthogonalProjection: number[] = [...this.getColumn(i + 1)]; // Initialize orthogonalProjection as a copy of the current column

            for (let j = 0; j < i; j++) {
                let u: number[] = orthogonalColumns[j]
                let v: number[] = this.getColumn(i + 1)
                let uv: number = Matrix.dot(u, v)
                let uu: number = Matrix.dot(u, u)
                let scalar: number = uv / uu;

                let projectionOf_I_onto_J: number[] = u.map((entry: number) => entry * scalar);

                orthogonalProjection = orthogonalProjection.map((entry: number, index: number) => entry - projectionOf_I_onto_J[index])

            }
            if ((Math.sqrt(orthogonalProjection.map(x => x ** 2).reduce((acc, x) => acc + x))) < Constants.DELTA) {
                throw new MatrixError("Cannot normalize a nearly-zero column. The given columns are not linearly independent.", 704);
            }
            orthogonalColumns.push(orthogonalProjection)

        }

        const normalizedColumns: number[][] = orthogonalColumns.map((column: number[]) => Matrix.normalize(column))
        const transposedArray: number[][] = normalizedColumns[0].map((_, colIndex) => normalizedColumns.map(row => row[colIndex]));
        return new Matrix(transposedArray);
    }

    /**
     * Prints the matrix in a formatted way.
     * @public
     * @returns {void}
     */
    public print(): void {
        const shape: number[] = [this.rows, this.columns];

        function col(mat: number[][], i: number): number[] {
            return mat.map(row => row[i]);
        }

        const colMaxes: number[] = [];
        for (let i = 0; i < shape[1]; i++) {
            colMaxes.push(Math.max(...col(this.toArray(), i).map(n => n.toString().length)));
        }

        this.toArray().forEach(row => {
            console.log(
                ...row.map((val, j) => {
                    return (
                        new Array(colMaxes[j] - val.toString().length + 1).join(" ") +
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
     * @returns {number[][]} The matrix as a 2D array.
     */
    public toArray(): number[][] {
        const array: number[][] = [];

        for (let i = 0; i < this.rows; i++) {
            const row: number[] = [];
            for (let j = 0; j < this.columns; j++) {
                const value = this.getElement(i, j);
                row.push(value);
            }
            array.push(row);
        }

        return array;
    }



    /**
     * Transposes a matrix.
     * @public
     * @returns {Matrix} The transposed matrix.
     */
    public transpose(): Matrix {

        const transposedMatrix: Matrix = MatrixUtils.clone(this)
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



    /**
     * Converts the matrix to a printable string
     * @public
     * @returns {string} The printable matrix in a nice format
     */
    public toString(): string {
        const shape: number[] = [this.rows, this.columns];

        function col(mat: number[][], i: number): number[] {
            return mat.map(row => row[i]);
        }

        const colMaxes: number[] = [];
        for (let i = 0; i < shape[1]; i++) {
            colMaxes.push(Math.max(...col(this.toArray(), i).map(n => n.toString().length)));
        }

        let output: string = "";
        this.toArray().forEach(row => {
            output += row
                .map((val, j) => {
                    return (
                        new Array(colMaxes[j] - val.toString().length + 1).join(" ") +
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
     * Calculates the dot product of two vectors.
     * @private
     * @static
     * @param {number[]} vector1 - The first vector.
     * @param {number[]} vector2 - The second vector.
     * @returns {number} The dot product of the two vectors.
     */
    private static dot(vector1: number[], vector2: number[]): number {
        let dotProduct: number = 0;
        for (let i = 0; i < vector1.length; i++) {
            dotProduct += vector1[i] * vector2[i]
        }
        return dotProduct;
    }

    /**
     * Normalizes a vector.
     * @private
     * @static
     * @param {number[]} vector1 - The vector to normalize.
     * @returns {number[]} The normalized vector.
     */
    private static normalize(vector1: number[]): number[] {
        let scalar: number = 1 / (Math.sqrt(vector1.map(x => x ** 2).reduce((acc, x) => acc + x)))
        return vector1.map((entry: number) => entry * scalar)
    }



    /**
     * Reshapes a 1D array into a matrix with the specified number of rows and columns.
     * @public
     * @static
     * @param {number[]} array - The 1D array to reshape.
     * @param {number} newRows - The number of rows in the reshaped matrix.
     * @param {number} newColumns - The number of columns in the reshaped matrix.
     * @returns {Matrix} The reshaped matrix.
     * @throws {MatrixError} - If the length of the array is not equal to newRows * newColumns.
     */
    public static reshape(array: number[], newRows: number, newColumns: number): Matrix {
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

            if (!newEntries[rowIndex]) {
                newEntries[rowIndex] = [];
            }

            newEntries[rowIndex][colIndex] = array[i];
            colIndex++;
        }

        return new Matrix(newEntries);
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
    public static isIntMatrix(A: Matrix): boolean {
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
    public static isLowerTriangular(A: Matrix): Boolean {
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
    public static isUpperTriangular(A: Matrix): boolean {
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

function writeArrayToFile(array: any, filePath: any) {
    // Convert the array to a string
    const arrayString = array.join('\n');

    // Write the array string to the file
    fs.writeFile(filePath, arrayString, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Array written to file successfully!');
        }
    });
}

function tester() {
    const a = [];
    for (let i = 1; i < 1001; i++) {
        let m1 = MatrixUtils.ones(i, i);
        let s = performance.now();
        m1.multiply(m1);
        let e = performance.now();
        a.push((e - s) / 1000);
    }
    writeArrayToFile(a, "unroller.txt");
}

// tester();


// let m1 = Matrix.ones(1000, 1000);
// let s = performance.now();
// m1.multiply(m1);
// let e = performance.now();
// console.log((e - s) / 1000);

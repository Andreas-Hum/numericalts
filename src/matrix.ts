// Interface import
import { MatrixInterface } from "./@interfaces/matrix";


// Error import
import { MatrixError, NumericalError } from "./@error.types/index";

// Math class  import
import { math } from "./math";

// Utility import
import { Constants } from "./constants";

//Numerical interface/classes
import { Numerical } from "./@interfaces";
import { NumericalNumber, NumericalBigInt } from "./@numerical.classes";

//Lodash import
import _ from 'lodash';

/**
 * The `Matrix` class represents a mathematical matrix with generic type `T`.
 * It implements the `MatrixInterface<T>` interface.
 *
 * @remarks
 * This class provides methods for matrix operations such as addition, subtraction, multiplication, etc.
 *
 * @example
 *
 *   // Create a new instance of Matrix with number type
 *   const numberMatrix = new Matrix<number>([[1, 2], [3, 4]]);
 *    // Create a new instance of Matrix with string type
 *   const stringMatrix = new Matrix<bigint>([[1n, 2n], [3n, 4n]]);
 *    // Create a new instance of Matrix with a custom type
 *   const customMatrix = new Matrix<custom type>([c1,c2,c3,c4],{rows:2,columns:4, numerical: "Custom class for calculations"})
 *
 * @typeParam T - The type of elements contained in the matrix.
 */
export class Matrix<T> implements MatrixInterface<T> {


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
  * @param {Numerical<T>} options.numerical - The numerical operations for the matrix.
  *
  
  * @example
  * // Create a new instance of Matrix with number type and 2 rows and 2 columns
  *  const matrix = new Matrix<number>([[1, 2], [3, 4]]);
  *  // Create a new instance of Matrix with bigint type and 2 rows and 2 columns
  *  const matrix2 = new Matrix<bigint>([BigInt(1), BigInt(2), BigInt(3), BigInt(4)], { rows: 2, columns: 2});
  *  // Create a new instance of Matrix with a custom type and 2 rows and 2 columns
  *  const matrix3 = new Matrix<ctype>([c1, c2], [c3, c4], { rows: 2, columns: 2, numerical: "The custom class that implements the Numerical interface goes here" });
  *
  * @throws {MatrixError} If the entries are not an array, or if the entries are a 1D array but rows and columns are not defined or not numbers or are 0 or negative, or if the length of the 1D array does not equal rows * columns, or if the entries are a 2D array but not all rows have the same length, or if the matrix has a depth greater than one.
  * @throws {NumericalError} If the matrix datatype is neither a number nor a bigint and no appropriate Numeric implementation was provided.
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
                throw new NumericalError("Matrix datatype is neither a number nor a bigint and no appropriate Numerical implementation was provided.", 901);
            }

        } else {
            this.numerical = options.numerical
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
        @private
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
        @private
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
    @private
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
     * @param {number} column - The column index of the element starts from zero.
     * @returns {T} The value of the element.
     * @throws {MatrixError} - If index is out of bounds
     * 
     * @example
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
     * const value = matrix.getElement(1, 2);
     * console.log(value); // Output will be 6
     */
    public getElement(row: number, column: number): T {
        if (typeof row !== "number" || typeof column !== "number") throw new MatrixError("Invalid arugment", 606, { row, column })
        const index: number = row * this.columns + column;
        if (index > this.size || index < 0) throw new MatrixError("Index out of bounds", 800, { row, column });
        return this.mElements[index];
    }


    /**
     * Returns the diagonal elements of the matrix.
     * @public
     * @param {number} k - The offset from the main diagonal. Default is 0 which represents the main diagonal.
     * @returns {T[]} An array of the diagonal elements.
     * 
     * @example
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
     * const diag = matrix.diag();
     * console.log(diag); // Output will be [1, 5, 9]
     * 
     * @example
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
     * const diag = matrix.diag(1);
     * console.log(diag); // Output will be [2, 6]
     */
    public diag(k: number = 0): T[] {
        if (this.mElements.length === 0) return [];
        if (this.mElements.length === 1 || this.columns === 1 || this.rows === 1) return [this.mElements[0]];

        const diagEle: T[] = [];
        const min: number = Math.min(this.columns, this.rows);
        const maxK: number = Math.abs(k);

        if (k >= 0) {
            for (let i = 0; i < min - k; i++) {
                diagEle.push(this.getElement(i, i + k));
            }

        } else {
            for (let i = 0; i < min + k; i++) {
                diagEle.push(this.getElement(i + maxK, i));
            }
        }


        return diagEle;
    }


    /**
     * Gets a specific row of the matrix.
     * @public
     * @param {number} rowIndex - The index of the row to retrieve (starting from 0).
     * @returns {T[]} An array representing the specified row of the matrix.
     * @throws {MatrixError} If the rowIndex is out of bounds.
     * 
     * @example
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
     * const row = matrix.getRow(2);
     * console.log(row); // Output will be [7, 8, 9]
     */
    public getRow(rowIndex: number): T[] {
        if (typeof rowIndex !== "number")
            throw new MatrixError("Invalid argument", 606, { rowIndex });

        if (rowIndex < 0 || rowIndex >= this.rows)
            throw new MatrixError("Row index out of bounds", 800, { rowIndex });

        const row: T[] = [];
        const startIndex: number = rowIndex * this.columns;
        const endIndex: number = startIndex + this.columns;

        for (let i = startIndex; i < endIndex; i++) {
            row.push(this.mElements[i]);
        }

        return row;
    }

    /**
     * Gets a specific column of the matrix.
     * @public
     * @param {number} columnIndex - The index of the column to retrieve.
     * @returns {T[]} An array representing the specified column of the matrix.
     * @throws {MatrixError} If the columnIndex is out of bounds.
     *
     * @example
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
     * const column = matrix.getColumn(1);
     * console.log(column); // Output will be [2, 5, 8]
     */
    public getColumn(columnIndex: number): T[] {
        if (typeof columnIndex !== "number")
            throw new MatrixError("Invalid argument", 606, { columnIndex });
        if (columnIndex < 0 || columnIndex >= this.columns)
            throw new MatrixError("Column index out of bounds", 800, { columnIndex });

        const column: T[] = [];
        const startIndex: number = columnIndex;
        const endIndex: number = this.rows * this.columns + (columnIndex);

        for (let i = startIndex; i < endIndex; i += this.columns) {
            column.push(this.mElements[i]);
        }

        return column;
    }

    /**
    * Retrieves a submatrix from the current matrix.
    * @public
    * @param {number} startRow - The starting row index of the submatrix.
    * @param {number} startCol - The starting column index of the submatrix.
    * @param {number} endRow - The ending row index of the submatrix (inclusive).
    * @param {number} endCol - The ending column index of the submatrix (inclusive).
    * @returns {Matrix<T>} A new Matrix object representing the submatrix.
    *
    * @example
    * const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    * const subMatrix = matrix.getSubMatrix(1, 2, 1, 2);
    * console.log(subMatrix.toString());
    * // Output:
    *  "5 6"
    *  "8 9"
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
        return new Matrix(submatrixElements, { rows: numRows, columns: numCols, numerical: this.numerical });
    }


    /**
     * Removes a row from the matrix and returns a new matrix with the row removed.
     *
     * @param {number} rowNum - The index of the row to remove.
     * @returns {Matrix<T>} A new matrix with the specified row removed.
     *
     * @throws {MatrixError} If the rowNum argument is not a number.
     * @throws {MatrixError} If the rowNum argument is greater than the number of rows in the matrix.
     *
     * @example
     * const matrix = new Matrix<number>([[1, 2], [3, 4], [5, 6]]);
     * const newMatrix = matrix.removeRow(1);
     * console.log(newMatrix.toArray());
     * // Output: [[1, 2], [5, 6]]
     */
    public removeRow(rowNum: number): Matrix<T> {
        if (typeof rowNum !== "number") throw new MatrixError("Invalid arugment", 606, { rowNum })
        if (rowNum > this.rows) throw new MatrixError("Index out of bounds", 800, { rowNum });
        const arr: T[][] = _.cloneDeep(this.toArray())
        arr.splice(rowNum, 1)
        return new Matrix<T>(arr, { numerical: this.numerical })
    }

    /**
     * Removes a column from the matrix and returns a new matrix with the column removed.
     *
     * @param {number} rowNum - The index of the column to remove.
     * @returns {Matrix<T>} A new matrix with the specified column removed.
     *
     * @throws {MatrixError} If the columnNum argument is not a number.
     * @throws {MatrixError} If the columnNum argument is greater than the number of columns in the matrix.
     *
     * @example
     * const matrix = new Matrix<number>([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
     * const newMatrix = matrix.removeColumn(1);
     * console.log(newMatrix.toArray());
     * // Output: [[1, 3], [4, 6], [7, 9]]
     */
    public removeColumn(columnNum: number): Matrix<T> {
        if (typeof columnNum !== "number") throw new MatrixError("Invalid arugment", 606, { columnNum })
        if (columnNum > this.rows) throw new MatrixError("Index out of bounds", 800, { columnNum });

        return this.transpose().removeRow(columnNum).transpose()
    }


    /**
     * Sets the value of an element in the matrix.
     * @public
     * @param {number} row - The row index of the element starts from zero.
     * @param {number} column - The column index of the element starts from zero.
     * @param {T} value - The value to set.
     * @returns {void}
     * @throws {MatrixError} - If the value is an invalid element or index is out of bounds
     *
     * @example
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
     * matrix.setElement(0, 1, 10);
     * console.log(matrix.getElement(0, 1)); // Output will be 10
     */
    public setElement(row: number, column: number, value: T): void {
        if (typeof value !== this.dataType || typeof row !== "number" || typeof column !== "number") throw new MatrixError("Invalid arugment", 606, { value, row, column })
        const index: number = row * this.columns + column;
        if (index > this.size || index < 0) throw new MatrixError("Index out of bounds", 800, { row, column });
        this.mElements[index] = value;
    }

    /**
     * Sets a specific row of the matrix.
     * @public
     * @param {number} rowIndex - The index of the row to set .
     * @param {T[]} values - An array comprising the values to set.
     * @throws {MatrixError} If the rowIndex is out of bounds or the size of the input array does not match the column size of the matrix.
     * @returns {void}
     *
     * @example
     * 
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
     * matrix.setRow(1, [3, 2, 1]);
     * console.log(matrix.toString());
     * // Output:
     *  "1 2 7"
     *  "3 2 1"
     *  "7 8 9"
     */
    public setRow(rowIndex: number, values: T[]): void {
        if (typeof rowIndex !== "number")
            throw new MatrixError("Invalid argument", 606, { rowIndex });


        if (rowIndex < 0 || rowIndex >= this.rows)
            throw new MatrixError("Row index out of bounds", 800, { rowIndex });

        if (values.length !== this.columns)
            throw new MatrixError("Input array size does not match the column size of the matrix", 801, { rowDataSize: values.length });

        const startIndex: number = rowIndex * this.columns
        const endIndex: number = startIndex + this.columns;

        for (let i = startIndex, j = 0; i < endIndex; i++, j++) {
            this.mElements[i] = values[j];
        }
    }

    /**
      * Sets a specific column of the matrix.
      * @public
      * @param {number} columnIndex - The index of the column to set .
      * @param {T[]} values - An array comprising the values to set.
      * @throws {MatrixError} If the columnIndex is out of bounds or the size of the input array does not match the row size of the matrix.
      * @returns {void}
      *
      * @example
      * 
      * const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
      * matrix.setColumn(2, [7, 8, 9]);
      * console.log(matrix.toString());
      * // Output:
      *  "1 2 7"
      *  "4 5 8"
      *  "7 8 9"
      */
    public setColumn(columnIndex: number, values: T[]): void {
        if (typeof columnIndex !== "number")
            throw new MatrixError("Invalid argument", 606, { columnIndex });



        if (columnIndex < 0 || columnIndex >= this.columns)
            throw new MatrixError("Column index out of bounds", 800, { columnIndex });

        if (values.length !== this.rows)
            throw new MatrixError("Input array size does not match the row size of the matrix", 801, { columnDataSize: values.length });

        const startIndex: number = columnIndex;
        const endIndex: number = this.rows * this.columns + columnIndex;

        for (let i = startIndex, j = 0; i < endIndex; i += this.columns, j++) {
            this.mElements[i] = values[j];
        }
    }

    /**
     * Swaps two rows of the matrix.
     * @public
     * @param {number} row1 - The index of the first row to swap.
     * @param {number} row2 - The index of the second row to swap.
     * @throws {MatrixError} If either row index is out of bounds.
     * @returns {void}
     *
     * @example
     * 
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * matrix.swapRows(0, 1);
     * console.log(matrix.toString());
     * // Output:
     * // "3 4"
     * // "1 2"
     */
    public swapRows(row1: number, row2: number): void {
        if (row1 < 0 || row1 >= this.rows || row2 < 0 || row2 >= this.rows) {
            throw new MatrixError('Row index out of bounds', 800, { row1, row2, rows: this.rows });
        }

        for (let col = 0; col < this.columns; col++) {
            const index1 = row1 * this.columns + col;
            const index2 = row2 * this.columns + col;
            const temp = this.mElements[index1];
            this.mElements[index1] = this.mElements[index2];
            this.mElements[index2] = temp;
        }
    }

    /**
     * Swaps two columns of the matrix.
     * @public
     * @param {number} col1 - The index of the first column to swap.
     * @param {number} col2 - The index of the second column to swap.
     * @throws {MatrixError} If the matrix has less than two columns or either column index is out of bounds.
     * @returns {void}
     *
     * @example
     * 
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * matrix.swapColumns(0, 1);
     * console.log(matrix.toString());
     * // Output:
     * // "2 1"
     * // "4 3"
     */
    public swapColumns(col1: number, col2: number): void {
        if (this.columns < 2) {
            throw new MatrixError('Matrix must have at least two columns to swap.', 800, { cols: this.columns });
        }

        if (col1 < 0 || col1 >= this.columns || col2 < 0 || col2 >= this.columns) {
            throw new MatrixError('Column index out of bounds', 800, { col1, col2, cols: this.columns });
        }

        for (let row = 0; row < this.rows; row++) {
            const index1 = row * this.columns + col1;
            const index2 = row * this.columns + col2;
            const temp = this.mElements[index1];
            this.mElements[index1] = this.mElements[index2];
            this.mElements[index2] = temp;
        }
    }




    /**
    * @public
    * @param {number} startRow - The starting row index of the submatrix.
    * @param {number} startCol - The starting column index of the submatrix.
    * @param {number} endRow - The ending row index of the submatrix (exclusive).
    * @param {number} endCol - The ending column index of the submatrix (exclusive).
    * @param {Matrix<T>} subMatrix - The elements of the submatrix to be set.
    * 
    * @example
    * const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    * const subMatrix = new Matrix([[3, 3], [3, 3]]);
    * matrix.setSubMatrix(1, 3, 1, 3, subMatrix);
    * console.log(matrix.toString());
    * // Output:
    *  "1 2 7"
    *  "4 3 3"
    *  "7 3 3"
    */
    public setSubMatrix(startRow: number, endRow: number, startCol: number, endCol: number, subMatrix: Matrix<T>): void {
        if (startRow < 0 || startRow > this.rows || endRow < 0 || endRow > this.rows || startCol < 0 || startCol > this.columns || endCol < 0 || endCol > this.columns) {
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
                const subMatrixRowIndex: number = i - startRow;
                const subMatrixColumnIndex: number = j - startCol;
                const subMatrixValue: T = subMatrixElements[subMatrixRowIndex * subMatrix.columns + subMatrixColumnIndex];
                const index: number = i * this.columns + j;
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
     * @throws {MatrixError} If the dimensions of the two matrices are not the same.
     * @throws {MatrixError} If the argument is not an instance of Matrix.
     * @example
     * const matrixA = new Matrix([[1, 2], [3, 4]]);
     * const matrixB = new Matrix([[5, 6], [7, 8]]);
     * const resultMatrix = matrixA.add(matrixB);
     * console.log(resultMatrix.toString());
     * // Output:
     * "6  8"
     * "10 12"
     * 

     */
    public add(B: Matrix<T>): Matrix<T> {
        if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for addition", 805, { ARows: this.rows, AColumns: this.columns, BRows: B.rows, BColumns: B.columns });
        if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { B });


        const resultElements: Array<T> = _.cloneDeep(this.mElements);
        const size: number = this.size;

        for (let i = 0; i < size; i++) {
            resultElements[i] = this.numerical.add(resultElements[i], B.mElements[i])
        }
        return new Matrix(resultElements, { rows: this.rows, columns: this.columns, numerical: this.numerical });

    }

    /**
     * Computes the condition number of this matrix.
     * @public
     * @returns {number} The condition number of the matrix.
     * @throws {MatrixError} If the matrix is not square.
     * @example
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * const conditionNumber = matrix.conditionNumber();
     * console.log(conditionNumber);
     * // Output: 14.933034373659268
     */
    public cond(): number {
        // Ensure the matrix is square
        if (!this.isSquare) {
            throw new MatrixError("Matrix must be square to compute its condition number.", -1);
        }

        // Compute the norm of the matrix
        const normA = this.norm();

        // Compute the inverse of the matrix
        const inverseA = this.invertSquare();

        // Compute the norm of the inverse matrix
        const normInverseA = inverseA.norm();

        // Compute the condition number
        const conditionNumber = this.numerical.multiply(this.numerical.fromIntegral(normA), this.numerical.fromIntegral(normInverseA));

        return this.numerical.toIntegral(conditionNumber);
    }


    /**
     * Computes the determinant of this matrix.
     * @public
     * @returns {number} The determinant of the matrix.
     * @throws {MatrixError} If the matrix is not square.
     * @throws {MatrixError} If the matrix is singular and LU decomposition cannot be performed.
     * @example
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * const determinant = matrix.det();
     * console.log(determinant);
     * // Output: -2
     */
    public det(): number {

        if (!this.isSquare) {
            throw new MatrixError("Matrix must be square to compute its determinant.", -1);
        }

        //Base case
        if (this.rows === 2) {
            const firstDiag: T = this.numerical.multiply(this.mElements[0], this.mElements[3]);
            const secondDiag: T = this.numerical.multiply(this.mElements[1], this.mElements[2]);
            return this.numerical.toIntegral(this.numerical.subtract(firstDiag, secondDiag))
        }



        try {

            let { L, U, P, permutationCount } = this.LUDecomposition();
            const det: T = math.prod(U.diag(), this.numerical);


            let numb: number = this.numerical.toIntegral(det);
            if (math.abs(numb) < Constants.DELTA) return 0
            // If permutationCount is odd, multiply det with -1
            if (permutationCount % 2) {
                numb *= -1;
            }

            return numb
        } catch (error: any) {
            if (error.message === "Matrix is singular. LU decomposition cannot be performed.") return 0;
        }



    }


    /**
     * Performs the Gram-Schmidt process for the columns of the given matrix. The process is an algorithm
     * to orthonormalize a set of vectors in an inner product space, generally Euclidean n-space.
     *
     * The method takes the columns (considered as vectors) of the current matrix instance and generates an orthogonal
     * set of vectors that spans the same column space as the original set. The set of orthonormal vectors is computed
     * sequentially by subtracting the projections of a matrix column vector onto the previously computed orthogonal
     * vectors from the column vector itself.
     * @public
     * @returns {Matrix<T>} A new Matrix instance constructed using the orthonormal vectors as columns.
     *
     * @throws {MatrixError} If any column obtained during the process is nearly zero (having euclidean norm lesser than a small
     * constant - `DELTA`). In this case, this means that the provided set is not linearly independent.
     *
     * @example
     * const matrix = new Matrix([[1, 1, 1], [0, 1, 0], [0, 0, 1]]);
     * const resultMatrix = matrix.gramSmith();
     * console.log(resultMatrix.toString());
     * // Output:
     * "1 0 0"
     * "0 1 0"
     * "0 0 1"
     *
     */
    public gramSmith(): Matrix<T> {

        const orthogonalColumns: T[][] = []

        orthogonalColumns.push((this as Matrix<T>).getColumn(0));

        const columns: number = this.columns;


        for (let i = 1; i < columns; i++) {
            let orthogonalProjection: T[] = _.cloneDeep([...(this as Matrix<T>).getColumn(i)]); // Initialize orthogonalProjection as a copy of the current column

            for (let j = 0; j < i; j++) {
                let u: T[] = orthogonalColumns[j]
                let v: T[] = (this as Matrix<T>).getColumn(i)
                let uv: T = math.dot(u, v, this.numerical)
                let uu: T = math.dot(u, u, this.numerical)
                let scalar: T = this.numerical.divide(uv, uu);

                let projectionOf_I_onto_J: T[] = u.map((entry: T) => this.numerical.multiply(entry, scalar));

                orthogonalProjection = orthogonalProjection.map((entry: T, index: number) => this.numerical.subtract(entry, projectionOf_I_onto_J[index]))

            }
            if ((this.numerical.toIntegral(this.numerical.sqrt(orthogonalProjection.map((x: T) => this.numerical.multiply(x, x)).reduce((acc: T, x: T) => this.numerical.add(acc, x))))) < Constants.DELTA) {
                throw new MatrixError("Cannot normalize a nearly-zero column. The given columns are not linearly independent.", 704);
            }
            orthogonalColumns.push(orthogonalProjection)

        }

        const normalizedColumns: T[][] = orthogonalColumns.map((column: T[]) => math.normalize(column, this.numerical))
        const transposedArray: T[][] = normalizedColumns[0].map((_, colIndex) => normalizedColumns.map(row => row[colIndex]));
        return new Matrix<T>(transposedArray, { numerical: this.numerical });
    }

    /**
     * Multiplies this matrix with another matrix using the naive algorithm.
     * @public
     * @param {Matrix<T>} B - The matrix to multiply with.
     * @returns {Matrix<T>} The resulting matrix.
     * @throws {MatrixError} If the dimensions of the two matrices are not compatible for multiplication.
     * @example
     * const matrixA = new Matrix([[1, 2], [3, 4]]);
     * const matrixB = new Matrix([[5, 6], [7, 8]]);
     * const resultMatrix = matrixA.multiply(matrixB);
     * console.log(resultMatrix.toString());
     * // Output:
     * "19 22"
     * "43 50"
     * 
     */
    public multiply(B: Matrix<T>): Matrix<T> {
        if (this.columns !== B.rows) {
            throw new MatrixError("Invalid matrix dimensions for multiplication", 807, { rows: B.rows, columns: this.columns });
        }


        const rows: number = this.rows;
        const columns: number = this.columns;
        const matrixColumns: number = B.columns;
        const multipliersA: T[] = _.cloneDeep(this.mElements);
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

        return new Matrix(result, { rows, columns: matrixColumns, numerical: this.numerical });;
    }

    /**
     * Computes the Frobenius norm of this matrix.
     * @public
     * @returns {number} The Frobenius norm of the matrix.
     * @example
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * const norm = matrix.norm();
     * console.log(norm);
     * // Output: 5.477225575051661
     */
    public norm(): number {
        let norm = this.numerical.zeroValue;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                norm = this.numerical.add(norm, this.numerical.multiply(this.getElement(i, j), this.getElement(i, j)));
            }
        }
        return this.numerical.toIntegral(math.sqrt(norm, this.numerical));
    }

    //TODO: fix the negative pow
    /**
     * Raises the matrix to the power of `exp`.
     *
     * @param exp - The exponent to raise the matrix to.
     * @returns { Matrix<T>} The resulting matrix after raising it to the power of `exp`.
     *
     * @example
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * const resultMatrix = matrix.pow(2);
     * console.log(resultMatrix.toString());
     * // Output:
     * "7 10"
     * "15 22"
     *
     * @throws {MatrixError} if the matrix is not square.
     */
    public pow(exp: number): Matrix<T> {



        if (!this.isSquare) {
            throw new MatrixError("Can't multiply a non-square matrix with itself.", 810, { A: this.isSquare });
        }


        if (exp === 0) {
            // Return the identity matrix if the exponent is 0
            return Matrix.identity(this.rows, this.numerical);
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
     * Scales the matrix and returns a new matrix with the result of the scaling.
     * @public
     * @param {number} scalar - The scalar to scale the matrix with.
     * @returns { Matrix<T>} The scaled matrix.
     *
     * @example
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * const scaledMatrix = matrix.scale(2);
     * console.log(scaledMatrix.toString());
     * // Output:
     * "2 4"
     * "6 8"
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
     * 
     * @example
     * const matrixA = new Matrix([[1, 2], [3, 4]]);
     * const matrixB = new Matrix([[5, 6], [7, 8]]);
     * const resultMatrix = matrixA.strassenMultiply(matrixB);
     * console.log(resultMatrix.toString());
     * // Output:
     * "19 22"
     * "43 50"
     * 
     * @throws {MatrixError} If the matrices are not square.
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
            return new Matrix([resultElement], { rows: 1, columns: 1, numerical: this.numerical })
        }

        // Pad matrices to the nearest power of two
        const A = Matrix.padMatrixToPowerOfTwo(this as Matrix<T>);
        const C = Matrix.padMatrixToPowerOfTwo(B);

        const n: number = A.rows;
        const halfN: number = Math.floor(n / 2);

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
        const result = new Matrix(new Array((n) * (n)), { rows: n, columns: n, numerical: this.numerical });
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
     *
     * @example
     * const matrixA = new Matrix([[1, 2], [3, 4]]);
     * const matrixB = new Matrix([[5, 6], [7, 8]]);
     * const resultMatrix = matrixA.subtract(matrixB);
     * console.log(resultMatrix.toString());
     * // Output:
     * "-4 -4"
     * "-4 -4"
     *
     * @throws {MatrixError} If the dimensions of the two matrices are not compatible for subtraction.
     */
    public subtract(B: Matrix<T>): Matrix<T> {
        if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for subtraction", 805, { ARows: this.rows, AColumns: this.columns, BRows: B.rows, BColumns: B.columns })
        if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { B });


        const resultElements: T[] = JSON.parse(JSON.stringify(this.mElements as T[]));
        const size: number = this.size;

        for (let i = 0; i < size; i++) {
            resultElements[i] = this.numerical.subtract(resultElements[i], B.mElements[i]);
        }

        return new Matrix(resultElements, { rows: this.rows, columns: this.columns, numerical: this.numerical });
    }




    //TODO: FROM HERE TYPE
    /**
     * Performs vector-matrix multiplication by multiplying each element of the matrix by the corresponding element in the input vector.
     * @param {T[]} vector - The input vector.
     * @returns {Matrix<T>} A new matrix resulting from the vector-matrix multiplication.
     *
     * @example
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * const vector = [2, 3];
     * const resultMatrix = matrix.vMultiply(vector);
     * console.log(resultMatrix.toString());
     * // Output:
     * "2 6"
     * "6 12"
     *
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
     * @param {T[]} b - The right-hand side of the system of linear equations.
     * @returns {T[]} Solution to the system of linear equations.
     *
     * @example
     * const matrix = new Matrix([[1, 2], [0, 1]]);
     * const b = [8, 5];
     * const solution = matrix.backSubstitution(b);
     * console.log(solution);
     * // Output: [-2, 5]
     *
     * @throws {MatrixError} If the matrix is not upper triangular, if b is not an array, or if the matrix contains a zero on the diagonal (unsolvable system).
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
     * Performs forward-substitution on a lower triangular matrix to solve
     * a system of linear equations.
     * @public
     * @param {T[]} b - The right-hand side of the system of linear equations.
     * @returns {T[]} Solution to the system of linear equations.
     *
     * @example
     * const matrix = new Matrix([[1, 0], [2, 3]]);
     * const b = [4, 5];
     * const solution = matrix.forwardSubstitution(b);
     * console.log(solution);
     * // Output: [4, -1]
     *
     * @throws {MatrixError} If the matrix is not lower triangular, if b is not an array, or if the matrix contains a zero on the diagonal (unsolvable system).
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
     * Converts the matrix to Row Echelon Form (REF) using the Gaussian elimination method.
     * This method does not modify the original matrix.
     * @param {Object} options - The options for Gaussian elimination.
     * @param {boolean} options.solve - Indicates whether to solve the system of equations. Default is false.
     * @returns {Matrix<number> | number[]} - A new matrix in REF or the solution to the system of equations as an array if `options.solve` is true.
     *
     * @example
     * const matrix = new Matrix([[3, 2, 1], [4, 2, 2], [5, 4, 4]]);
     * const resultMatrix = matrix.gaussianElimination();
     * console.log(resultMatrix.toString());
     * // Output:
     * "1  4  1"
     * "0 -6  0"
     * "0  0 -1"
     */
    public gaussianElimination(options: { solve?: boolean } = { solve: false }): Matrix<T> | T[] {

        let lead: number = 0;
        let matrixClone: T[] | Matrix<T> = _.cloneDeep(this.mElements); // clone the matrix

        let rows: number = this.rows;
        let columns: number = this.columns;

        for (let r = 0; r < rows; r++) {
            if (columns <= lead) {
                break;
            }

            let i: number = r;
            while ((matrixClone as T[])[i * columns + lead] === this.numerical.zeroValue) {
                i++;

                if (rows === i) {
                    i = r;
                    lead++;

                    if (columns === lead) {
                        return new Matrix<T>([...matrixClone as T[]], { rows, columns });
                    }
                }
            }

            // Swap rows i and r
            let tmp: T[] = (matrixClone as T[]).slice(i * columns, (i + 1) * columns);
            (matrixClone as T[]).splice(i * columns, columns, ...(matrixClone as T[]).slice(r * columns, (r + 1) * columns));
            (matrixClone as T[]).splice(r * columns, columns, ...tmp);

            // Subtract multiples of row r from the other rows to make the rest of the entries of the current column as zero
            for (let i = r + 1; i < rows; i++) {
                let val = this.numerical.divide((matrixClone as T[])[i * columns + lead], (matrixClone as T[])[r * columns + lead]);

                for (let j = 0; j < columns; j++) {
                    (matrixClone as T[])[i * columns + j] = this.numerical.subtract((matrixClone as T[])[i * columns + j], this.numerical.multiply(val, (matrixClone as T[])[r * columns + j]))
                }
            }

            lead++;
        }


        matrixClone = new Matrix<T>([...(matrixClone as T[])], { rows, columns, numerical: this.numerical });
        Matrix.roundMatrixToZero(matrixClone)


        if (options.solve) {
            const augmentedColumn: T[] = matrixClone.getColumn(columns - 1)
            return matrixClone.getSubMatrix(0, rows, 0, columns - 1).backSubstitution(augmentedColumn)
        }

        return matrixClone;
    }

    /**
     * Converts the matrix to Reduced Row Echelon Form (RREF) using the Gauss-Jordan elimination method.
     * This method does not modify the original matrix.
     * @param {Object} options - The options for the Gauss-Jordan elimination.
     * @param {boolean} options.solve - Indicates whether to solve the system of equations. Default is false.
     * @returns {Matrix<number> | number[]} - A new matrix in RREF or the solution to the system of equations as an array if `options.solve` is true.
     *
     * @example
     * 
     * const matrix = new Matrix([[3, 2, 1], [4, 2, 2], [5, 4, 4]]);
     * const resultMatrix = matrix.gaussJordan();
     * console.log(resultMatrix.toString());
     * // Output:
     * "1 0 0"
     * "0 1 0"
     * "0 0 1"
     *
     */
    public gaussJordan(options: { solve?: boolean } = { solve: false }): Matrix<T> | T[] {
        let lead: number = 0;
        let matrixClone: Array<T> | Matrix<T> = _.cloneDeep(this.mElements); // clone the matrix

        let rows: number = this.rows;
        let columns: number = this.columns;

        for (let r = 0; r < rows; r++) {
            if (columns <= lead) {
                break;
            }

            let i: number = r;
            while ((matrixClone as T[])[i * columns + lead] === this.numerical.zeroValue) {
                i++;

                if (rows === i) {
                    i = r;
                    lead++;

                    if (columns === lead) {
                        return new Matrix<T>((matrixClone as T[]), { rows, columns });;
                    }
                }
            }

            // Swap rows i and r
            let tmp: T[] = (matrixClone as T[]).slice(i * columns, (i + 1) * columns);
            (matrixClone as T[]).splice(i * columns, columns, ...(matrixClone as T[]).slice(r * columns, (r + 1) * columns));
            (matrixClone as T[]).splice(r * columns, columns, ...tmp);

            let val: T = (matrixClone as T[])[r * columns + lead];

            // Scale row r to make the leading coefficient = 1
            for (let j = 0; j < columns; j++) {
                (matrixClone as T[])[r * columns + j] = this.numerical.divide((matrixClone as T[])[r * columns + j], val)
            }

            // Subtract multiples of row r from the other rows to make the rest of the entries of current column as zero
            for (let i = 0; i < rows; i++) {
                if (i === r) continue;

                val = (matrixClone as T[])[i * columns + lead];

                for (let j = 0; j < columns; j++) {
                    (matrixClone as T[])[i * columns + j] = this.numerical.subtract((matrixClone as T[])[i * columns + j], this.numerical.multiply(val, (matrixClone as T[])[r * columns + j]))
                }
            }

            lead++;
        }

        matrixClone = new Matrix<T>((matrixClone as T[]), { rows, columns, numerical: this.numerical })
        Matrix.roundMatrixToZero(matrixClone)


        if (options.solve) {
            return matrixClone.getColumn(columns - 1);
        }

        return matrixClone;
    }



    /**
     * Performs LUP decomposition on the matrix with partial pivoting.
     * This method does not modify the original matrix.
     * @throws {MatrixError} If the matrix is not square or is singular.
     * @returns { { L: Matrix<T>, U: Matrix<T>, P: Matrix<T> } } An object containing the L, U, and P matrices.
     *
     * @example
     * 
     * const matrix = new Matrix([[2, -1, 3], [4, 3, -1], [-2, 2, 1]]);
     * const result = matrix.LUPDecomposition();
     * console.log(`L Matrix:\n ${result.L.toString()}`);
     * console.log(`U Matrix:\n ${result.U.toString()}`);
     * console.log(`P Matrix:\n ${result.P.toString()}`);
    * // Output:
     * // L Matrix:
     * // " 1.00 0.00 0.00"
     * // "-0.50 1.00 0.00"
     * // " 0.50 -0.71 1.00"
     *
     * // U Matrix: 
     * // "4.00 3.00 -1.00"
     * // "0.00 3.50  0.50"
     * // "0.00 0.00  3.86"
     *
     * // P Matrix: 
     * // "0.00 1.00 0.00"
     * // "0.00 0.00 1.00"
     * // "1.00 0.00 0.00"
     *
     */
    public LUDecomposition(): { L: Matrix<T>, U: Matrix<T>, P: Matrix<T>, permutationCount: number } {
        if (!this.isSquare) {
            throw new MatrixError("LU decomposition only supports square matrices.", -1);
        }

        const n = this.rows;
        const L = Matrix.zeros(n, n, this.numerical);
        const U = Matrix.clone(this);
        const P = Matrix.identity(n, this.numerical);
        let permutationCount = 0; // Initialize the row exchange count

        for (let i = 0; i < n; i++) {
            let max = this.numerical.zeroValue;
            let kmax = 0;
            for (let k = i; k < n; k++) {
                if (math.abs(U.getElement(k, i), this.numerical) > max) {
                    max = math.abs(U.getElement(k, i), this.numerical);
                    kmax = k;
                }
            }
            if (max === this.numerical.zeroValue) {
                throw new MatrixError("Matrix is singular. LU decomposition cannot be performed.", -1);
            }
            // For each row swapping, increment permutation count
            if (i !== kmax) {
                permutationCount++;
            }
            U.swapRows(i, kmax);
            P.swapRows(i, kmax);
            L.swapRows(i, kmax);

            for (let j = i + 1; j < n; j++) {
                const value = this.numerical.divide(U.getElement(j, i), U.getElement(i, i));
                L.setElement(j, i, value);
                for (let k = i; k < n; k++) {
                    const newValue = this.numerical.subtract(U.getElement(j, k), this.numerical.multiply(L.getElement(j, i), U.getElement(i, k)));
                    U.setElement(j, k, newValue);
                }
            }
        }

        // Fill the diagonal of L with 1s
        for (let i = 0; i < n; i++) {
            L.setElement(i, i, this.numerical.oneValue);
        }

        return { L, U, P, permutationCount };
    }




    /**
     * Performs QR decomposition on the matrix. 
     * This method does not modify the original matrix.
     * @returns { { Q: Matrix, R: Matrix } } An object containing the Q and R matrices.
     *
     * @example
     * 
     * const matrix = new Matrix([[12, -51, 4], [6, 167, -68], [-4, 24, -41]]);
     * const result = matrix.QRDecomposition();
     * console.log(`Q Matrix:\n ${result.Q.toString()}`);
     * console.log(`R Matrix:\n ${result.R.toString()}`);
     * // Output:
     * // Q Matrix: 
     * // " 0.86 -0.39  0.33"
     * // " 0.43  0.90 -0.03"
     * // "-0.29  0.17 -0.94"
     *
     * // R Matrix: 
     * // "14.00 21.00  -14.00"
     * // "0.00  175.00 -70.00"
     * // "0.00  0.00    35.00"
     *
     */
    public QRDecomposition(): { Q: Matrix<T>, R: Matrix<T> } {
        const Q: Matrix<T> = this.gramSmith();
        const QT: Matrix<T> = Q.transpose();
        const R: Matrix<T> = QT.multiply(this as Matrix<T>);
        Matrix.roundMatrixToZero(R)
        return { Q: Q, R: R };
    }



    // public choleskyDecomposition(): Matrix<T> {
    //     if (!this.isSquare) {
    //         throw new Error("Cholesky decomposition can only be applied to square matrices.");
    //     }

    //     const n = this.rows;
    //     const L = Matrix.zeros<T>(n, n, this.numerical);

    //     for (let i = 0; i < n; i++) {
    //         for (let j = 0; j <= i; j++) {
    //             let sum = this.numerical.zeroValue;
    //             for (let k = 0; k < j; k++) {
    //                 sum = this.numerical.add(sum, this.numerical.multiply(L.getElement(i, k), L.getElement(j, k)));
    //             }

    //             if (i === j) {
    //                 L.setElement(i, j, this.numerical.sqrt(this.numerical.subtract(this.getElement(i, i), sum)));
    //             } else {
    //                 L.setElement(i, j, this.numerical.divide(this.numerical.subtract(this.getElement(i, j), sum), L.getElement(j, j)));
    //             }
    //         }
    //     }

    //     return L;
    // }




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
     *
     * @example
     * 
     * const matrixA = new Matrix([[1, 2], [3, 4]]);
     * const matrixB = new Matrix([[5, 6], [7, 8]]);
     * const resultMatrix = matrixA.augment(matrixB);
     * console.log(resultMatrix.toString());
     * // Output:
     * // "1 2 5 6"
     * // "3 4 7 8"
     *
     */
    public augment(B: Matrix<T>): Matrix<T> {
        if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { B });
        if (B.rows !== this.rows) throw new MatrixError("A and B does not have the same number of rows", 802, { ARows: this.rows, BRows: B.rows });
        let AA: T[][] = this.toArray()
        let BA: T[][] = B.toArray()
        return new Matrix(AA.map((row: T[], index: number) => row.concat(BA[index])), { numerical: this.numerical })
    }



    /**
     * Transposes a matrix.
     * @public
     * @returns {Matrix<T>} The transposed matrix.
     *
     * @example
     * 
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
     * const resultMatrix = matrix.transpose();
     * console.log(resultMatrix.toString());
     * // Output:
     * // "1 4"
     * // "2 5"
     * // "3 6"
     *
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
     * Inverts a square matrix.
     * @returns { Matrix<T>} The inverse of the square matrix.
     * @throws {MatrixError} If the matrix is not square.
     *
     * @example
     *
     * const matrix = new Matrix([[4, 7], [2, 6]]);
     * const resultMatrix = matrix.invertSquare();
     * console.log(resultMatrix.toString());
     * // Output:
     * // " 0.6 -0.7"
     * // "-0.2  0.4"
     *
     */
    public invertSquare(): Matrix<T> {
        if (!this.isSquare) throw new MatrixError("Can't use this method for inverting a non square matrix, see the inverse method instead", 812, { isSquare: this.isSquare });
        const squareIdentity: Matrix<T> = Matrix.identity(this.rows, this.numerical)
        const augmented: Matrix<T> = (this as Matrix<T>).augment(squareIdentity)
        const inverse: Matrix<T> = augmented.gaussJordan() as Matrix<T>
        return inverse.getSubMatrix(0, this.rows, this.columns, inverse.columns)
    }



    /**
     * Inverts an upper triangular matrix.
     * @returns { Matrix<number>} The inverted upper triangular matrix.
     * @throws {MatrixError} If the original matrix is not square or an upper triangular matrix, an error is thrown.
     *
     * @example
     *
     * const matrix = new Matrix([[1, 2], [0, 1]]);
     * const resultMatrix = matrix.invertUpper();
     * console.log(resultMatrix.toString());
     * // Output:
     * // "1 -2"
     * // "0  1"
     *
     */
    public invertUpper(): Matrix<T> {
        if (!this.isSquare)
            throw new MatrixError("Can't use this method for inverting a non square matrix, see the inverse method instead", 812, { matrix: this });
        if (!Matrix.isUpperTriangular(this))
            throw new MatrixError("Matrix is not upper triangular", 815, { matrix: this });

        const identityMatrix: Matrix<T> = Matrix.identity(this.rows, this.numerical);
        let invertedMatrixElements: T[][] = [];

        for (let i = this.rows - 1; i >= 0; i--) {
            invertedMatrixElements[i] = this.backSubstitution(identityMatrix.getRow(this.rows - i - 1));
        }

        invertedMatrixElements.reverse()
        return new Matrix<T>(invertedMatrixElements, { numerical: this.numerical }).transpose();
    }

    /**
     * Inverts a lower triangular matrix.
     * @returns { Matrix<T>} The inverted lower triangular matrix.
     * @throws {MatrixError} If the original matrix is not square or a lower triangular matrix , an error is thrown.
     *
     * @example
     *
     * const matrix = new Matrix([[1, 0], [2, 1]]);
     * const resultMatrix = matrix.invertLower();
     * console.log(resultMatrix.toString());
     * // Output:
     * // " 1 0"
     * // "-2 1"
     *
     */
    public invertLower(): Matrix<T> {
        if (!this.isSquare)
            throw new MatrixError("Can't use this method for inverting a non square matrix, see the inverse method instead", 812, { matrix: this });
        if (!Matrix.isLowerTriangular(this))
            throw new MatrixError("Matrix is not lower triangular", 815, { matrix: this });

        const identityMatrix: Matrix<T> = Matrix.identity(this.rows, this.numerical);
        let invertedMatrixElements: T[][] = [];

        for (let i = 0; i < this.rows; i++) {
            invertedMatrixElements[i] = this.forwardSubstitution(identityMatrix.getRow(i));
        }

        // invertedMatrixElements.reverse() is removed

        return new Matrix<T>(invertedMatrixElements, { numerical: this.numerical }).transpose();
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Utility methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Computes the adjugate of the matrix.
     *
     * @throws {MatrixError} If the matrix is not square.
     * @returns {Matrix<T>} The adjugate matrix
     *
     * @example
     * const matrix = new Matrix<number>([[1, 2], [3, 4]]);
     * const adjugateMatrix = matrix.adjugate();
     * console.log(adjugateMatrix.toArray());
     * // Output: Array representation of adjugate matrix
     */
    public adjugate(): Matrix<T> {
        if (!this.isSquare) throw new MatrixError("adjugate is not defined for non-square matrix", -1);
        return this.cofactorMatrix().transpose()
    }


    //TODO:make this better
    /**
    * Checks if the current matrix is equal to another matrix.
    * @param {Matrix<T>} B - The matrix to compare with.
    * @param {number} threshold - Threshold for the method to return true defaults to 1e-12
    * @returns {boolean} 'true' if the matrices are equal, 'false' otherwise.
    *
    * @example
    * 
    * const matrixA = new Matrix([[1, 2], [3, 4]]);
    * const matrixB = new Matrix([[1, 2], [3, 4]]);
    * const isEqual = matrixA.equal(matrixB);
    * console.log(isEqual);
    * // Output: true
    *
    */
    public equal(B: Matrix<T>, threshold: number = Constants.DELTA): boolean {
        if (B.dataType !== this.dataType || B.shape !== this.shape) return false;
        if (B.dataType === "number") { //TODO: Check the equal
            return (this.mElements as number[]).every((entry: number, index: number) => math.equal(entry, (B.mElements as number[])[index], threshold))
        }
        return this.mElements.every((entry: T, index: number) => entry === B.mElements[index])
    }

    /**
     * Computes the cofactor matrix.
     *
     * @throws {MatrixError} If the matrix is not square.
     * @returns {Matrix<T>} The cofactor matrix
     *
     * @example
     * const matrix = new Matrix([[1, 2, 3], [0, 4, 5], [1, 0, 6]]);
     * const cofactorMatrix = matrix.cofactorMatrix();
     * console.log(cofactorMatrix.toArray());
     * // Output: [[24, 5, -4], [-12, 3, 2], [-2, -5, 4]]
     */
    public cofactorMatrix(): Matrix<T> {
        if (!this.isSquare) throw new MatrixError("Cofactor is not defined for non-square matrix", -1);
        const cofactorMatrix: Matrix<T> = Matrix.zeros(this.rows, this.columns, this.numerical)

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.rows; j++) {
                const minorMatrix: Matrix<T> = this.removeRow(i).removeColumn(j)
                const det: number = minorMatrix.det()
                const cofactor: T = this.numerical.fromIntegral(det * Math.pow(-1, i + j))
                cofactorMatrix.setElement(i, j, cofactor)
            }
        }

        return cofactorMatrix;
    }

    /**
     * Returns the maximum value in the matrix.
     * @public
     * @returns {T} The maximum value.
     *
     * @example
     *
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
     * const max = matrix.max();
     * console.log(max);
     * // Output: 6
     */
    public max(): T {
        let max: T = this.mElements[0];
        for (let i = 1; i < this.size; i++) {
            let cur: T = this.mElements[i];
            if (this.numerical.toIntegral(max) < this.numerical.toIntegral(cur)) {
                max = cur;
            }
        }
        return max;
    }

    /**
     * Returns the minimum value in the matrix.
     * @public
     * @returns {T} The minimum value.
     *
     * @example
     *
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
     * const max = matrix.max();
     * console.log(max);
     * // Output: 1
     */
    public min(): T {
        let min: T = this.mElements[0];
        for (let i = 1; i < this.size; i++) {
            let cur: T = this.mElements[i];
            if (this.numerical.toIntegral(min) > this.numerical.toIntegral(cur)) {
                min = cur;
            }
        }
        return min;
    }


    /**
    * Calculates the rank of the matrix.
    * The rank of a matrix is defined as the maximum number of linearly independent rows or columns.
    * @public
    * @returns { number } The rank of the matrix.
    *
    * @example
        *
    * const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    * const rank = matrix.rank();
    * console.log(rank);
    * // Output: 2
    */
    public rank(): number {
        const rankMatrix: Matrix<T> = (this.gaussianElimination() as Matrix<T>)
        Matrix.roundMatrixToZero(rankMatrix)

        let rank: number = 0;

        for (let i = 0; i < this.rows; i++) {
            if (rankMatrix.getRow(i).findIndex((val: T) => val !== this.numerical.zeroValue) !== -1) {
                rank++
            }
        }

        return rank;
    }

    /**
     * Computes the sum of the elements in the matrix.
     *
     * @returns {T} The sum of the elements in the matrix.
     *
     * @example
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * const sum = matrix.sum();
     * console.log(sum);
     * // Output: 10
     */
    public sum(): T {
        return math.sum(this.mElements, this.numerical)
    }

    /**
     * Calculates the trace of the matrix.
     * Throws an error if the matrix is not square.
     * @public
     * @returns {T} The trace value.
     * @throws {MatrixError} If the matrix is not square.
     *
     * @example
     *
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
     * const trace = matrix.trace();
     * console.log(trace);
     * // Output: 15
     */
    public trace(): T {
        if (!this.isSquare) throw new MatrixError("Trace is not defined for non-square matrix", -1);
        const diag: T[] = this.diag();
        const sum: T = diag.reduce((acc: T, cur: T) => this.numerical.add(acc, cur), this.numerical.zeroValue);
        return sum;
    }



    /**
     * Prints the matrix in a formatted way.
     * @public 
     * @returns {void}
     *
     * @example
     * 
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
     * matrix.print();
     * // Output:
     * // "1  2  3"
     * // "4  5  6"
     *
     */
    public print(): void {
        const shape: number[] = [this.rows, this.columns];

        function col(mat: T[][], i: number): T[] {
            return mat.map(row => row[i]);
        }

        const colMaxes: number[] = [];
        for (let i = 0; i < shape[1]; i++) {
            //@ts-ignore
            colMaxes.push(Math.max(...col((this as Matrix<T>).toArray(), i).map(n => this.numerical.toString(n).length)));
        }

        this.toArray().forEach(row => {
            console.log(
                ...row.map((val, j) => {
                    return (
                        //@ts-ignore
                        new Array(colMaxes[j] - this.numerical.toString(val.toString()).length + 1).join(" ") +
                        //@ts-ignore
                        this.numerical.toString(val.toString()) +
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
     *
     * @example
     *
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * const matrixArray = matrix.toArray();
     * console.log(matrixArray);
     * // Output: [[1, 2], [3, 4]]
     *
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
     *
     * @example
     * 
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * const matrixString = matrix.toString();
     * console.log(matrixString);
     * // Output:
     * // "1  2"
     * // "3  4"
     *
     */
    public toString(): string {
        const shape: number[] = [this.rows, this.columns];

        function col(mat: T[][], i: number): T[] {
            return mat.map(row => row[i]);
        }

        const colMaxes: number[] = [];
        for (let i = 0; i < shape[1]; i++) {
            //@ts-ignore
            colMaxes.push(Math.max(...col((this as Matrix<T>).toArray(), i).map(n => this.numerical.toString(n).length)));
        }

        let output: string = "";
        this.toArray().forEach(row => {
            output += row
                .map((val, j) => {
                    return (
                        //@ts-ignore
                        new Array(colMaxes[j] - this.numerical.toString(val).length + 1).join(" ") +
                        //@ts-ignore

                        this.numerical.toString(val) +
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
       * Reshapes a matrix into a new matrix with the specified number of rows and columns.
       * @public
       * @static
       * @param {Matrix<any>} array - The matrix to reshape
       * @param {number} newRows - The number of rows in the reshaped matrix.
       * @param {number} newColumns - The number of columns in the reshaped matrix.
       * @returns {Matrix<any>} The reshaped matrix.
       * @throws {MatrixError} - If the length of the array is not equal to newRows * newColumns.
       *
       * @example
       * 
       * const array = [1, 2, 3, 4];
       * const reshapedMatrix = Matrix.reshape(array, 2, 2);
       * console.log(reshapedMatrix.toString());
       * // Output:
       * // "1  2"
       * // "3  4"
       *
       */
    public static reshape<T>(array: Matrix<T>, newRows: number, newColumns: number): Matrix<T>

    /**
     * Reshapes a 1D array into a matrix with the specified number of rows and columns.
     * @public
     * @static
     * @param {any[]} array - The 1D array to reshape.
     * @param {number} newRows - The number of rows in the reshaped matrix.
     * @param {number} newColumns - The number of columns in the reshaped matrix.
     * @returns {Matrix<any>} The reshaped matrix.
     * @throws {MatrixError} - If the length of the array is not equal to newRows * newColumns.
     *
     * @example
     * 
     * const array = [1, 2, 3, 4];
     * const reshapedMatrix = Matrix.reshape(array, 2, 2);
     * console.log(reshapedMatrix.toString());
     * // Output:
     * // "1  2"
     * // "3  4"
     *
     */
    public static reshape<T>(array: T[], newRows: number, newColumns: number, numerical?: Numerical<T>): Matrix<T>

    public static reshape<T>(array: T[] | Matrix<T>, newRows: number, newColumns: number, numerical?: Numerical<T>): Matrix<T> {
        let reshapes: T[] = []
        if (array instanceof Matrix) {
            reshapes = array.mElements;
        } else {
            reshapes = array
        }
        if (reshapes.length !== newRows * newColumns) throw new MatrixError("Invalid reshape dimensions", 806, { newRows, newColumns });
        if (!Array.isArray(reshapes) || typeof newRows !== "number" || typeof newColumns !== "number") throw new MatrixError("Invalid argument", 606, { reshapes, newRows, newColumns });


        const newEntries: T[][] = [];
        let rowIndex: number = 0;
        let colIndex: number = 0;

        for (let i = 0; i < reshapes.length; i++) {
            if (colIndex === newColumns) {
                rowIndex++;
                colIndex = 0;
            }

            if (!newEntries[rowIndex]) newEntries[rowIndex] = [];

            newEntries[rowIndex][colIndex] = reshapes[i];
            colIndex++;
        }

        if (array instanceof Matrix) {

        } else {
            if (numerical) {

            }
        }

        return new Matrix<T>(newEntries, { numerical: array instanceof Matrix ? array.numerical : numerical })
    }


    /**
     * Clones the matrix instance and returns the clone
     * @public
     * @static
     * @returns {Matrix<T>} The cloned matrix
     *
     * @example
     * 
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * const clonedMatrix = Matrix.clone(matrix);
     * console.log(clonedMatrix.toString());
     * // Output:
     * // "1  2"
     * // "3  4"
     *
     */
    public static clone<T>(A: Matrix<T>): Matrix<T> {

        return new Matrix<T>(_.cloneDeep(A.toArray()), { numerical: A.numerical })


    }

    /**
     * Sets all elements of the matrix to null values.
     *
     * @template T - The type of elements in the matrix.
     *
     * @param {Matrix<T>} A - The matrix to nullify.
     *
     * @throws {MatrixError} If the argument is not an instance of Matrix.
     *
     * @example
     * const matrix = new Matrix<number>([[1, 2], [3, 4]]);
     * Matrix.null(matrix);
     * console.log(matrix.toArray());
     * // Output: [[0, 0], [0, 0]]
     */
    public static nullify<T>(A: Matrix<T>): void {
        if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { A });
        A.mElements = new Array(A.size).fill(A.numerical.zeroValue)
    }

    /**
     * Method used to pad the matrix dimensions to the nearest power of two.
     * @public
     * @static
     * @param {Matrix<T>} A - The matrix to pad
     * @returns {Matrix<T>} The padded matrix with dimensions as a power of two.
     *
     * @example
     * 
     * const matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
     * const paddedMatrix = Matrix.padMatrixToPowerOfTwo(matrix);
     * console.log(paddedMatrix.toString());
     * // Output:
     * // "1  2  3  0"
     * // "4  5  6  0"
     * // "0  0  0  0"
     * // "0  0  0  0"
     *
     */
    public static padMatrixToPowerOfTwo<T>(A: Matrix<T>): Matrix<T> {


        const rows: number = A.rows;
        const columns: number = A.columns
        const maxDimension: number = Math.max(rows, columns);
        const nextPower: number = math.nextPowerOfTwo(maxDimension);

        if (nextPower === rows && nextPower === columns) {
            return A; // No padding required as the matrix is already a power of two.
        }

        const paddedMatrix: T[] = Array<T>(nextPower * nextPower).fill(A.numerical.zeroValue);

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
     * @param {Matrix<T>} A - Matrix to round
     * @returns {void}
     *
     * @example
     * 
     * const matrix = new Matrix([[0.001, 1], [2, 0.0001]]);
     * Matrix.roundMatrixToZero(matrix);
     * console.log(matrix.toString());
     * // Output:
     * // "0  1"
     * // "2  0"
     *
     */
    public static roundMatrixToZero<T>(A: Matrix<T>, threshold: number = Constants.DELTA): void {
        const size: number = A.size;

        for (let i = 0; i < size; i++) {
            if (A.numerical.toIntegral(math.abs(A.mElements[i], A.numerical)) < threshold) {
                A.mElements[i] = A.numerical.zeroValue;
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
     *
     * @example
     * 
     * const matrix = new Matrix([[1.2345, 2.3456], [3.4567, 4.5678]]);
     * Matrix.toFixedMatrix(matrix, 2);
     * console.log(matrix.toString());
     * // Output:
     * // "1.23  2.35"
     * // "3.46  4.57"
     *
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
     *
     * @example
     * 
     * const identityMatrix = Matrix.identity(3);
     * console.log(identityMatrix.toString());
     * // Output:
     * // "1  0  0"
     * // "0  1  0"
     * // "0  0  1"
     *
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

        return new Matrix<T>(entries, { numerical })
    }

    /**
     * Creates a matrix filled with ones with the specified number of rows and columns.
     * @public
     * @static
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix.
     * @returns {Matrix} - The matrix filled with ones.
     * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
     *
     * @example
     * 
     * const onesMatrix = Matrix.ones(2, 2);
     * console.log(onesMatrix.toString());
     * // Output:
     * // "1  1"
     * // "1  1"
     *
     */
    public static ones<T>(rows: number, columns: number, numerical?: Numerical<T>): Matrix<T> {
        if (!numerical) {
            numerical = new NumericalNumber() as unknown as Numerical<T>;
        }

        if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, { rows, columns });
        return new Matrix<T>(new Array(rows).fill(numerical.zeroValue).map(() => new Array(columns).fill(numerical.oneValue)), { numerical })
    }


    /**
     * Creates a random matrix with the specified number of rows and columns.
     * @public
     * @static
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix
     * @returns {Matrix} The randomized matrix
     * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
     *
     * @example
     * 
     * const randomMatrix = Matrix.random(2, 2);
     * console.log(randomMatrix.toString());
     * // Output: (will vary due to randomness)
     * // "45  78"
     * // "12  67"
     *
     */
    public static random<T>(rows: number, columns: number, numerical?: Numerical<T>): Matrix<T> {
        if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, { rows, columns });
        if (!numerical) {
            numerical = new NumericalNumber() as unknown as Numerical<T>;
        }
        const entries: T[][] = [];

        for (let i = 0; i < rows; i++) {

            const row: T[] = [];
            for (let j = 0; j <
                columns; j++) {
                const randomValue: T = numerical.fromIntegral(Math.floor(Math.random() * 100));
                row.push(randomValue);
            }
            entries.push(row);
        }

        return new Matrix<T>(entries);
    }


    /**
     * Creates a matrix filled with zeros with the specified number of rows and columns.
     * @public
     * @static
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix.
     * @returns {Matrix} - The matrix filled with zero elements.
     * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
     *
     * @example
     * 
     * const zerosMatrix = Matrix.zeros(2, 2);
     * console.log(zerosMatrix.toString());
     * // Output:
     * // "0  0"
     * // "0  0"
     *
     */
    public static zeros<T>(rows: number, columns: number, numerical?: Numerical<T>): Matrix<T> {
        if (!numerical) {
            numerical = new NumericalNumber() as unknown as Numerical<T>;
        }
        if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, { rows, columns });
        return new Matrix<T>(new Array(rows).fill(numerical.zeroValue).map(() => new Array(columns).fill(numerical.zeroValue)), { numerical })
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
     *
     * @example
     * 
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * console.log(Matrix.isIntMatrix(matrix)); // Output: true
     *
     * const nonIntMatrix = new Matrix([[1.5, 2.7], [3.1, 4.6]]);
     * console.log(Matrix.isIntMatrix(nonIntMatrix)); // Output: false
     *
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
     * @param {Matrix} A - The matrix to check
     * @return {Boolean} - Returns true if the matrix is lower triangular, false otherwise.
     *
     * @example
     * 
     * const lowerTriangularMatrix = new Matrix([[1, 0, 0], [2, 3, 0], [4, 5, 6]]);
     * console.log(Matrix.isLowerTriangular(lowerTriangularMatrix)); // Output: true
     *
     * const nonLowerTriangularMatrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
     * console.log(Matrix.isLowerTriangular(nonLowerTriangularMatrix)); // Output: false
     *
     */
    public static isLowerTriangular<T>(A: Matrix<T>): Boolean {
        if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { A });
        const columns: number = A.columns;
        for (let i = 1; i < columns; i++) {
            for (let j = 0; j < i; j++) {
                if (A.getElement(j, i) !== A.numerical.zeroValue) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * This method checks if the given matrix is upper triangular.
     * A matrix is said to be upper triangular if all its entries below the main diagonal are zero.
     * @public
     * @static
     * @param {Matrix} A - The matrix to check
     * @return {Boolean}  Returns true if the matrix is upper triangular, false otherwise.
     *
     * @example
     * 
     * const upperTriangularMatrix = new Matrix([[1, 2, 3], [0, 4, 5], [0, 0, 6]]);
     * console.log(Matrix.isUpperTriangular(upperTriangularMatrix)); // Output: true
     *
     * const nonUpperTriangularMatrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
     * console.log(Matrix.isUpperTriangular(nonUpperTriangularMatrix)); // Output: false
     *
     */
    public static isUpperTriangular<T>(A: Matrix<T>): boolean {
        if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { A });
        const columns: number = A.columns;
        for (let i = 1; i < columns; i++) {
            for (let j = 0; j < i; j++) {
                if (A.getElement(i, j) !== A.numerical.zeroValue) {
                    return false;
                }
            }
        }
        return true;
    }


    /**
     * Checks if the given matrix is empty.
     * @public
     * @template T - The type of elements in the matrix.
     * @param {Matrix<T>} A - The matrix to check.
     * @returns {boolean} - True if the matrix is empty, false otherwise.
     * @throws {MatrixError} - If the argument is not an instance of Matrix.
     *
     * @example
     * const matrix = new Matrix([[1, 2], [3, 4]]);
     * const empty = Matrix.isEmpty(matrix);
     * console.log(empty);
     * // Output: false
     */
    public static isEmpty<T>(A: Matrix<T>): boolean {
        if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { A });
        return A.mElements.findIndex((val: T) => val !== A.numerical.zeroValue) === -1
    }

    /**
     * Checks if the given matrix is diagonal.
     * @public
     * @template T - The type of elements in the matrix.
     * @param {Matrix<T>} A - The matrix to check.
     * @returns {boolean} - True if the matrix is diagonal, false otherwise.
     * @throws {MatrixError} - If the argument is not an instance of Matrix.
     *
     * @example
     * const matrix = new Matrix([[1, 0], [0, 2]]);
     * const diagonal = Matrix.isDiagonal(matrix);
     * console.log(diagonal);
     * // Output: true
     */
    public static isDiagonal<T>(A: Matrix<T>): boolean {
        if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { A });
        const mainDiag: T[] = A.diag()
        if (mainDiag.filter((val: T) => val !== A.numerical.zeroValue).length === 0) return false;
        for (let i = 1; i < A.rows; i++) {
            const posDiag: T[] = A.diag(i)
            const negDiag: T[] = A.diag(i * (-1))
            if (posDiag.findIndex((val: T) => val !== A.numerical.zeroValue) !== -1) return false;
            if (negDiag.findIndex((val: T) => val !== A.numerical.zeroValue) !== -1) return false;

        }
        return true
    }

    /**
     * Checks if the given matrix is symmetric.
     * @public
     * @template T - The type of elements in the matrix.
     * @param {Matrix<T>} A - The matrix to check.
     * @returns {boolean} - True if the matrix is symmetric, false otherwise.
     * @throws {MatrixError} - If the argument is not an instance of Matrix.
     *
     * @example
     * const matrix = new Matrix([[1, 2], [2, 3]]);
     * const symmetric = Matrix.isSymmetric(matrix);
     * console.log(symmetric);
     * // Output: true
     */
    public static isSymmetric<T>(A: Matrix<T>): boolean {
        if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { A });
        if (!A.isSquare) return false
        return A.equal(A.transpose())
    }


    /**
     * Checks if the given matrix is an identity matrix.
     * @public
     * @template T - The type of elements in the matrix.
     * @param {Matrix<T>} A - The matrix to check.
     * @returns {boolean} - True if the matrix is an identity matrix, false otherwise.
     * @throws {MatrixError} - If the argument is not an instance of Matrix.
     *
     * @example
     * const matrix = new Matrix([[1, 0], [0, 1]]);
     * const identity = Matrix.isIdentity(matrix);
     * console.log(identity);
     * // Output: true
     */
    public static isIdentity<T>(A: Matrix<T>): boolean {
        if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { A });
        if (!A.isSquare) return false
        return A.equal(Matrix.identity(A.rows, A.numerical))
    }



}


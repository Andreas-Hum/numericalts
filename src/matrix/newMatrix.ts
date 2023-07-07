import MatrixError from "../errors/MatrixError";
import * as fs from 'fs';

//TODO: Add impliment and continue adding methods
export class Matrix {

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
     * @param {number[][]} entries - The entries of the matrix.
     */
    constructor(entries: number[][]) {
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
    * Set and get element
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

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
        if (typeof value !== "number") throw new MatrixError("Invalid value", 803, { value })
        const index: number = row * this.columns + column;
        if (index > this.size || index < 0) throw new MatrixError("Index out of bounds", 800, { row, column });
        this.mElements[index] = value;
    }

    /**
     * Gets the value of an element in the matrix.
     * @public
     * @param {number} row - The row index of the element.
     * @param {number} column - The column index of the element.
     * @returns {number} The value of the element.
     * @throws {MatrixError} - If index is out of bounds
     */
    public getElement(row: number, column: number): number {
        const index: number = row * this.columns + column;
        if (index > this.size || index < 0) throw new MatrixError("Index out of bounds", 800, { row, column });
        return this.mElements[index];
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Basic operations add, subtract, naiveMultiply and scale
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Adds another matrix to this matrix.
     * @public
     * @param {Matrix} B - The matrix to add.
     * @returns {Matrix} The resulting matrix.
     */
    public add(B: Matrix): Matrix {
        if (this.shape !== B.shape) {
            throw new MatrixError("Invalid matrix dimensions for addition", 805, { ARows: this.rows, AColumns: this.columns, BRows: B.rows, BColumns: B.columns });
        }

        const result: Matrix = new Matrix(new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0)));

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const sum = this.getElement(i, j) + B.getElement(i, j);
                result.setElement(i, j, sum);
            }
        }

        return result;
    }


    /**
      * Multiplies this matrix with another matrix.
      * @public
      * @param {Matrix} B - The matrix to multiply with.
      * @returns {Matrix} The resulting matrix.
      */
    public naiveMultiply(B: Matrix): Matrix {
        if (this.columns !== B.rows) {
            throw new MatrixError("Invalid matrix dimensions for multiplication", 807, { rows: B.rows, columns: this.columns });
        }

        const result: Matrix = Matrix.zeros(this.rows, B.columns)

        const rows = this.rows;
        const columns = this.columns;
        const matrixColumns = B.columns;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < matrixColumns; j++) {
                let sum = 0;
                for (let k = 0; k < columns; k++) {
                    const elementA: number = this.getElement(i, k);
                    const elementB: number = B.getElement(k, j);
                    sum += elementA * elementB;
                }
                result.setElement(i, j, sum);
            }
        }

        return result;
    }

    /**
     * Scales the matrix and returns a new matrix with the result of the scaling
     * @public
     * @param {number} scalar - The scalar to scale the matrix with 
     * @returns {matrix} The scaled matrix
     */
    public scale(scalar: number): Matrix {
        if (typeof scalar !== "number") throw new MatrixError("Invalid scalar", 606, { scalar });
        const scaledMatrix: Matrix = this.clone();
        scaledMatrix.mElements = scaledMatrix.mElements.map((entry: number) => entry * scalar)
        return scaledMatrix;
    }

    /**
     * Subtracts another matrix from this matrix.
     * @public
     * @param {Matrix} B - The matrix to subtract.
     * @returns {Matrix} The resulting matrix.
     */
    public subtract(B: Matrix): Matrix {
        if (this.shape !== B.shape) {
            throw new MatrixError("Invalid matrix dimensions for subtraction", 805, { ARows: this.rows, AColumns: this.columns, BRows: B.rows, BColumns: B.columns });
        }

        const result: Matrix = Matrix.zeros(this.rows, this.columns)

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const difference: number = this.getElement(i, j) - B.getElement(i, j);
                result.setElement(i, j, difference);
            }
        }

        return result;
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Utility methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Clones the matrix instance and returns the clone
     * @public
     * @returns {Matrix} The cloned matrix
     */
    public clone(): Matrix {
        return new Matrix(this.toArray())
    }


    /**
     * Prints the matrix in a formatted way.
     * @public
     * @returns {void}
     */
    public print(): void {
        const shape = [this.rows, this.columns];

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

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Static methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


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
        if (array.length !== newRows * newColumns) {
            throw new MatrixError("Invalid reshape dimensions", 806, { newRows, newColumns });
        }

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
    public static identity(dimension: number): Matrix {
        if (dimension <= 0) throw new MatrixError("Invalid argument", 606, { dimension });

        const entries: number[][] = [];

        for (let i = 0; i < dimension; i++) {
            const row: number[] = [];
            for (let j = 0; j < dimension; j++) {
                if (i === j) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            entries.push(row);
        }

        return new Matrix(entries)
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
    public static ones(rows: number, columns: number): Matrix {
        if (rows <= 0 || columns <= 0) throw new MatrixError("Invalid argument", 606, { rows, columns });
        return new Matrix(new Array(rows).fill(1).map(() => new Array(columns).fill(1)))
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
    public static random(rows: number, columns: number): Matrix {
        if (rows <= 0 || columns <= 0) throw new MatrixError("Invalid argument", 606, { rows, columns });

        const entries: number[][] = [];

        for (let i = 0; i < rows; i++) {
            const row: number[] = [];
            for (let j = 0; j <
                columns; j++) {
                const randomValue: number = Math.random() * 100;
                row.push(randomValue);
            }
            entries.push(row);
        }

        return new Matrix(entries);
    }


    /**
     * Creates a matrix filled with zeros with the specified number of rows and columns.
     * @public
     * @static
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix.
     * @returns {Matrix} - The matrix filled with zeros.
     * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
     */
    public static zeros(rows: number, columns: number): Matrix {
        if (rows <= 0 || columns <= 0) throw new MatrixError("Invalid argument", 606, { rows, columns });
        return new Matrix(new Array(rows).fill(0).map(() => new Array(columns).fill(0)))
    }


}


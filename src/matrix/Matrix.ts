//Type imports
import { MatrixTypes, MTypes } from "./MatrixTypes";

//Error import
import MatrixError from "../errors/MatrixError";

//Vector import
import { Vector } from "../vector/Vector";



export class Matrix implements MatrixTypes {

    public shape: string = "0";
    public isColumnMatrix: boolean = false;
    public isRowMatrix: boolean = false;
    public isSquare: boolean = false;
    public isTall: boolean = false;
    public isWide: boolean = false;

    public rows: number = Infinity;
    public columns: number = Infinity;
    public size: number = Infinity;
    public elements: Vector[]

    /**
     * Constructs a matrix object.
     * @class
     * @constructor
     * @param {number[][] | Vector[]} entries - The entries of the matrix.
     */
    constructor(entries: number[][] | Vector[]) {
        if (!Array.isArray(entries)) {
            throw new MatrixError('Input must be an array.', 801);
        } else {
            try {
                for (let i = 0; i < entries.length; i++) {
                    if (!(entries[i] instanceof Vector)) {
                        entries[i] = new Vector(entries[i] as number[])
                    }
                }
                this.elements = entries as Vector[]
            } catch (err) {
                if (err.statusCode === 603) {
                    throw new MatrixError(`Invalid element for matrix. Expected number, got: ${typeof err.details.invalidEntry}.`, 803, { invalidEntry: err.details.invalidEntry });
                } else if (err.statusCode === 601) {
                    throw new MatrixError(`Element missmatch got column and row elements`, 801);
                }
            }

            this.validateMatrix()

        }
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    *
    * METHODS IN ALPHABETICAL ORDER
    *
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * A
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * B
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * C
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * D
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * E
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * F
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * H
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * G
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * I
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * J
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * K
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * L
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * M
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * N
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    /**
     * Performs matrix multiplication using the current matrix and another provided matrix. 
     * If the provided matrix is not an instance of Matrix, it converts it to an instance of Matrix.
     * Ensures compatibility of matrices (i.e. columns of the first must match the rows of the second). 
     * If the second matrix is a Row Matrix, it converts it to a Column Matrix,
     * likewise if the first matrix is a Column Matrix, it converts it to a Row Matrix before performing multiplication.
     * The operation relies on the dot product of vectors.
     * @param {number[][] | Matrix} matrixToMultiply - The matrix to multiply with the current matrix. 
     * @throws {MatrixError} If the number of columns of the current matrix does not equal the number of rows of the matrix to multiply.
     * @return {Matrix} The resulting matrix after the multiplication operation
     * @method
     * @public
     */
    public naiveMultiply(matrixToMultiply: number[][] | Matrix): Matrix {
        if (!(matrixToMultiply instanceof Matrix)) {
            matrixToMultiply = new Matrix(matrixToMultiply as number[][])
        }

        if (this.columns !== matrixToMultiply.rows) {
            throw new MatrixError("Dimention missmatch: Columns of first matrix does not equal the rows of the second", 810)
        }
        let psudoMatrix: Matrix = this

        if (matrixToMultiply.isRowMatrix) {
            matrixToMultiply = matrixToMultiply.toColumnMatrix()
        }
        if (this.isColumnMatrix) {
            psudoMatrix = this.toRowMatrix()
        }

        let result: number[][] = [];

        for (let i = 0; i < this.rows; i++) {
            result.push([])
            for (let j = 0; j < matrixToMultiply.columns; j++) {
                result[i][j] = this.elements[i].dot(matrixToMultiply.elements[j])
            }
        }

        return new Matrix(result)

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * O
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * P
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Prints matrix to the console.
     * @public
     * @returns {void}
     */
    public printMatrix(): void {
        if (this.isRowMatrix) {
            this.elements.forEach(rowVector => {
                console.log(rowVector.elements);
            });
        }
        else if (this.isColumnMatrix) {
            // Transpose operation for printing column vector in a more readable way.
            for (let i = 0; i < this.elements[0].elements.length; i++) {
                let row = [];
                for (let j = 0; j < this.columns; j++) {
                    row.push(this.elements[j].elements[i]);
                }
                console.log(row.flat());
            }
        }
        console.log('---------------');
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Q
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * R
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * S
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * T
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Converts a row matrix to a column matrix
     */
    public toColumnMatrix(): Matrix {
        if (this.isColumnMatrix) {
            throw new MatrixError("Method can only convert row matrices.", 802);
        }

        const columnMatrix = this.elements[0].elements.map((_, i) => {
            // Each new row Vector becomes a column Vector in the transposed matrix
            // Mapping over this.elements extracts the i-th element from each row vector
            //@ts-ignore
            return new Vector(this.elements.map(rowVector => [rowVector.elements[i]])); // vector entries should be array of arrays
        });

        return new Matrix(columnMatrix);  // Returns a new matrix and leaves the current one unaffected
    }

    /**
     * Converts a column matrix to a row matrix
     */
    public toRowMatrix(): Matrix {

        if (this.isRowMatrix) {
            throw new MatrixError("Method can only convert column matrices.", 802);
        }

        const rowMatrix = this.elements[0].elements.map((_, i) => {

            // @ts-ignore
            return new Vector(this.elements.map(columnVector => columnVector.elements[i][0])); // vector entries should be flat array
        });

        return new Matrix(rowMatrix);  // Returns a new matrix and leaves the current one unaffected
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * U
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Updates matrix-related dimensions and states.
     * @private
     * @returns {void}
     */
    private updateDimension(): void {
        if (this.elements.every((e: Vector) => e.isRow)) {
            this.isRowMatrix = true
            this.isColumnMatrix = false
            this.rows = this.elements.length
            this.columns = this.elements[0].size
        } else if (this.elements.every((e: Vector) => e.isColumn)) {
            this.isColumnMatrix = true
            this.isRowMatrix = false
            this.columns = this.elements.length
            this.rows = this.elements[0].size
        } else {
            throw new MatrixError("Dimension mismatch: The matrix cant contain both column and row vectors", 801)
        }

        if (this.rows === this.columns) {
            this.isSquare = true
        } else if (this.rows > this.columns) {
            this.isTall = true
        } else {
            this.isWide = true
        }

        this.size = this.rows * this.columns
    }

    /**
     * Updates all aspects of Matrix.
     * @private
     * @returns {void}
     */
    private updateMatrix(): void {
        this.updateDimension()
        this.updateShape()
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
    * V
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Validates matrix properties and updates all aspects.
     * @private
     * @returns {void}
     */
    private validateMatrix(): void {
        const sizeGuide: number = this.elements.flat()[0].size;
        if (this.elements.some((e: Vector) => e.size !== sizeGuide)) {
            throw new MatrixError("Dimension missmatch: Not all vectors are the same size", 801)
        }

        this.updateMatrix()
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    *
    *
    * Special methods
    *
    *
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Norms
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * sum, mean and transpose
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Boolean tests
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    *
    *
    * Static methods
    *
    *
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    /**
     * Creates identity matrix using the 'Vector.createUnitVector' method.
     * @public
     * @param {number} rows - Number of rows in the matrix.
     * @param {number} columns - Number of columns in the matrix.
     * @param {boolean} columnMatrix - Indicates if column matrices should be generated.
     * @returns {Matrix} - The resulting identity Matrix.
     * @throws {MatrixError} - If rows or columns are not a positive number or columnMatrix is not a boolean.
     */
    public static createIdentityMatrix(dimension: number, columnMatrix: boolean = false): Matrix {
        if (dimension <= 0) {
            throw new MatrixError("Dimension mismatch: rows or columns can't be negative or zero", 802, { dimension });
        } else if (typeof columnMatrix !== "boolean") {
            throw new MatrixError("Invalid boolean", 805, { columnMatrix });
        }

        const unitVectorContainor: Vector[] = [];

        for (let i = 0; i < dimension; i++) {
            unitVectorContainor.push(Vector.createUnitVector(dimension, i, columnMatrix));
        }

        return new Matrix(unitVectorContainor);
    }

}


//Type imports
import { MatrixTypes, MTypes } from "./MatrixTypes";

//Error import
import MatrixError from "../errors/MatrixError";

//Vector import
import { Vector } from "../vector/Vector";
import { DELTA } from "../utils/constants";
import VectorError from "../errors/VectorError";


//TODO TEST TEST OG JSDOC

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

    public clone() {
        return new Matrix(this.elements)
    }

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

    // Abomination
    //public gs(): Matrix { let p = this.isRowMatrix ? this.toColumnMatrix() : this, a=[], n=[], i=0,j, o; for(; i<p.columns; i++) { o = p.elements[i]; for(j=0; j<i; j++) o = o.subtract(a[j].scale(a[j].dot(p.elements[i]) / a[j].dot(a[j]))); if (o.euclNorm() < DELTA) throw new VectorError("Vectors not linearly independent.", 704); a.push(o); n.push(o.normalize()); } return new Matrix(n); }

    /**
     * Performs the Gram-Schmidt process for the vectors of the current instance matrix. The process is an algorithm 
     * to orthonormalize a set of vectors in an inner product space, generally Euclidean n-space.
     *
     * The method takes the columns (considered as vectors) of the current matrix instance and generates an orthogonal
     * set of vectors that spans the same column space as the original set. The set of orthonormal vectors is computed
     * sequentially by subtracting the projections of a matrix column vector onto the previously computed orthogonal 
     * vectors from the column vector itself.
     *
     * @returns {Matrix} A new Matrix instance constructed using the orthonormal vectors as columns.
     *
     * @throws {VectorError} If any vector obtained during the process is nearly zero (having euclidean norm lesser than a small
     * constant - `DELTA`). In this case, this means that the provided set is not linearly independent.
     *
     * @public
     */
    public gramSmith(): Matrix {
        let psudoMatrix: Matrix = this;
        if (this.isRowMatrix) {
            psudoMatrix = this.toColumnMatrix()
        }

        let orthogonalVectors: Vector[] = [];
        orthogonalVectors.push(psudoMatrix.elements[0]);

        for (let i = 1; i < psudoMatrix.columns; i++) {
            let orthogonalProjection: Vector = psudoMatrix.elements[i];

            for (let j = 0; j < i; j++) {
                let u = orthogonalVectors[j];
                let v = psudoMatrix.elements[i];
                let uv = u.dot(v);
                let uu = u.dot(u);

                let projectionOf_I_onto_J: Vector = u.scale(uv / uu);

                orthogonalProjection = orthogonalProjection.subtract(projectionOf_I_onto_J);
            }

            if (orthogonalProjection.euclNorm() < DELTA) {
                throw new VectorError("Cannot normalize a nearly-zero vector. The given vectors are not linearly independent.", 704);
            }

            orthogonalVectors.push(orthogonalProjection);
        }

        const normalizedVectors: Vector[] = orthogonalVectors.map(vec => vec.normalize());
        return new Matrix(normalizedVectors);
    }



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
                let tempRes: number = this.elements[i].dot(matrixToMultiply.elements[j]);

                if (tempRes <= 0 + DELTA && 0 - DELTA <= tempRes) {
                    result[i][j] = 0
                } else {
                    result[i][j] = tempRes
                }

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
     * @returns {string} The print string
     */
    public printMatrix(): string {
        let ps: string = ""
        if (this.isRowMatrix) {
            this.elements.forEach(rowVector => {
                ps += rowVector.elements;
                ps += "\n"
            });
        }
        else if (this.isColumnMatrix) {
            // Transpose operation for printing column vector in a more readable way.
            for (let i = 0; i < this.elements[0].elements.length; i++) {
                let row = [];
                for (let j = 0; j < this.columns; j++) {
                    row.push(this.elements[j].elements[i]);
                }
                ps += row.flat()
                ps += "\n"
            }
        }
        return ps;
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

    public transpose(): Matrix {
        let newMatrix = this.clone(); // Assuming you have a method to clone the matrix.
        // If not, you will need to implement it.

        if (newMatrix.isColumnMatrix) {

            newMatrix.isColumnMatrix = false;
            newMatrix.isRowMatrix = true;

            for (let i = 0; i < newMatrix.columns; i++) {
                newMatrix.elements[i].transpose();
            }
        } else {
            newMatrix.isColumnMatrix = true;
            newMatrix.isRowMatrix = false;

            for (let i = 0; i < newMatrix.rows; i++) {
                newMatrix.elements[i].transpose();
            }
        }

        if (newMatrix.isWide) {
            newMatrix.isWide = false;
            newMatrix.isTall = true;

        } else if (newMatrix.isTall) {
            newMatrix.isWide = true;
            newMatrix.isTall = false;

        }

        let temp = newMatrix.columns;
        newMatrix.columns = newMatrix.rows;
        newMatrix.rows = temp;

        newMatrix.updateShape();

        return newMatrix;
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
    * Q
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    public QRDecomposition(): { Q: Matrix, R: Matrix } {
        let Q: Matrix = this.gramSmith();
        let QT: Matrix = Q.transpose();
        let R: Matrix = QT.naiveMultiply(this);

        return { Q: Q, R: R };
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

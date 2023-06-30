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
        if (!Array.isArray(entries))
            throw new MatrixError('Input must be an array.', 801);

        try {
            this.elements = entries.map(entry => entry instanceof Vector ? entry : new Vector(entry));
        } catch (err) {
            switch (err.statusCode) {
                case 603:
                    throw new MatrixError(`Invalid element for matrix. Expected number, got: ${typeof err.details.invalidEntry}.`, 803, { invalidEntry: err.details.invalidEntry });
                case 601:
                    throw new MatrixError(`Element mismatch got column and row elements`, 801);
            }
        }

        this.validateMatrix();
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

    /**
     * Performs back-propagation on an upper triangular matrix to solve
     * a system of linear equations.
     *
     * @returns {number[]} Solution to the system of linear equations
     * represented by the current matrix.
     *
     * @throws {MatrixError} If the matrix contains a zero on the diagonal (unsolvable system)
     */
    public backPropagation(): number[] {
        let solverMatrix: Matrix = this.isRowMatrix ? this : this.toColumnMatrix();
        const sol: number[] = [];

        for (let i = solverMatrix.rows - 1; i >= 0; i--) {
            if (solverMatrix.elements[i].elements[i] == 0) throw new MatrixError("Unsolvable system: zero on diagonal", 814);
            let sum: number = 0;
            for (let j = solverMatrix.columns - 2; j > i; --j) {
                sum += sol[j] * (solverMatrix.elements[i].elements[j] as number)
            }
            sol[i] = ((solverMatrix.elements[i].elements[solverMatrix.columns - 1] as number) - sum) / (solverMatrix.elements[i].elements[i] as number)
        }

        return sol
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * C
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Clones the matrix
     * @returns {Matrix} the same matrix
     */
    public clone(): Matrix {
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
    public naiveMultiply(matrixToMultiply: number[][] | Matrix, columnMatrix: boolean = false): Matrix {
        matrixToMultiply = matrixToMultiply instanceof Matrix ? matrixToMultiply : new Matrix(matrixToMultiply);
        if (this.columns !== matrixToMultiply.rows)
            throw new MatrixError("Dimension mismatch: columns of first matrix do not equal rows of second", 810);

        const pseudoMatrix = this.isColumnMatrix ? this.toRowMatrix() : this;
        if (matrixToMultiply.isRowMatrix) matrixToMultiply = matrixToMultiply.toColumnMatrix();

        const result = pseudoMatrix.elements.map(row =>
            (matrixToMultiply as Matrix).elements.map((_, j) => {
                let dotProduct = row.dot((matrixToMultiply as Matrix).elements[j]);
                return Math.abs(dotProduct) <= DELTA ? 0 : dotProduct;
            })
        );

        return columnMatrix ? (new Matrix(result)).toColumnMatrix() : new Matrix(result);
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
        // Helper function to get column values
        const col = (mat: Matrix, i: number) => mat.elements.map(row => row.elements[i]);

        // Calculate max length of numbers in each column when they are converted to strings
        const colMaxes = Array.from({
            length: this.columns
        }, (_, i) => Math.max(...col(this, i).map(n => n.toString().length)));

        // Use 'map' instead of 'forEach' to create an array of strings
        const matrixAsRows = this.elements.map(vector => {
            // Create string of values for each row
            return vector.elements.map((val, j) => {
                // Space padding for right alignment
                return new Array(colMaxes[j] - val.toString().length + 1).join(" ") + val.toString() + "  ";
            }).join("");
        });

        // Use 'join' to merge the array of strings into a single string with '\n' as the separator
        return matrixAsRows.join('\n').trim();
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
     * Transforms a row matrix into a column matrix. Each row in the initial matrix
     * will become a column in the resulting matrix.
     *
     * @throws {MatrixError} If the current matrix is already a column matrix.
     * @returns {Matrix} The converted column matrix.
     */
    public toColumnMatrix(): Matrix {
        if (this.isColumnMatrix) {
            throw new MatrixError("Method can only convert row matrices.", 802);
        }

        const columnMatrix = this.elements.map((vec: Vector) => {
            vec.transpose()
            return new Vector(vec.elements)
        });

        return new Matrix(columnMatrix);
    }

    /**
     * Transforms a column matrix into a row matrix. Each column in the initial matrix
     * will become a row in the resulting matrix.
     *
     * @throws {MatrixError} If the current matrix is already a row matrix.
     * @returns {Matrix} The converted row matrix.
     */
    public toRowMatrix(): Matrix {

        if (this.isRowMatrix) {
            throw new MatrixError("Method can only convert column matrices.", 802);
        }


        const rowMatrix = this.elements.map((vec: Vector) => {
            vec.transpose()
            return new Vector(vec.elements)
        });

        return new Matrix(rowMatrix);
    }


    /**
     * Transposes the current matrix. Rows will become columns and columns will become rows.
     * It modifies the 'isColumnMatrix', 'isRowMatrix', 'isWide' and 'isTall' properties to
     * reflect the change. Also, 'columns' and 'rows' properties are swapped.
     *
     * @returns {Matrix} The transposed matrix; a new instance of the matrix.
     */
    public transpose(): Matrix {
        let newMatrix = this.clone();

        if (newMatrix.isRowMatrix) {
            newMatrix = newMatrix.toColumnMatrix();
        }
        else if (newMatrix.isColumnMatrix) {
            newMatrix = newMatrix.toRowMatrix();
        }

        newMatrix.isWide = !this.isWide;
        newMatrix.isTall = !this.isTall;
        newMatrix.isRowMatrix = !this.isColumnMatrix;
        newMatrix.isColumnMatrix = !this.isRowMatrix;

        [newMatrix.columns, newMatrix.rows] = [this.rows, this.columns];

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

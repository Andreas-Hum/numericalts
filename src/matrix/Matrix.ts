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
    public mElements: Vector[]

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
            this.mElements = entries.map(entry => entry instanceof Vector ? entry : new Vector(entry));
        } catch (err) {
            switch (err.statusCode) {
                case 603:
                    throw new MatrixError(`Invalid element for matrix. Expected number, got: ${typeof err.details.invalidEntry}.`, 803, { invalidEntry: err.details.invalidEntry });
                case 601:
                    throw new MatrixError(`Element mismatch got column and row mElements`, 801);
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
    public backSubstitution(B: Vector): Vector {
        let b: Vector = B.isColumnVector ? B.transpose() : B.clone()

        let sol: number[] = [];

        for (let i = this.rows - 1; i >= 0; i--) {
            if (this.mElements[i].vElements[i] === 0) throw new Error("Unsolvable system: zero on diagonal");
            let sum: number = 0;
            for (let j = this.columns - 1; j > i; --j) {
                sum += sol[j] * (this.mElements[i].vElements[j] as number)
            }
            sol[i] = ((B.vElements[i] as number) - sum) / (this.mElements[i].vElements[i] as number)
        }


        return new Vector(sol)
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
        const clonedElements: Vector[] = this.mElements.map(vector => vector.clone());
        return new Matrix(clonedElements);
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
    //public gs(): Matrix { let p = this.isRowMatrix ? this.toColumnMatrix() : this, a=[], n=[], i=0,j, o; for(; i<p.columns; i++) { o = p.mElements[i]; for(j=0; j<i; j++) o = o.subtract(a[j].scale(a[j].dot(p.mElements[i]) / a[j].dot(a[j]))); if (o.euclNorm() < DELTA) throw new VectorError("Vectors not linearly independent.", 704); a.push(o); n.push(o.normalize()); } return new Matrix(n); }

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
        let psudoMatrix: Matrix = this.isRowMatrix ? this.toColumnMatrix() : this.clone();

        let orthogonalVectors: Vector[] = [];
        orthogonalVectors.push(psudoMatrix.mElements[0]);

        for (let i = 1; i < psudoMatrix.columns; i++) {
            let orthogonalProjection: Vector = psudoMatrix.mElements[i];

            for (let j = 0; j < i; j++) {
                let u = orthogonalVectors[j];
                let v = psudoMatrix.mElements[i];
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
        return (new Matrix(normalizedVectors)).toRowMatrix();
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * I
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
     * transposed, reversed, and finally converted into a row matrix to achieve the 
     * inverse of the original matrix.
     * 
     * @returns {Matrix} The inverted upper triangular matrix.
     *
     * @throws {Error} If the original matrix is not square, an error is thrown.
     */
    public invertUpperTriangular(): Matrix {
        //TODO: Psudo inverse
        if (this.rows !== this.columns) throw new Error("Uninvertable matrix: not a square matrix");

        const identityMatrix: Matrix = Matrix.createIdentityMatrix(this.rows);
        let invertedMatrixElements: Vector[] = [];

        for (let i = this.rows - 1; i >= 0; i--) {
            invertedMatrixElements[i] = this.backSubstitution(identityMatrix.mElements[this.rows - i - 1]);
        }

        invertedMatrixElements = invertedMatrixElements.map(ele => ele.transpose())
        invertedMatrixElements.reverse()

        return (new Matrix(invertedMatrixElements).toRowMatrix());
    }


    /**
     * This method checks if the matrix is lower triangular.
     * A matrix is said to be lower triangular if all its entries above the main diagonal are zero.
     *
     * @return {Boolean} - Returns true if the matrix is lower triangular, false otherwise.
     */
    public isLowerTriangular(): Boolean {
        for (let i = 1; i < this.columns; i++) {
            for (let j = 0; j < i; j++) {
                if (this.mElements[j].vElements[i] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * This method checks if the matrix is upper triangular.
     * A matrix is said to be upper triangular if all its entries below the main diagonal are zero.
     *
     * @return {Boolean} - Returns true if the matrix is upper triangular, false otherwise.
     */
    public isUpperTriangular(): boolean {
        for (let i = 1; i < this.columns; i++) {
            for (let j = 0; j < i; j++) {
                if (this.mElements[i].vElements[j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }




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

        let psudoMatrix = this.clone()
        if (matrixToMultiply.isRowMatrix) {
            matrixToMultiply = matrixToMultiply.toColumnMatrix()
        }

        if (psudoMatrix.isColumnMatrix) {
            psudoMatrix = psudoMatrix.toRowMatrix()
        }


        let result: number[][] = [];
        for (let i = 0; i < psudoMatrix.rows; i++) {
            result.push([])
            for (let j = 0; j < matrixToMultiply.columns; j++) {
                let tempRes: number = psudoMatrix.mElements[i].dot(matrixToMultiply.mElements[j]);
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
        const printerMatrix = this.isColumnMatrix ? this.toRowMatrix() : this
        const col: (mat: Matrix, i: number) => (number | number[])[] = (mat: Matrix, i: number) => mat.mElements.map(row => row.vElements[i]);

        const colMaxes: number[] = Array.from({
            length: printerMatrix.columns
        }, (_, i) => Math.max(...col(printerMatrix, i).map(n => n.toString().length)));

        const matrixAsRows: string[] = printerMatrix.mElements.map(vector => {
            return vector.vElements.map((val, j) => {
                return new Array(colMaxes[j] - val.toString().length + 1).join(" ") + val.toString() + "  ";
            }).join("");
        });

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
    private toColumnMatrix(): Matrix {
        if (this.isColumnMatrix) {
            throw new MatrixError("Method can only convert row matrices.", 802);
        }

        const columnMatrix = this.mElements[0].vElements.map((_, i) => {
            // Each new row Vector becomes a column Vector in the transposed matrix
            // Mapping over this.mElements extracts the i-th element from each row vector
            // console.log(this.mElements.map(rowVector => console.log(rowVector.mElements[i])))

            //@ts-ignore
            return new Vector(this.mElements.map(rowVector => [rowVector.vElements[i]])); // vector entries should be array of arrays
        });
        return new Matrix(columnMatrix);  // Returns a new matrix and leaves the current one unaffected
    }

    /**
     * Transforms a column matrix into a row matrix. Each column in the initial matrix
     * will become a row in the resulting matrix.
     *
     * @throws {MatrixError} If the current matrix is already a row matrix.
     * @returns {Matrix} The converted row matrix.
     */
    private toRowMatrix(): Matrix {
        if (this.isRowMatrix) {
            throw new MatrixError("Method can only convert column matrices.", 802);
        }
        const rowMatrix = this.mElements[0].vElements.map((_, i) => {
            // @ts-ignore
            return new Vector(this.mElements.map(columnVector => columnVector.vElements[i][0])); // vector entries should be flat array
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
        if (this.mElements.every((e: Vector) => e.isRowVector)) {
            this.isRowMatrix = true
            this.isColumnMatrix = false
            this.rows = this.mElements.length
            this.columns = this.mElements[0].size
        } else if (this.mElements.every((e: Vector) => e.isColumnVector)) {
            this.isColumnMatrix = true
            this.isRowMatrix = false
            this.columns = this.mElements.length
            this.rows = this.mElements[0].size
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
        const sizeGuide: number = this.mElements.flat()[0].size;
        if (this.mElements.some((e: Vector) => e.size !== sizeGuide)) {
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

    /**
 * Transposes the current matrix. Rows will become columns and columns will become rows.
 * It modifies the 'isColumnMatrix', 'isRowMatrix', 'isWide' and 'isTall' properties to
 * reflect the change. Also, 'columns' and 'rows' properties are swapped.
 *
 * @returns {Matrix} The transposed matrix; a new instance of the matrix.
 */
    public transpose(): Matrix {
        let newMatrix = this.clone(); // Assuming you have a method to clone the matrix.
        // If not, you will need to implement it.

        if (newMatrix.isColumnMatrix) {

            newMatrix = newMatrix.toRowMatrix()
            newMatrix = newMatrix.toColumnMatrix()
            newMatrix.mElements = newMatrix.mElements.map(ele => ele.transpose())

            newMatrix.isColumnMatrix = false;
            newMatrix.isRowMatrix = true;
        } else {

            newMatrix = newMatrix.toColumnMatrix()
            newMatrix = newMatrix.toRowMatrix()
            newMatrix.mElements = newMatrix.mElements.map(ele => ele.transpose())

            newMatrix.isColumnMatrix = true;
            newMatrix.isRowMatrix = false;
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

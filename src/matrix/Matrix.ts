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

    /**
     * Generic matrix addition method.
     * @param {Matrix} B - The Matrix to add.
     * @returns {Matrix} The result of the addition of the two matrices.
     * @throws {MatrixError} If the dimensions of the matrices do not match.
     */
    public add(B: Matrix): Matrix {
        if (this.shape !== B.shape) {
            throw new MatrixError('Dimension mismatch: Dimensions of the matrices must be the same for subtraction.', 802);
        }

        if (this.isColumnMatrix && B.isRowMatrix) {
            B = B.toColumnMatrix()
        } else if (this.isRowMatrix && B.isColumnMatrix) {
            B = B.toRowMatrix()
        } else {
            //Fast add here
        }

        let resultMatrix: Vector[] = [];
        for (let i = 0; i < (this.isRowMatrix ? this.rows : this.columns); i++) {
            resultMatrix.push(this.mElements[i].add(B.mElements[i]));
        }
        return new Matrix(resultMatrix);
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * B
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Performs back-substitution on an upper triangular matrix to solve
     * a system of linear equations.
     *
     * @returns {number[]} Solution to the system of linear equations
     * represented by the current matrix.
     *
     * @throws {MatrixError} if the matrix is not upper diagonal, or if the matrix contains a zero on the diagonal (unsolvable system)
     */
    public backSubstitution(B: Vector): Vector {
        B = B instanceof Vector ? B : new Vector(B);

        if (!this.isUpperTriangular()) throw new MatrixError("Matrix is not upper triangular", 815);

        let b: Vector = B.isColumnVector ? B.transpose() : B.clone()
        let solverMatrix: Matrix = this.isColumnMatrix ? this.toRowMatrix() : this

        let sol: number[] = [];

        for (let i = solverMatrix.rows - 1; i >= 0; i--) {
            if (solverMatrix.mElements[i].vElements[i] === 0) throw new MatrixError("Unsolvable system: zero on diagonal", 814);
            let sum: number = 0;
            for (let j = solverMatrix.columns - 1; j > i; --j) {
                sum += sol[j] * (solverMatrix.mElements[i].vElements[j] as number)
            }
            sol[i] = ((b.vElements[i] as number) - sum) / (solverMatrix.mElements[i].vElements[i] as number)
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

    //TODO: make static
    /**
     * Returns a sub matrix from the given matrix within the provided row and column bounds.
     * @param {number} startRow - Starting row index of the sub matrix.
     * @param {number} startCol - Starting column index of the sub matrix.
     * @param {number} endRow - Ending row index of the sub matrix.
     * @param {number} endCol - Ending column index of the sub matrix.
     * @returns {Matrix} The subMatrix within the given bounds.
     */
    public getSubMatrix(startRow: number, endRow: number, startCol: number, endCol: number): Matrix {
        const getMatrix: Matrix = this.isColumnMatrix ? this.toRowMatrix() : this
        let subMatrix: Vector[] = []
        for (let i = startRow; i < endRow; i++) {
            let row: Vector = getMatrix.mElements[i];
            let subRow: Vector = Vector.getSubVector(row, startCol, endCol);
            subMatrix.push(subRow);
        }
        return this.isColumnMatrix ? (new Matrix(subMatrix)).toColumnMatrix() : new Matrix(subMatrix);
    }



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
        let A: Matrix = this.isRowMatrix ? this.toColumnMatrix() : this.clone();

        let orthogonalVectors: Vector[] = [];
        orthogonalVectors.push(A.mElements[0]);

        for (let i = 1; i < A.columns; i++) {
            let orthogonalProjection: Vector = A.mElements[i];

            for (let j = 0; j < i; j++) {
                let u = orthogonalVectors[j];
                let v = A.mElements[i];
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
        let testMatrix: Matrix = this.isColumnMatrix ? this.toRowMatrix() : this;
        for (let i = 1; i < testMatrix.columns; i++) {
            for (let j = 0; j < i; j++) {
                if (testMatrix.mElements[j].vElements[i] !== 0) {
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
        let testMatrix: Matrix = this.isColumnMatrix ? this.toRowMatrix() : this;

        for (let i = 1; i < testMatrix.columns; i++) {
            for (let j = 0; j < i; j++) {
                if (testMatrix.mElements[i].vElements[j] !== 0) {
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
    public naiveMultiply(B: number[][] | Matrix): Matrix {
        B = !(B instanceof Matrix) ? new Matrix(B as number[][]) : B

        if (this.columns !== B.rows) {
            throw new MatrixError("Dimention missmatch: Columns of first matrix does not equal the rows of the second", 810)
        }

        let A = this.clone()
        if (B.isRowMatrix) {
            B = B.toColumnMatrix()
        }

        if (A.isColumnMatrix) {
            A = A.toRowMatrix()
        }


        let result: number[][] = [];
        for (let i = 0; i < A.rows; i++) {
            result.push([])
            for (let j = 0; j < B.columns; j++) {
                let tempRes: number = A.mElements[i].dot(B.mElements[j]);
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
     * Method used to pad the matrix dimensions to the nearest power of two.
     * @returns {Matrix} The padded matrix with dimensions as a power of two.
     */
    public padMatrixToPowerOfTwo(): Matrix {
        let padMatrix: Matrix = this.isColumnMatrix ? this.toRowMatrix() : this
        const maxDimension = Math.max(padMatrix.rows, padMatrix.columns);
        const nextPower = Matrix.nextPowerOfTwo(maxDimension);

        if (nextPower === padMatrix.rows && nextPower === padMatrix.columns)
            return padMatrix;

        const paddedMatrix = Matrix.zeros(nextPower, nextPower);

        for (let i = 0; i < padMatrix.rows; i++) {
            for (let j = 0; j < padMatrix.columns; j++) {
                paddedMatrix.mElements[i].vElements[j] = padMatrix.mElements[i].vElements[j];
            }
        }
        return paddedMatrix;
    }

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

    /**
     * Replaces a submatrix in current matrix with provided submatrix.
     * @param {number} rowStart - starting row index for the submatrix.
     * @param {number} rowEnd - ending row index for the submatrix.
     * @param {number} colStart - starting column index for the submatrix.
     * @param {number} colEnd - ending column index for the submatrix.
     * @param {Matrix} subMatrix - the submatrix to be set in the current matrix.
     */
    public setSubMatrix(subMatrix: Matrix, rowStart: number, rowEnd: number, colStart: number, colEnd: number): void {
        for (let i = rowStart, i_sub = 0; i < rowEnd; i++, i_sub++) {
            for (let j = colStart, j_sub = 0; j < colEnd; j++, j_sub++) {
                this.mElements[i].vElements[j] = subMatrix.mElements[i_sub].vElements[j_sub];
            }
        }
    }


    /**
 * Method for multiplying matrices using the Strassen algorithm.
 * @param {Matrix} B - B matrix to multiply with A.
 * @returns {Matrix} The result of Strassen multiplication of A and B.
 */ //TODO: FIX TO USE THIS maybe
    public strassenMultiply(B: Matrix): Matrix {
        // Base case when size of matrices is 1x1
        if (this.rows === 1 && this.columns === 1) {
            let result: Matrix = Matrix.zeros(1, 1);
            //@ts-ignore
            result.mElements[0].vElements[0] = this.mElements[0].vElements[0] * B.mElements[0].vElements[0];
            return result;
        }

        // Pad matrix to next power of two if necessary
        let AClone: Matrix = this.padMatrixToPowerOfTwo();
        let BClone: Matrix = B.padMatrixToPowerOfTwo();

        // Divide matrices into quarters
        const mid = AClone.rows / 2;
        let a11: Matrix = AClone.getSubMatrix(0, mid, 0, mid);
        let a12: Matrix = AClone.getSubMatrix(0, mid, mid, 2 * mid);
        let a21: Matrix = AClone.getSubMatrix(mid, 2 * mid, 0, mid);
        let a22: Matrix = AClone.getSubMatrix(mid, 2 * mid, mid, 2 * mid);
        let b11: Matrix = BClone.getSubMatrix(0, mid, 0, mid);
        let b12: Matrix = BClone.getSubMatrix(0, mid, mid, 2 * mid);
        let b21: Matrix = BClone.getSubMatrix(mid, 2 * mid, 0, mid);
        let b22: Matrix = BClone.getSubMatrix(mid, 2 * mid, mid, 2 * mid);

        let m1: Matrix = a11.add(a22).strassenMultiply(b11.add(b22));
        let m2: Matrix = a21.add(a22).strassenMultiply(b11);
        let m3: Matrix = a11.strassenMultiply(b12.subtract(b22));
        let m4: Matrix = a22.strassenMultiply(b21.subtract(b11));
        let m5: Matrix = a11.add(a12).strassenMultiply(b22);
        let m6: Matrix = a21.subtract(a11).strassenMultiply(b11.add(b12));
        let m7: Matrix = a12.subtract(a22).strassenMultiply(b21.add(b22));

        let c11: Matrix = m1.add(m4).subtract(m5).add(m7);
        let c12: Matrix = m3.add(m5);
        let c21: Matrix = m2.add(m4);
        let c22: Matrix = m1.subtract(m2).add(m3).add(m6);

        let result = Matrix.zeros(2 * mid, 2 * mid);
        result.setSubMatrix(c11, 0, mid, 0, mid);
        result.setSubMatrix(c12, 0, mid, mid, 2 * mid);
        result.setSubMatrix(c21, mid, 2 * mid, 0, mid);
        result.setSubMatrix(c22, mid, 2 * mid, mid, 2 * mid);

        if (!this.isSquare || !B.isSquare) {
            result = result.getSubMatrix(0, this.rows, 0, B.columns);
        }

        return result;
    }


    /**
     * Matrix subtraction method.
     * @param {Matrix} B - The Matrix to subtract.
     * @returns {Matrix} The result of the subtraction of the matrix B from the given matrix.
     * @throws {MatrixError} If the dimensions of the matrices do not match.
     */
    public subtract(B: Matrix): Matrix {
        if (this.shape !== B.shape) {
            throw new MatrixError('Dimension mismatch: Dimensions of the matrices must be the same for subtraction.', 802);
        }

        if (this.isColumnMatrix && B.isRowMatrix) {
            B = B.toColumnMatrix()
        } else if (this.isRowMatrix && B.isColumnMatrix) {
            B = B.toRowMatrix()
        } else {
            //Fast subtract here
        }

        let resultMatrix: Vector[] = [];
        for (let i = 0; i < (this.isRowMatrix ? this.rows : this.columns); i++) {
            resultMatrix.push(this.mElements[i].subtract(B.mElements[i]));
        }
        return new Matrix(resultMatrix);
    }


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
        if (dimension <= 0 || typeof columnMatrix !== "boolean") {
            throw new MatrixError("Invalid arguments", 806, { dimension, columnMatrix });
        }

        const unitVectorContainor: Vector[] = Array.from({ length: dimension }, (_, i) => Vector.createUnitVector(dimension, i, columnMatrix));

        return new Matrix(unitVectorContainor);
    }

    //TODO: Add column matrix to both factory and add type checking
    /**
     * Static factory method to create a matrix with all elements set to one.
     * @param {number} rows - Number of rows in the matrix.
     * @param {number} columns - Number of columns in input matrix.
     * @returns {Matrix} Matrix with all elements set to one.
     */
    static ones(rows: number, columns: number): Matrix {

        let zeroMatrix: Vector[] = [];
        for (let i = 0; i < rows; i++) {
            zeroMatrix.push(Vector.ones(columns));
        }
        return new Matrix(zeroMatrix);
    }


    /**
     * Static factory method to create a matrix with all elements set to zero.
     * @param {number} rows - Number of rows in the matrix.
     * @param {number} columns - Number of columns in input matrix.
     * @returns {Matrix} Matrix with all elements set to zero.
     */
    static zeros(rows: number, columns: number, isColumnMatrix: boolean = false): Matrix {
        let zeroMatrix: Vector[] = [];
        for (let i = 0; i < rows; i++) {
            zeroMatrix.push(Vector.zeros(columns, isColumnMatrix));
        }
        return new Matrix(zeroMatrix);
    }

    /**
     * Method used to find the next power of two for a given number.
     * @param {number} n - The number for which to find the next power of two.
     * @returns {number} The next power of two for the given number.
     */
    private static nextPowerOfTwo(n: number): number {
        let count = 0;

        // First check if n is already a power of two.
        if (n > 0 && (n & (n - 1)) === 0)
            return n;

        while (n !== 0) {
            n >>= 1;
            count += 1;
        }

        // Return next power of 2
        return 1 << count;
    }

    /**
     * Generates a random matrix of the specified size with values within a given range.
     * @static
     * @param {number} rows - The number of rows in the matrix.
     * @param {number} columns - The number of columns in the matrix.
     * @param {number} minValue - The minimum value for the random numbers (inclusive).
     * @param {number} maxValue - The maximum value for the random numbers (exclusive).
     * @returns {Matrix} The randomly generated matrix.
     */
    public static random(rows: number, columns: number, minValue: number, maxValue: number): Matrix {
        const entries: number[][] = [];
        for (let i = 0; i < rows; i++) {
            const row: number[] = [];
            for (let j = 0; j < columns; j++) {
                const randomValue = Math.random() * (maxValue - minValue) + minValue;
                row.push(randomValue);
            }
            entries.push(row);
        }
        return new Matrix(entries);
    }



}

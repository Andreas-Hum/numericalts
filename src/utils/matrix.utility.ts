// Matrix class
import Matrix from "../matrix"

// Math utility class
import { Constants } from ".";

import math from "../math";
import { MatrixError } from "../errors";

export class MatrixUtils {

    /**
     * Clones the matrix instance and returns the clone
     * @public
     * @static
     * @returns {Matrix} The cloned matrix
     */
    public static clone(A: Matrix): Matrix {
        return new Matrix(A.toArray())
    }

    /**
     * Method used to pad the matrix dimensions to the nearest power of two.
     * @public
     * @static
     * @returns {Matrix} The padded matrix with dimensions as a power of two.
     */
    public static padMatrixToPowerOfTwo(A: Matrix): Matrix {
        const rows: number = A.rows;
        const columns: number = A.columns
        const maxDimension: number = Math.max(rows, columns);
        const nextPower: number = math.nextPowerOfTwo(maxDimension);

        if (nextPower === rows && nextPower === columns) {
            return A; // No padding required as the matrix is already a power of two.
        }

        const paddedMatrix: Float32Array = new Float32Array(nextPower * nextPower);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                paddedMatrix[i * nextPower + j] = A.mElements[i * columns + j];
            }
        }

        return new Matrix(paddedMatrix, nextPower, nextPower);
    }


    /**
     * Rounds values close to zero in a the matrix to zero.
     * @public
     * @static
     * @param {number} threshold - The threshold value for rounding to zero. Default is 1e-7.
     * @returns {void}
     */
    public static roundMatrixToZero(A: Matrix, threshold: number = Constants.DELTA): void {
        const size: number = A.size;
        for (let i = 0; i < size; i++) {
            A.mElements[i] = A.mElements[i] * (Number(Math.abs(A.mElements[i]) < threshold))
        }
    }


    /**
     * Rounds all elements of a matrix to a specified number of decimal places using a specified base.
     * @public
     * @static
     * @param {Matrix} A - The matrix to round.
     * @param {number} digits - The number of decimal places to round to.
     * @param {number} base - The base to use for rounding. Defaults to 10 if not provided.
     * @returns {void}
     */
    public static toFixedMatrix(A: Matrix, digits: number, base: number = 10): void {
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
    public static identity(dimension: number): Matrix {
        if (dimension <= 0 || typeof dimension !== "number") throw new MatrixError("Invalid argument", 606, { dimension });

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
        if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, { rows, columns });
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
        if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, { rows, columns });

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
        if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, { rows, columns });
        return new Matrix(new Array(rows).fill(0).map(() => new Array(columns).fill(0)))
    }

}


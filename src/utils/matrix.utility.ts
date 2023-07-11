// Matrix class
import { Matrix } from "../matrix"

// Math utility class
import { DELTA, MathUtils } from ".";


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
     * @returns {Matrix} The padded matrix with dimensions as a power of two.
     */
    // public padMatrixToPowerOfTwo(A: Matrix): Matrix {
    //     let padMatrix: Matrix = MatrixUtils.clone(A)
    //     const maxDimension = Math.max(padMatrix.rows, padMatrix.columns);
    //     const nextPower = MathUtils.nextPowerOfTwo(maxDimension);

    //     if (nextPower === padMatrix.rows && nextPower === padMatrix.columns)
    //         return padMatrix;

    //     const paddedMatrix = Matrix.zeros(nextPower, nextPower);

    //     for (let i = 0; i < padMatrix.rows; i++) {
    //         for (let j = 0; j < padMatrix.columns; j++) {
    //             paddedMatrix.mElements[i].vElements[j] = padMatrix.mElements[i].vElements[j];
    //         }
    //     }
    //     return paddedMatrix;
    // }

    /**
     * Rounds values close to zero in a the matrix to zero.
     * @public
     * @static
     * @param {number} threshold - The threshold value for rounding to zero. Default is 1e-7.
     * @returns {void}
     */
    public static roundMatrixToZero(A: Matrix, threshold: number = DELTA): void {
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
        A.mElements = A.mElements.map((entry: number) => MathUtils.toFixedNumber(entry, digits, base))
    }


}


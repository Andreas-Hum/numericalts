// Matrix class
import { Matrix } from "../matrix"

// Math utility class
import { MathUtils } from ".";


export class MatrixUtils {

    /**
     * Clones the matrix instance and returns the clone
     * @public
     * @returns {Matrix} The cloned matrix
     */
    public static clone(A: Matrix): Matrix {
        return new Matrix(A.toArray())
    }

    /**
     * Method used to pad the matrix dimensions to the nearest power of two.
     * @returns {Matrix} The padded matrix with dimensions as a power of two.
     */
    public padMatrixToPowerOfTwo(A: Matrix): Matrix {
        let padMatrix: Matrix = MatrixUtils.clone(A)
        const maxDimension = Math.max(padMatrix.rows, padMatrix.columns);
        const nextPower = MathUtils.nextPowerOfTwo(maxDimension);

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
}


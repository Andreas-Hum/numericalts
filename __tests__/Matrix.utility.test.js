const matrix_module = require("../dist/matrix")
const importings = require("../dist/utils")
const Matrix = matrix_module.Matrix
const MatrixUtils = importings.MatrixUtils

describe('MatrixUtils', () => {
    describe('clone', () => {
        it('should clone the matrix instance and return the clone', () => {
            const matrix = new Matrix([[1, 2], [3, 4]]);
            const clone = MatrixUtils.clone(matrix);
            expect(clone).toEqual(matrix);
            expect(clone).not.toBe(matrix);
        });
    });

    describe('padMatrixToPowerOfTwo', () => {
        it('should return the padded matrix with dimensions as a power of two', () => {
            const matrix = new Matrix([[1], [4]]);
            const paddedMatrix = MatrixUtils.padMatrixToPowerOfTwo(matrix);
            console.log(paddedMatrix.toString())
            expect(paddedMatrix).toEqual(matrix);
        });
    });

    describe('roundMatrixToZero', () => {
        it('should round values close to zero in the matrix to zero', () => {
            const matrix = new Matrix([[0.000001, 0.000002], [0.000003, 0.000004]]);
            MatrixUtils.roundMatrixToZero(matrix);
            expect(matrix).toEqual(new Matrix([[0, 0], [0, 0]]));
        });
    });

    describe('toFixedMatrix', () => {
        it('should round all elements of the matrix to the specified number of decimal places', () => {
            const matrix = new Matrix([[1.23456789, 2.3456789], [3.456789, 4.56789]]);
            MatrixUtils.toFixedMatrix(matrix, 2);
            expect(matrix).toEqual(new Matrix([[1.23, 2.35], [3.46, 4.57]]));
        });
    });
});
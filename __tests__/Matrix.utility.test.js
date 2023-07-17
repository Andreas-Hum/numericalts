const Matrix = require("../dist/matrix").default
const MatrixUtils = require("../dist/matrix.utility").default


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
            expect(paddedMatrix).toEqual(new Matrix([[1, 0], [4, 0]]));
        });
    });

    describe('roundMatrixToZero', () => {
        it('should round values close to zero in the matrix to zero', () => {
            const matrix = new Matrix([[0.000000000001, 0.000000000001], [0.000000000001, 0.000000000001]]);
            MatrixUtils.roundMatrixToZero(matrix, 1e-7);
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
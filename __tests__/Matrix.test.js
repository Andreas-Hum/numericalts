const matrix_module = require("../dist/matrix/Matrix")
const Matrix = matrix_module.Matrix

let rowMatrix, columnMatrix, arrayRowMatrix, arrayColumnMatrix

describe('Matrix', () => {


    beforeEach(() => {
        rowMatrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
        columnMatrix = new Matrix([[[1], [2], [3]], [[4], [5], [6]]]);

        arrayRowMatrix = [[1, 2, 3], [4, 5, 6]]
        arrayColumnMatrix = [[[1], [2], [3]], [[4], [5], [6]]]


    });
    describe('Matrix initialization', () => {

        it('Validation of a row matrix', () => {
            expect(rowVector123.isRowMatrix).toBeTruthy();
            expect(rowVector123.size).toBe(6);
            expect(rowVector123.shape).toBe('(1,3)');
        });

        it('Validation of a column vector', () => {

            expect(columnVector123.isColumn).toBeTruthy();
            expect(columnVector123.size).toBe(3);
            expect(columnVector123.shape).toBe('(3,1)');
        });

        it('Error: Different types of entries', () => {
            expect(() => new Vector([1, [1], 3])).toThrow();
        })
    });

})